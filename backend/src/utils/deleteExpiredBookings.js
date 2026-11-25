import { Booking } from "./../models/bookingModel.js";

export const deleteExpiredBookings = async () => {
    try {
        const expiredBookings = await Booking.find({ deleteAt: { $lte: new Date() } });
        for(const booking of expiredBookings) {
            await Booking.findByIdAndDelete(booking._id);
        }
    } catch (error) {
        console.log(error);
    }
}