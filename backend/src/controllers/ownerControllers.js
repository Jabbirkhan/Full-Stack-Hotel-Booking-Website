import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Owner } from "../models/ownerModel.js";
import transporter from "../config/nodeMailer.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

const registerOwner = async (req, res) => {
  try {
      const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if(!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Here we match the received email with ADMN_EMAIL
    if(email !== process.env.ADMIN_EMAIL){
      return res.status(400).json({ success: false, message: "Email not matched with Admin Email!" });
    }

    const existOwner = await Owner.findOne({email});

    // Here we check if length of owner is more than one
    const owners = await Owner.find();
    if (existOwner && owners.length > 0) {
      return res.status(400).json({ success: false, message: "Admin already registered, please login!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const owner = await Owner.create({
      name,
      email,
      password: hashedPassword,
    });
    if (!owner) {
      return res.status(500).json({ success: false, message: "Error while creating owner account" });
    }
    return res.status(201).json({ success: true, message: "Owner created successfully" });
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
}

const loginOwner = async (req, res) =>{
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({success: false, message: "Email and password are required"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, message: "Invalid email format"});
        }
        const owner = await Owner.findOne({email});
        if(!owner){
            return res.status(400).json({success: false, message: "Invalid email and password"});
        }
        const isMatch = await bcrypt.compare(password, owner.password);
        if(!isMatch){
            return res.status(401).json({success:false, message:"Invalid email and password"});
        }
        const hotelBookingOwnerToken = createToken(owner._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Set secure flag in production
            sameSite: "lax", // Prevent CSRF attacks with strict or lax
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        }

        return res.status(200)
        .cookie("hotelBookingOwnerToken", hotelBookingOwnerToken, options)
        .json({success: true, message: "Owner logged in successfully", role: "owner"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const verifyOwner = (req, res) => {
    try {
        return res.status(200).json({success: true, message: "Owner is authenticated", role: "owner"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

const ownerProfile = (req, res) => {
    try {
        const id = req.owner._id;
        const owner = Owner.findById(id).select('isAccountVerified');
        return res.status(200).json({success: true, owner});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

const logoutOwner = (req, res) => {
    try {
        res.clearCookie("hotelBookingOwnerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        return res.status(200).json({success: true, message: "Owner logged out successfully"});
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

// Send OTP to reset password
const sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const owner = await Owner.findOne({ email });
    if (!owner) {
      return res.status(404).json({ success: false, message: "owner not found!" });
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

    owner.verifyResetOtp = otp;
    owner.resetOtpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    await owner.save();

    const emailOption = {
      from: process.env.SENDER_EMAIL,
      to: owner.email,
      subject: "Reset password OTP from LMS",
      text: `Your OTP for reset password is this ${otp}`,
    };

    await transporter.sendMail(emailOption);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Verify OTP to reset password
const verifyResetPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }
    const owner = await Owner.findOne({email});
    if (!owner) {
      return res.status(404).json({ success: false, message: "owner not found" });
    }
    if (!owner.resetOtpExpiresAt || Date.now() > owner.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if(owner.verifyResetOtp === '' || owner.verifyResetOtp !== otp){
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// owner can reset password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!newPassword || !email || !otp) {
      return res.status(400).json({ success: false, message: "Email, Otp and password are required!" });
    }
    const owner = await Owner.findOne({email});
    if (!owner) {
      return res.status(404).json({ success: false, message: "owner not found" });
    }

    if (!owner.resetOtpExpiresAt || Date.now() > owner.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if(owner.verifyResetOtp === '' || owner.verifyResetOtp !== otp){
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    owner.password = hashedPassword;

    owner.verifyResetOtp = "";
    owner.resetOtpExpiresAt = null;

    await owner.save();
    
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export {
    registerOwner,
    loginOwner,
    verifyOwner,
    ownerProfile,
    logoutOwner,
    sendResetPasswordOtp, verifyResetPasswordOtp, resetPassword
};
