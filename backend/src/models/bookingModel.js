import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    hotelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    checkInDate:{
        type: Date,
        required: true
    },
    checkOutDate:{
        type: Date,
        required: true
    },
    totalAmount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: "Pending",
        enum: ["Pending", "Accepted", "Rejected", "Completed"] // Add more statuses as needed
    },
    paymentMethod: {
        type: String,
        required: true  
    },
    paymentStatus:{
        type: String,
        default: "Pending",
        enum: ["Pending", "Paid", "Refunded"]
    },
    deleteAt:{
        type: Date
    },
    idempotencyKey: {
        type: String,
        required: true,
    },
}, { timestamps: true });

bookingSchema.index(
  { userId: 1, idempotencyKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      idempotencyKey: { $type: "string" },
    },
  }
);

export const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);