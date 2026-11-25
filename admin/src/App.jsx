import React, { lazy, Suspense, useContext } from 'react'
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Context } from './context/context';
import { ToastContainer } from 'react-toastify';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/errorBoundary';
import Loader from './components/loader';

const OwnerRegister = lazy(() => import("./pages/ownerPages/ownerRegister"));
const OwnerHome = lazy(() => import('./pages/ownerPages/ownerHome'));
const AddHotel = lazy(() => import("./pages/ownerPages/addHotel"));
const AllHotels = lazy(() => import("./pages/ownerPages/allHotels"));
const AddRoom = lazy(() => import("./pages/ownerPages/addRoom"));
const AllRooms = lazy(() => import("./pages/ownerPages/allRoom"));
const AllBookings = lazy(() => import("./pages/ownerPages/allBookings"));
const OwnerForgetPassword = lazy(() => import('./pages/ownerPages/ownerForgetPassword'));
const NotFound = lazy(() => import("./pages/notFound"));

const App = () => {

  const { auth } = useContext(Context);
  const location = useLocation();

  if (auth.status === 'checking') {
    return <Loader />
  }

  if (auth.status === 'unauthenticated' && location.pathname !== '/owner-login' && location.pathname !== '/owner-forget-password') {
    return <Navigate to='/owner-login' replace />
  }

  return (
    <div>
      <ToastContainer />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => { window.location.reload(); }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            {auth.role === 'owner' && (
              <>
                <Route path='/' element={<OwnerHome />}>
                  <Route index element={<AddHotel />} />
                  <Route path='all-hotels' element={<AllHotels />} />
                  <Route path='add-room' element={<AddRoom />} />
                  <Route path='all-rooms' element={<AllRooms />} />
                  <Route path='all-bookings' element={<AllBookings />} />
                </Route>
              </>
            )}

            <Route path='/owner-login' element={auth.status === 'authenticated' ? <Navigate to='/' replace/> : <OwnerRegister />} />
            <Route path='/owner-forget-password' element={<OwnerForgetPassword />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

export default App
