# Hotel Booking System

A modern, full-stack **Hotel Booking Platform** built using the **MERN Stack** (**MongoDB, Express.js, React.js, and Node.js**).
The platform provides a seamless hotel reservation experience for customers while offering a dedicated administrative dashboard for managing hotels, rooms, bookings, and platform operations.
The system includes secure authentication, hotel and room management, Stripe payment integration, OAuth login, email verification, booking management, and a fully responsive experience across desktop, tablet, and mobile devices.

---

# 🚀 Features
## 👤 Customer Features
- ✅ User Registration & Login
- ✅ Email Verification with OTP
- ✅ Forgot Password & Password Reset
- ✅ Google OAuth Authentication
- ✅ GitHub OAuth Authentication
- ✅ Browse Hotels & Available Rooms
- ✅ Search Hotels by Name
- ✅ Filter Rooms by:
  - Room Type
  - Guest Capacity
  - Price Range
- ✅ View Detailed Hotel Information
- ✅ View Detailed Room Information
- ✅ Create Room Bookings
- ✅ Stripe Payment Integration
- ✅ View Booking History
- ✅ Cancel Bookings
- ✅ Manage User Profile
- ✅ Delete Account
- ✅ Contact Support via Email
- ✅ Responsive Design
---
## 👨💼 Admin Features
- ✅ Admin Registration & Login
- ✅ OTP-Based Password Reset
### 🏨 Hotel Management
- Add Hotels
- View Hotels
- Update Hotel Status
- Delete Hotels
### 🛏️ Room Management
- Add Rooms
- View Rooms
- Update Room Status
- Delete Rooms
### 📅 Booking Management
- View All Bookings
- Review Payment Information
- Manage Booking Status
#### Booking Statuses
- Pending
- Accepted
- Rejected
- Completed
---
# 🛠️ Technology Stack
## 🎨 Frontend
| Technology | Purpose |
|------------|----------|
| React.js | User Interface |
| Tailwind CSS | Styling |
| React Router DOM | Client-Side Routing |
| Context API | State Management |
| Axios | HTTP Requests |
---
## ⚡ Backend
| Technology | Purpose |
|------------|----------|
| Node.js | JavaScript Runtime |
| Express.js | Backend Framework |
---
## ☁️ Database
| Technology | Purpose |
|------------|----------|
| MongoDB Atlas | Database Management |
---
## 🔐 Authentication & Security
| Technology | Purpose |
|------------|----------|
| JWT | Authentication |
| bcrypt | Password Hashing |
| HTTP Cookies | Session Management |
| Google OAuth 2.0 | Social Login |
| GitHub OAuth 2.0 | Social Login |
---
## 📂 File & Media Storage
| Technology | Purpose |
|------------|----------|
| Cloudinary | Media Storage |
| Multer | File Upload Handling |
---
## 📧 Email Services
| Technology | Purpose |
|------------|----------|
| Nodemailer | Email Delivery |
| SMTP | Email Transport |
---
## 💳 Payment Processing
| Technology | Purpose |
|------------|----------|
| Stripe | Online Payments |
---
## 🚦 Performance & Security
| Technology | Purpose |
|------------|----------|
| Upstash Redis | API Rate Limiting |
---
## 🚀 Deployment
| Component | Platform |
|------------|----------|
| Customer Frontend | Vercel |
| Admin Dashboard | Vercel |
| Backend API | Render |
| Database | MongoDB Atlas |
---
# 📂 Project Structure
```text
Hotel-Booking-System/
│
├── frontend/        # Customer-facing Application
├── admin/           # Administration Dashboard
├── backend/         # Express API & Business Logic
└── README.md
```
---
# 👨💻 Customer Pages
The customer application includes:
- 🏠 Home
- 📝 Register
- 🏨 Hotels
- 🏨 Hotel Detail
- 🛏️ Rooms
- 🛏️ Room Detail
- 📅 My Bookings
- 👤 Profile
- ℹ️ About
- 📞 Contact
- 🔒 Privacy Policy
- 🔑 Forgot Password
- ✅ Verify Email
---
# 🔐 Authentication
The application provides dedicated authentication systems for customers and administrators.
---
## 👤 Customer Authentication
Features include:
- Email & Password Login
- JWT Authentication
- Secure Cookie Storage
- Email Verification
- Password Reset via OTP
- Google OAuth Login
- GitHub OAuth Login
---
## 👨💼 Admin Authentication
Features include:
- Email & Password Login
- JWT Authentication
- OTP-Based Password Reset
- bcrypt Password Hashing
- ADMIN_EMAIL Validation
---
# 🏨 Hotel Management
Administrators can manage hotel listings through the admin dashboard.
---
## Hotel Management Operations
- Create Hotels
- Upload Hotel Images
- Manage Hotel Information
- Update Hotel Status
- Delete Hotels
---
## Hotel Information
Each hotel record includes:
- Hotel Name
- Images
- Email Address
- Phone Number
- Address
- City
- Country
- Description
- Amenities
---
# 🛏️ Room Management
Administrators can manage rooms associated with hotels.
---
## Room Management Operations
- Create Rooms
- Upload Room Images
- Manage Room Details
- Update Room Status
- Delete Rooms
---
## Room Information
Each room contains:
- Room Number
- Room Type
- Price Per Night
- Guest Capacity
- Description
- Amenities
- Associated Hotel
---
# 📅 Booking System
Customers can reserve rooms by selecting preferred check-in and check-out dates.
---
## Booking Features
- Select Check-In Date
- Select Check-Out Date
- Automatic Night Calculation
- Automatic Price Calculation
- Stripe Payments
- Booking Status Tracking
- Booking Cancellation
---
## Booking Statuses
| Status | Description |
|----------|-------------|
| Pending | Awaiting review |
| Accepted | Booking approved |
| Rejected | Booking rejected |
| Completed | Stay completed |
| Cancelled | Booking cancelled |
---
# 💳 Payment Integration
The application uses **Stripe** for online payment processing.
---
## Booking Workflow
1. Select a Room
2. Choose Check-In Date
3. Choose Check-Out Date
4. Calculate Total Nights
5. Calculate Total Amount
6. Complete Stripe Payment
7. Verify Payment
8. Confirm Booking
---
# ☁️ Cloud Storage & Database
## Cloudinary
Cloudinary is used for:
- Hotel Images
- Room Images
- PDF Uploads
- Media Storage
---
## MongoDB Atlas
MongoDB stores:
- User Information
- Admin Information
- Hotels
- Rooms
- Bookings
- Image URLs
- Contact Requests
---
# 📧 Email Services
The platform uses **Nodemailer** and **SMTP** for:
- Email Verification OTPs
- Password Reset OTPs
- Contact Messages
- Account Notifications
---
# 🔗 API Endpoints
The backend provides separate route groups for customers and administrators.
---
## 👤 User Routes
### Base URL
```text
/api/v1/user
```
| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /register | Register User |
| POST | /login | Login User |
| GET | /verify | Verify User |
| POST | /logout | Logout User |
| GET | /profile | Get Profile |
| PATCH | /update-profile | Update Profile |
| DELETE | /delete-account | Delete Account |
| GET | /all-hotels | Get All Hotels |
| GET | /hotel-rooms/:id | Get Hotel Rooms |
| GET | /all-rooms | Get All Rooms |
| POST | /create-booking/:id | Create Booking |
| POST | /verify-stripe-payment | Verify Stripe Payment |
| DELETE | /cancel-booking/:id | Cancel Booking |
| GET | /bookings | Get User Bookings |
| POST | /send-contact-message | Contact Support |
---
## 👨💼 Admin Routes
### Base URL
```text
/api/v1/owner
```
| Method | Endpoint | Description |
|----------|-------------|-------------|
| POST | /register | Register Admin |
| POST | /login | Login Admin |
| GET | /verify | Verify Admin |
| GET | /profile | Get Admin Profile |
| POST | /logout | Logout Admin |
| POST | /create-hotel | Create Hotel |
| GET | /all-hotels | Get Hotels |
| DELETE | /delete-hotel/:id | Delete Hotel |
| PATCH | /update-hotel-status/:id | Update Hotel Status |
| POST | /add-room | Create Room |
| GET | /all-rooms | Get Rooms |
| DELETE | /delete-room/:id | Delete Room |
| PATCH | /update-room-status/:id | Update Room Status |
| GET | /all-bookings | Get All Bookings |
| PATCH | /update-booking-status/:id | Update Booking Status |
---
# ⚙️ Environment Variables
## Backend (`backend/.env`)
```env
PORT=
ADMIN_EMAIL=
MONGODB_URI=
DB_NAME=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SENDER_EMAIL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_WEBHOOK_ENDPOINT=
```
---
## Frontend (`frontend/.env`)
```env
VITE_BACKEND_URL=http://localhost:8011
```
---
## Admin Dashboard (`admin/.env`)
```env
VITE_BACKEND_URL=http://localhost:8011
```
---
# 🚀 Installation & Setup
## 1️⃣ Clone Repository
```bash
git clone https://github.com/Jabbirkhan/Full-Stack-Hotel-Booking-Website.git
```
---
## 2️⃣ Install Dependencies
### Backend
```bash
cd backend
npm install
```
### Frontend
```bash
cd frontend
npm install
```
### Admin Dashboard
```bash
cd admin
npm install
```
---
## 3️⃣ Configure Environment Variables
Create `.env` files inside:
```text
backend/
frontend/
admin/
```
Add all required credentials and configuration values.
---
## 4️⃣ Start Development Servers
### Backend
```bash
cd backend
npm run server
```
### Frontend
```bash
cd frontend
npm run dev
```
### Admin Dashboard
```bash
cd admin
npm run dev
```
✅ Run all applications in separate terminal windows.
---
# 📱 Responsive Design
Optimized for:
- 💻 Desktop
- 📱 Mobile Devices
- 📟 Tablets
---
# 🔒 Security Features
The application includes:
- bcrypt Password Hashing
- JWT Authentication
- Secure HTTP Cookies
- Email Verification
- OTP-Based Password Reset
- Google OAuth Login
- GitHub OAuth Login
- Upstash Redis Rate Limiting
- Input Validation
- Protected Routes
- Secure File Uploads
---
# 🌍 Deployment Architecture
| Service | Platform |
|----------|----------|
| Customer Frontend | Vercel |
| Admin Dashboard | Vercel |
| Backend API | Render |
| Database | MongoDB Atlas |
| Media Storage | Cloudinary |
---
# 📄 License
This project is licensed under the **MIT License**.
---
# 👨💻 Author
Developed using:
- React.js
- Node.js
- Express.js
- MongoDB Atlas
- Stripe
- Cloudinary
- JWT Authentication
- Google & GitHub OAuth
- Tailwind CSS
---
