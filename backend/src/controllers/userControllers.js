import { User } from "./../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import oAuthHandler from "../utils/oauthHandler.js";
import { v2 as cloudinary } from "cloudinary";
import uploadOnCloudinary from "../utils/cloudinary.js";
import transporter from "../config/nodeMailer.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const userRegistration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ success: false, message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email and password" });
    }

    if (!user.password) {
      return res.status(400).json({ success: false, message: "Please login using your OAuth provider" });
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid email and password" });
    }

    const hotelBookingUserToken = createToken(user._id);
    if (!hotelBookingUserToken) {
      return res.status(400).json({ success: false, message: "Token generation failed" });
    }

    const options = {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "lax", // Prevent CSRF attacks
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    return res
      .status(200)
      .cookie("hotelBookingUserToken", hotelBookingUserToken, options)
      .json({ success: true, message: "Login successfull", role: "user" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const handleGoogleCallback = async (req, res) => {
  const profile = req.user; // passpost.authenticate(it is a middleware) attaches profile to req.user
  try {
    if (!profile) {
      return res.redirect(`http://localhost:5173/login`);
    }
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const providerId = profile.id;
    const avatar = profile.photos[0].value;

    const user = await oAuthHandler({
      provider: "google",
      providerId,
      name,
      email,
      avatar,
    });

    const hotelBookingUserToken = createToken(user._id);
    if (!hotelBookingUserToken) {
      return res.status(400).json({ success: false, message: "Token generation failed" });
    }

    const options = {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "lax", // Allow sending cookies in cross-origin requests (for OAuth callback)
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    res.cookie("hotelBookingUserToken", hotelBookingUserToken, options);

    return res.redirect(`http://localhost:5173/`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const handleGithubCallback = async (req, res) => {
  const profile = req.user;
  try {
    if (!profile) {
      return res.redirect(`http://localhost:5173/login`);
    }

    const name = profile.username;
    const email = profile._json?.email || null;
    const providerId = profile.id;
    const avatar = profile.photos?.[0]?.value || profile._json?.avatar_url;

    const user = await oAuthHandler({
      provider: "github",
      providerId,
      name,
      email,
      avatar,
    });

    const hotelBookingUserToken = createToken(user._id);
    if (!hotelBookingUserToken) {
      return res.status(400).json({ success: false, message: "Token generation failed" });
    }

    const options = {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "lax", // Set sameSite to 'lax' for GitHub to allow redirection back to the app after authentication
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    res.cookie("hotelBookingUserToken", hotelBookingUserToken, options);

    return res.redirect(`http://localhost:5173/`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const userVerify = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "User verified successfully", role: "user" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const userLogout = async (req, res) => {
  try {
    res.clearCookie("hotelBookingUserToken", {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    return res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const getProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User profile", profile: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const updateProfile = async (req, res) => {
  try {
    const id = req.user._id;
    const { name, phone } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const avatarPath = req.file ? req.file.path : null;

    let oldPublicId = null;

    if (avatarPath) {
      oldPublicId = user.publicId;

      const result = await uploadOnCloudinary(avatarPath);
      if (!result) {
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
      // Update the user
      user.avatar = result.secure_url;
      user.publicId = result.public_id;
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    await user.save();

    if (oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId);
    }

    return res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const deleteAccount = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Delete avatar from cloudinary
    if (user.publicId) {
      await cloudinary.uploader.destroy(user.publicId);
    }

    res.clearCookie("hotelBookingUserToken", {
      httpOnly: true,
      secure: false,
      // secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    await user.deleteOne(); // Use deleteOne() on the document instance, This avoids another database lookup.

    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

const sendContactMessage = async (req, res) => {
  try {
    const {name, email, subject, message} = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "Fields are empty!" });
    }

    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    if (user.isAccountVerified === false) {
      return res.status(400).json({ success: false, message: "Account is not verified" });
    }

    const emailOption = {
      from: user.email,
      to: process.env.ADMIN_EMAIL,
      subject: subject,
      text: `From ${name}, ${message}`,
    };

    await transporter.sendMail(emailOption);

    return res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Send OTP to verify email
const sendVerifyEmailOtp = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "Account is already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = Date.now() +  5 * 60 * 1000; // 5 minutes 
    await user.save();

    const emailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verification email from LMS",
      text: `Your OTP for email verification is ${otp}`,
    };

    await transporter.sendMail(emailOption);

    return res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Verify OTP to verify email
const verifyEmailOtp = async (req, res) => {
  try {
    const id = req.user._id;
    const { otp } = req.body;
    if(!otp) {
      return res.status(400).json({ success: false, message: "OTP is required" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }
    if (Date.now() > user.verifyOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if (user.verifyOtp === '' || user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpiresAt = null;

    await user.save();
    return res.status(200).json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Send OTP to reset password
const sendResetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found!" });
    }
    
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a random 6-digit OTP

    user.verifyResetOtp = otp;
    user.resetOtpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
    await user.save();

    const emailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
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
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }
    if (!user.resetOtpExpiresAt || Date.now() > user.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if(user.verifyResetOtp === '' || user.verifyResetOtp !== otp){
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// user can reset password
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!newPassword || !email || !otp) {
      return res.status(400).json({ success: false, message: "Email, Otp and password are required!" });
    }
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    if (!user.resetOtpExpiresAt || Date.now() > user.resetOtpExpiresAt.getTime()) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }
    if(user.verifyResetOtp === '' || user.verifyResetOtp !== otp){
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    user.verifyResetOtp = "";
    user.resetOtpExpiresAt = null;

    await user.save();
    
    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export {
  userRegistration,
  userLogin,
  handleGoogleCallback,
  handleGithubCallback,
  userVerify,
  userLogout,
  getProfile,
  updateProfile, sendContactMessage,
  deleteAccount, sendVerifyEmailOtp, verifyEmailOtp, sendResetPasswordOtp, verifyResetPasswordOtp, resetPassword
};
