import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
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
    amenities: {
        type: Array,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

export const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', hotelSchema);