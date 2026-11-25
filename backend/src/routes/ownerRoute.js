import { Router } from "express";
import upload from "../middlewares/multer.js";
import ownerAuth from "../middlewares/ownerAuth.js";
import {
    loginOwner, logoutOwner, ownerProfile, registerOwner, resetPassword, sendResetPasswordOtp,
    verifyOwner, verifyResetPasswordOtp
} from "../controllers/ownerControllers.js";
import { addRoom, deleteRoom, ownerAllRooms, updateRoomStatus } from "../controllers/roomControllers.js";
import { createHotel, deleteHotel, ownerAllHotels, updateHotelStatus } from "../controllers/hotelControllers.js";
import { ownerAllBookings, updateBookingStatus } from "../controllers/bookingControllers.js";

const ownerRouter = Router();

ownerRouter.route('/register').post(registerOwner);
ownerRouter.route('/login').post(loginOwner);
ownerRouter.route('/verify').get(ownerAuth, verifyOwner);
ownerRouter.route('/profile').get(ownerAuth, ownerProfile);
ownerRouter.route('/logout').post(ownerAuth, logoutOwner);

ownerRouter.route('/send-reset-password-otp').post(sendResetPasswordOtp);
ownerRouter.route('/verify-reset-password-otp').post(verifyResetPasswordOtp);
ownerRouter.route('/reset-password').post(resetPassword);

ownerRouter.route('/add-room').post(ownerAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), addRoom);
ownerRouter.route('/all-rooms').get(ownerAuth, ownerAllRooms);
ownerRouter.route('/delete-room/:id').delete(ownerAuth, deleteRoom);
ownerRouter.route('/update-room-status/:id').patch(ownerAuth, updateRoomStatus);

ownerRouter.route('/create-hotel').post(ownerAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), createHotel);
ownerRouter.route('/all-hotels').get(ownerAuth, ownerAllHotels);
ownerRouter.route('/delete-hotel/:id').delete(ownerAuth, deleteHotel);
ownerRouter.route('/update-hotel-status/:id').patch(ownerAuth, updateHotelStatus);

ownerRouter.route('/all-bookings').get(ownerAuth, ownerAllBookings);
ownerRouter.route('/update-booking-status/:id').patch(ownerAuth, updateBookingStatus);

export default ownerRouter;