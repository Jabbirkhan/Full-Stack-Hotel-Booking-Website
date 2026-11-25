import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    verifyOtp: {
        type: String,
        default: ''
    },
    verifyOtpExpiresAt: {
        type: Date,
        default: null
    },
    verifyResetOtp: {
        type: String,
        default: ''
    },
    resetOtpExpiresAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

export const Owner = mongoose.models.Owner || mongoose.model('Owner', ownerSchema);