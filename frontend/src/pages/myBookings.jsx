import { useContext, useEffect, useState } from "react";
// import { bookings } from "../assets/assets.js";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaTimesCircle, FaEye, FaBan, FaMoneyBillWave, FaTrash } from "react-icons/fa";
import { Context } from "../context/context.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance.js";
import Loader from "../components/loader.jsx";

const MyBooking = () => {

  const { allBookings, setAllBookings, auth, navigate, fetchAllBookings } = useContext(Context);
  const bookings = allBookings;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const [loader, setLoader] = useState(false);

  const cancelBooking = async (id) => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'user') {
        return navigate('/login');
      }
      setLoader(true);
      const response = await axiosInstance.delete(`/api/v1/user/cancel-booking/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setAllBookings((prev) => prev.filter((booking) => booking._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchAllBookings();
  }, [fetchAllBookings]);

  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter(booking => booking.status === "Accepted").length || 0;
  const pendingBookings = bookings.filter(booking => booking.status === "Pending").length || 0;
  const cancelledBookings = bookings.filter(booking => booking.status === "Rejected").length || 0;

  if (allBookings.length === 0) {
    return (
      <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
        <h2 className="text-3xl font-bold text-white text-center mt-10">
          No Bookings Found
        </h2>
        <Link to='/' onClick={scrollToTop}>
          <button className='px-5 py-2 rounded-md bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 mt-2 cursor-pointer'>Home</button>
        </Link>
      </main>
    )
  }

  if (loader) {
    return <Loader />
  }

  return (
    <section className="bg-slate-900 min-h-screen py-20 px-5 sm:px-10 md:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            My Bookings
          </h1>

          <p className="text-gray-400 mt-2">
            View all your hotel reservations and booking status.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">

          <div className="bg-[#181b22] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <FaCalendarAlt className="text-3xl text-[#dec29a]" />
              <span className="text-sm text-gray-400">
                Total
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white">
              {totalBookings}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Total Bookings
            </p>
          </div>

          <div className="bg-[#181b22] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <FaCheckCircle className="text-3xl text-green-500" />
              <span className="text-sm text-gray-400">
                Completed
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white">
              {confirmedBookings}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Completed Bookings
            </p>
          </div>

          <div className="bg-[#181b22] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <FaClock className="text-3xl text-yellow-500" />
              <span className="text-sm text-gray-400">
                Pending
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white">
              {pendingBookings}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Waiting Approval
            </p>
          </div>

          <div className="bg-[#181b22] border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <FaTimesCircle className="text-3xl text-red-500" />
              <span className="text-sm text-gray-400">
                Rejected
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white">
              {cancelledBookings}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              Cancelled Bookings
            </p>
          </div>

        </div>

        <div className="bg-[#181b22] border border-white/10 rounded-xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full min-w-275">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left px-6 py-5 text-sm uppercase tracking-wider text-gray-400">
                    Hotel & Room
                  </th>
                  <th className="text-left px-6 py-5 text-sm uppercase tracking-wider text-gray-400">
                    Dates
                  </th>
                  <th className="text-left px-6 py-5 text-sm uppercase tracking-wider text-gray-400">
                    Amount
                  </th>
                  <th className="text-left px-6 py-5 text-sm uppercase tracking-wider text-gray-400">
                    Payment
                  </th>
                  <th className="text-left px-6 py-5 text-sm uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                  <th className="text-right px-6 py-5 text-sm uppercase tracking-wider text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-white/10 hover:bg-white/5 duration-300">
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <img src={booking.hotelId.images?.[0]} alt={booking.hotelId.name} className="w-20 h-16 rounded-lg object-cover shrink-0" />

                        <div>
                          <h3 className="text-white font-semibold text-lg">
                            {booking.hotelId.name}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {booking.roomId.name}
                          </p>
                          <p className="text-[#dec29a] text-sm mt-1">
                            {booking.hotelId.city}, {booking.hotelId.country}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-6">
                      <p className="text-white">
                        {booking.checkInDate.split('T')[0]}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        to
                      </p>
                      <p className="text-white mt-1">
                        {booking.checkOutDate.split('T')[0]}
                      </p>
                    </td>

                    <td className="px-6 py-6">
                      <h3 className="text-[#dec29a] text-lg font-bold">
                        ${booking.totalAmount}
                      </h3>
                    </td>

                    <td className="px-6 py-6">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
                                                ${booking.paymentStatus === "paid"
                            ? "bg-green-500/15 text-green-400"
                            : booking.paymentStatus === "refunded"
                              ? "bg-blue-500/15 text-blue-400"
                              : "bg-yellow-500/15 text-yellow-400"
                          }`}
                      >
                        <FaMoneyBillWave />
                        {booking.paymentStatus}
                      </span>
                    </td>

                    <td className="px-6 py-6">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium
                                                ${booking.status === "confirmed"
                            ? "bg-green-500/15 text-green-400"
                            : booking.status === "pending"
                              ? "bg-yellow-500/15 text-yellow-400"
                              : "bg-red-500/15 text-red-400"
                          }`}
                      >
                        {
                          booking.status === "confirmed"
                            ? <FaCheckCircle />
                            : booking.status === "pending"
                              ? <FaClock />
                              : <FaTimesCircle />
                        }
                        {booking.status}
                      </span>
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex justify-end items-center gap-4">
                        <button onClick={() => cancelBooking(booking._id)} className="text-gray-400 hover:text-red-600 duration-300 cursor-pointer">
                          <FaTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBooking