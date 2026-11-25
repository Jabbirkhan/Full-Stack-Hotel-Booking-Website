import { Room } from "../models/roomModel.js";
import { Hotel } from "../models/hotelModel.js";
import { Booking } from "../models/bookingModel.js";
// 1. Import the Stripe library
import Stripe from "stripe";

// 2. stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173"; // Replace with your frontend URL

// global variables
const currency = 'USD'
const deliveryCharge = 20


const createStripeSession = async (booking) => {
  const totalAmount = Number(booking.totalAmount);

  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    throw new Error("Invalid booking amount");
  }

  const line_items = [
    {
      price_data: {
        currency,
        product_data: {
          name: "Hotel Room Booking",
        },
        unit_amount: Math.round(totalAmount * 100),
      },
      quantity: 1,
    },
  ];

  return stripe.checkout.sessions.create(
    {
      mode: "payment",
      line_items,

      success_url: `${frontendUrl}/verify?success=true&bookingId=${booking._id}`,
      cancel_url: `${frontendUrl}/verify?canceled=true&bookingId=${booking._id}`,

      metadata: {
        bookingId: booking._id.toString(),
        userId: booking.userId.toString(),
      },

      payment_intent_data: {
        metadata: {
          bookingId: booking._id.toString(),
          userId: booking.userId.toString(),
        },
      },
    },
    {
      idempotencyKey: `checkout-session-${booking._id}`,
    }
  );
};


// user can create booking
const createBooking = async (req, res) => {
    try {
        const userId = req.user._id;
        const roomId = req.params.id;
        const { checkInDate, checkOutDate, paymentMethod, idempotencyKey } = req.body;

        const serviceFee = Number(process.env.SERVICE_FEE) || 50; // Default service fee if not set in environment variables
        const taxFee = Number(process.env.TAX_FEE) || 10; // Default tax fee if not set in environment variables

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        if (!room.status) {
            return res.status(400).json({ success: false, message: "Room is not available for booking" });
        }

        const isValidUUID =
            typeof idempotencyKey === "string" &&
            /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
                idempotencyKey,
            );

        if (!isValidUUID) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "A valid idempotency UUID is required",
                });
        }

        const existingBooking = await Booking.findOne({
            userId,
            idempotencyKey,
        });

        if (existingBooking) {
            const session = await createStripeSession(existingBooking);
            return res.status(200).json({ success: true, session_url: session.url });
        }

        const hotelId = room.hotelId._id;

        if (!checkInDate || !checkOutDate) {
            return res.status(400).json({ success: false, message: "Check-in and Check-out dates are required" })
        }

        const requestedCheckIn = new Date(checkInDate);
        const requestedCheckOut = new Date(checkOutDate);

        if (isNaN(requestedCheckIn.getTime()) || isNaN(requestedCheckOut.getTime())) {
            return res.status(400).json({ success: false, message: "Invalid date format" });
        }

        const today = new Date()
        today.setHours(0, 0, 0, 0);

        if (requestedCheckIn < today) {
            return res.status(400).json({ success: false, message: "Check-in date cannot be in the past" });
        }

        if (requestedCheckIn >= requestedCheckOut) {
            return res.status(400).json({ success: false, message: "Check-in date must be smaller than checkout date!" })
        }

        // Here we check the availability of the room
        const roomBookings = await Booking.find({
            roomId,
            status: { $nin: ["Rejected", "Cancelled"] } // we have these statuses: Pending, Accepted, Rejected, Completed
        });

        if (roomBookings.length > 0) {
            for (let booking of roomBookings) {

                if (requestedCheckIn < booking.checkOutDate && requestedCheckOut > booking.checkInDate) {
                    return res.status(400).json({ success: false, message: "Room is not available" });
                }

            }
        }

        const totalNights = Math.ceil((requestedCheckOut - requestedCheckIn) / (1000 * 60 * 60 * 24));

        const totalAmount = totalNights * room.pricePerNight + serviceFee + taxFee;

        const booking = await Booking.create({
            userId,
            roomId,
            hotelId,
            checkInDate: requestedCheckIn,
            checkOutDate: requestedCheckOut,
            totalAmount,
            paymentMethod,
            idempotencyKey,
        });

        const session = await createStripeSession(booking);

        return res.status(200).json({ success: true, message: "Booking created successfully", session_url: session.url });

    } catch (error) {
        if (error.code === 11000 && idempotencyKey) {
            const userId = req.user._id;
            const existingBooking = await Booking.findOne({
                userId,
                idempotencyKey,
            });

            if (existingBooking) {
                try {
                    const session = await createStripeSession(existingBooking);
                    return res.status(200).json({success: true, session_url: session.url});
                } catch (sessionError) {
                    console.error("Stripe session retry failed:", sessionError);
                }
            }
        }

        return res.status(500).json({ success: false, message: error.message });
    }
}

const handlePaymentIntent = async (paymentIntentId, payment) => {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const { bookingId, userId } = paymentIntent.metadata;
    if (!bookingId || !userId) {
        throw new Error("Payment metadata is missing");
    }
    const booking = await Booking.findOne({
        _id: bookingId,
        userId,
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    // Never mark an booking paid unless Stripe confirms it.
    if (payment && paymentIntent.status !== "succeeded") {
        throw new Error("Payment is not successful");
    }
    if (payment && (paymentIntent.currency !== currency || paymentIntent.amount_received !== Math.round(booking.totalAmount * 100))) {
        throw new Error("Payment amount or currency mismatch");
    }
    // Never downgrade a paid order.
    if (booking.payment) {
        throw new Error("Booking is already paid");
    }
    booking.payment = payment;
    await booking.save();
};

const stripeWebhook = async (req, res) => {
    const signature = req.headers["stripe-signature"]; // we get the signature when stripe send post request

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Invalid Stripe webhook:", error.message);
        return res.status(400).send("Invalid webhook signature");
    }
    try {
        switch (event.type) {
            case "payment_intent.succeeded":
                await handlePaymentIntent(event.data.object.id, true);
                break;
            case "payment_intent.payment_failed":
            case "payment_intent.canceled":
                await handlePaymentIntent(event.data.object.id, false);
                break;
            default:
                break;
        }
        return res.status(200).json({ received: true });
    } catch (error) {
        console.error("Stripe webhook processing error:", error);
        // Stripe can retry events after a server error.
        return res.status(500).json({ received: false });
    }
};

// 7. Verify the payment
const verifyStripePayment = async (req, res) => {
    try {
        const { bookingId } = req.query;
        const userId = req.user._id;

        const booking = await Booking.findOne({
            _id: bookingId,
            userId,
        });
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        if (!booking.payment) {
            return res.status(200).json({success: false, payment: false, message:"Payment is pending confirmation. Please check again shortly."});
        }

        return res.status(200).json({success: true, payment: true, message: "Payment successful and booking placed"});

    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}

// user can cancel booking
const cancelBooking = async (req, res) => {
    try {
        const id = req.params.id;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(400).json({ success: false, message: "Booking not found" });
        }

        if (booking.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        await booking.deleteOne(); // Use deleteOne() on the document instance, This avoids another database lookup.

        return res.status(200).json({ success: true, message: "Booking cancelled successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// user can see own bookings
const myBookings = async (req, res) => {
    try {
        const id = req.user._id;
        const bookings = await Booking.find({ userId: id }).populate("roomId", "-ownerId").populate("hotelId", "-ownerId");
        return res.status(200).json({ success: true, bookings });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// room all bookings
const roomAllBookings = async (req, res) => {
    try {
        const id = req.params.id;
        const roomBookings = await Booking.find({ roomId: id }); // This will fetch all bookings for the specified room ID
        return res.status(200).json({ success: true, roomBookings });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owner can see all bookings
const ownerAllBookings = async (req, res) => {
    try {
        const id = req.owner._id; // owner id
        const hotels = await Hotel.find({ ownerId: id }); // find all hotels of the owner
        const bookings = await Booking.find({ hotelId: { $in: hotels.map((hotel) => hotel._id) } }); // find all rooms of the hotels

        return res.status(200).json({ success: true, bookings });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

// owner can update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowed = ["Pending", "Accepted", "Rejected", "Completed"];
        if (!allowed.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const id = req.params.id;
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        const hotel = await Hotel.findById(booking.hotelId);
        if (!hotel) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }

        if (hotel.ownerId.toString() !== req.owner._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        let deleteAt = null;
        if (status === "Rejected") {
            deleteAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        }
        if (status === "Completed") {
            deleteAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        }

        const updatedBooking = await Booking.findByIdAndUpdate(id, { status, deleteAt }, { new: true });

        return res.status(200).json({ success: true, message: "Booking status updated successfully", updatedBooking });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {
    createBooking,
    cancelBooking,
    myBookings,
    ownerAllBookings,
    updateBookingStatus,
    roomAllBookings,
    verifyStripePayment,
    stripeWebhook
}