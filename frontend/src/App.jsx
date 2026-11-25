import React, { lazy, Suspense, useContext } from 'react'
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Context } from './context/context';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/errorBoundary';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Loader from './components/loader';

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const Hotels = lazy(() => import("./pages/hotels"));
const HotelDetail = lazy(() => import("./pages/hotelDetail"));
const Rooms = lazy(() => import("./pages/rooms"));
const RoomDetail = lazy(() => import("./pages/roomDetail"));
const Profile = lazy(() => import("./pages/profile"));
const MyBookings = lazy(() => import("./pages/myBookings"));
const VerifyUserEmail = lazy(() => import('./pages/verifyUserEmail'));
const UserForgetPassword = lazy(() => import('./pages/userForgetPassword'));
const Verify = lazy(() => import('./pages/verify'));
const About = lazy(() => import('./pages/about'));
const Contact = lazy(() => import('./pages/contact'));
const TermsOfService = lazy(() => import('./pages/termsOfServices'));
const PrivacyPolicy = lazy(() => import('./pages/privacyPolicy'));
const NotFound = lazy(() => import("./pages/notFound"));


const App = () => {

  const { auth } = useContext(Context);
  const location = useLocation();

  if (auth.status === 'checking') {
    return <Loader />
  }

  if (auth.status === 'unauthenticated' && location.pathname !== '/user-login' && location.pathname !== '/user-forget-password' && location.pathname !== '/terms-of-service' && location.pathname !== '/privacy-policy') {
    return <Navigate to='/user-login' replace />
  }

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { window.location.reload(); }}>
        <Suspense fallback={<Loader />}>
          <Routes>

            {auth.role === 'user' && (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/hotels' element={<Hotels />} />
                <Route path='/hotel-detail/:id' element={<HotelDetail />} />
                <Route path='/rooms' element={<Rooms />} />
                <Route path='/room-detail/:id' element={<RoomDetail />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/my-bookings' element={<MyBookings />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/verify-email' element={<VerifyUserEmail />} />
                <Route path='/verify' element={<Verify />} />
              </>
            )}

            <Route path='/user-login' element={auth.status === 'authenticated' ? <Navigate to='/' replace/> : <Login />} />
            <Route path='/user-forget-password' element={<UserForgetPassword />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </div>
  )
}

export default App
