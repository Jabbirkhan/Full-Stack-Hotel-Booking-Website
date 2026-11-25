import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    roomNumber: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    pricePerNight: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    publicIds: {
        type: Array,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    amenities:{
        type: Array,
        required: true
    },
    status:{
        type: Boolean,
        default: true
    },
}, {timestamps: true});

export const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);