import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from "./../utils/axiosInstance.js";
import { Context } from "./../context/context";

const Verify = () => {

  const { auth, fetchAllBookings, navigate } = useContext(Context);

  // 5. Here we get the query parameters that backend send
  const queryParams = new URLSearchParams(window.location.search);
  const success = queryParams.get('success');
  const canceled = queryParams.get('canceled');
  const bookingId = queryParams.get('bookingId');

  // 6. Here we verify the payment status by sending a request to backend with orderId and success query parameters, backend will verify the payment status and update the order status in database, and also clear the cart data in user profile if payment is successful
  const verifyPayment = async () => {
    try {
      if (auth.status === 'unauthenticated' && auth.role !== 'user') {
        navigate('/login');
        return;
      }

      if (canceled === "true" || !bookingId) {
        navigate("/rooms");
        return;
      }

      const response = await axiosInstance.post(`/api/v1/user/verify-stripe-payment?bookingId=${bookingId}`);
      if (response.data.payment) {
        toast.success(response.data.message);
        navigate('/my-bookings');
        fetchAllBookings();
      } else {
        toast.error(response.data.message || "Unable to verify payment");
        navigate('/rooms');
      }

    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div>
      Payment verify page
    </div>
  )
}

export default Verify
