import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import './src/config/passport.js';
import passport from 'passport';
import userRouter from './src/routes/userRoute.js';
import ownerRouter from './src/routes/ownerRoute.js';
import cron from 'node-cron';
import { deleteExpiredBookings } from './src/utils/deleteExpiredBookings.js';
import rateLimiter from './src/middlewares/rateLimiter.js';
import { stripeWebhook } from './src/controllers/bookingControllers.js';

const app = express();
const PORT = process.env.PORT || 8011

connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Stripe webhook MUST come before express.json()
app.post(
    process.env.STRIPE_WEBHOOK_ENDPOINT || "/api/v1/user/stripe-webhook",
    express.raw({ type: "application/json" }),
    stripeWebhook
);

app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extended: true, limit: "50kb"}));
app.use(express.static('public/temp'));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(rateLimiter);

app.get('/api', (req,res) =>{
    res.send('API is working');
});

app.use('/api/v1/user', userRouter);
app.use('/api/v1/owner', ownerRouter);

cron.schedule("0 * * * * *", async ()=> {
    await deleteExpiredBookings();
})

app.listen(PORT, ()=>{
    console.log(`Server is running on this port ${PORT}`);
});