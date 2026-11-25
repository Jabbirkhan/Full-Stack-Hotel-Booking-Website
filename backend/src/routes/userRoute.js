import { Router } from "express";
import {
    deleteAccount, getProfile,
    handleGithubCallback, handleGoogleCallback, resetPassword, sendContactMessage, sendResetPasswordOtp, sendVerifyEmailOtp, updateProfile, userLogin, userLogout,
    userRegistration, userVerify,
    verifyEmailOtp,
    verifyResetPasswordOtp
} from "../controllers/userControllers.js";
import passport from "passport";
import userAuth from "../middlewares/userAuth.js";
import upload from "../middlewares/multer.js";
import { allHotels } from "../controllers/hotelControllers.js";
import { allRooms, hotelRooms } from "../controllers/roomControllers.js";
import { cancelBooking, createBooking, myBookings, roomAllBookings, verifyStripePayment } from "../controllers/bookingControllers.js";

const userRouter = Router();

userRouter.route('/register').post(userRegistration); 
userRouter.route('/login').post(userLogin);
userRouter.route('/verify').get(userAuth, userVerify);
userRouter.route('/logout').post(userLogout);

userRouter.route('/send-verify-email-otp').get(userAuth, sendVerifyEmailOtp);
userRouter.route('/verify-email-otp').post(userAuth, verifyEmailOtp);
userRouter.route('/send-reset-password-otp').post(sendResetPasswordOtp);
userRouter.route('/verify-reset-password-otp').post(verifyResetPasswordOtp);
userRouter.route('/reset-password').post(resetPassword);

userRouter.route("/send-contact-message").post(userAuth, sendContactMessage);

userRouter.route('/profile').get(userAuth, getProfile);
userRouter.route('/update-profile').patch(userAuth, upload.single('avatar'), updateProfile);
userRouter.route('/delete-account').delete(userAuth, deleteAccount);

userRouter.route('/all-hotels').get(userAuth, allHotels);
userRouter.route('/hotel-rooms/:id').get(userAuth, hotelRooms);
userRouter.route('/all-rooms').get(userAuth, allRooms);
userRouter.route('/room-bookings/:id').get(userAuth, roomAllBookings);

userRouter.route('/create-booking/:id').post(userAuth, createBooking);
userRouter.route('/verify-stripe-payment').post(userAuth, verifyStripePayment);
userRouter.route('/cancel-booking/:id').delete(userAuth, cancelBooking);
userRouter.route('/bookings').get(userAuth, myBookings);

// // Google and GitHub authentication routes (for production, without state parameter)
userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] })); 
userRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callback routes for Google and GitHub authentication
userRouter.get('/google/callback', passport.authenticate('google', { session: false}), handleGoogleCallback); // http://localhost:8006/api/v1/user/google/callback
userRouter.get('/github/callback', passport.authenticate('github', { session: false}), handleGithubCallback); // http://localhost:8006/api/v1/user/github/callback

export default userRouter;