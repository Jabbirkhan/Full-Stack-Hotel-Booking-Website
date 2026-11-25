import { useContext, useState } from "react";
// import { bookings } from "../../assets/assets.js";
import { FiSearch, FiFilter, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Context } from "../../context/context.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import Loader from "../../components/loader.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllBookings = () => {

  const { ownerAllBookings, auth, navigate, fetchOwnerBookings } = useContext(Context);
  const bookings = ownerAllBookings.slice();

  const [loader, setLoader] = useState(false);

  const updateBookingStatus = async (id, value) => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'owner') {
        return navigate('/login');
      }
      setLoader(true);

      const status = {
        status: value
      }

      const response = await axiosInstance.patch(`/api/v1/owner/update-booking-status/${id}`, status);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchOwnerBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  if (bookings.length === 0) {
    return (
      <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
        <h2 className="text-3xl font-bold text-white text-center mt-10">
          No Bookings Found
        </h2>
        <Link onClick={fetchOwnerBookings}>
          <button className='px-5 py-2 rounded-md bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 mt-2 cursor-pointer'>Refresh</button>
        </Link>
      </main>
    )
  }

  if (loader) {
    return <Loader />
  }

  return (
    <main className="min-h-screen w-full flex flex-1 flex-col p-3 py-5 bg-slate-900">

      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 px-6 lg:px-10 py-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Managed Bookings
          </h2>
          <p className="text-gray-400 mt-2 max-w-3xl leading-7">
            Monitor every reservation across all hotels. Track guests,
            room allocations, booking status and payment information
            from one centralized dashboard.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full sm:w-72 bg-[#1d1d24] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-gray-500 outline-none focus:border-[#dec29a]"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-white/10 bg-[#24242d] hover:bg-[#2d2d37] transition cursor-pointer">
            <FiFilter className="text-lg" />
            Filter
          </button>
        </div>
      </header>

      {/* Desktop Table */}
      {/* <section className="hidden xl:block px-6 lg:px-10 pb-10">
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#18181f]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Booking
                </th>
                <th className="px-6 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Guest
                </th>
                <th className="px-6 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Hotel
                </th>
                <th className="px-6 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Room
                </th>
                <th className="px-6 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Check In
                </th>
                <th className="px-6 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Check Out
                </th>
                <th className="px-6 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Amount
                </th>
                <th className="px-6 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Status
                </th>
                <th className="px-6 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Payment
                </th>
                <th className="px-6 py-5 text-right text-sm uppercase tracking-wider text-[#dec29a]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="group border-b border-white/5 hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <h4 className="font-semibold text-white">
                      {booking._id.toUpperCase()}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {booking.room.roomType}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <h4 className="text-white">
                      {booking.user.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {booking.user.email}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-white">
                      {booking.hotel.name}
                    </div>
                    <p className="text-sm text-gray-400">
                      {booking.hotel.city}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-center text-gray-300">
                    {booking.room.roomNumber}
                  </td>

                  <td className="px-6 py-4 text-center text-gray-300">
                    {booking.checkInDate.toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center text-gray-300">
                    {booking.checkOutDate.toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center font-semibold text-[#dec29a]">
                    ${booking.amount}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs capitalize border ${booking.status === "confirmed"
                            ? "bg-green-500/10 border-green-500/20 text-green-400"
                            : booking.status === "pending"
                              ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                              : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs capitalize border ${booking.paymentStatus === "paid"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : booking.paymentStatus === "unpaid"
                              ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                              : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                          }`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button className="p-2 hover:text-[#dec29a] transition cursor-pointer">
                        <FiEye size={18} />
                      </button>
                      <button className="p-2 hover:text-blue-400 transition cursor-pointer">
                        <FiEdit2 size={18} />
                      </button>
                      <button className="p-2 hover:text-red-400 transition cursor-pointer">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> */}

      {/* Mobile Cards */}
      <section className="px-5 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-[#18181f] border border-white/10 rounded-2xl overflow-hidden">

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm text-white">
                      Booking #{booking._id}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {booking.hotelId.name}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-[#dec29a]">
                    ${booking.totalAmount}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Guest
                    </span>
                    <span className="text-white text-right">
                      {booking.userId.name}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Room
                    </span>
                    <span className="text-white">
                      {booking.roomId.roomNumber}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Room Type
                    </span>
                    <span className="text-white">
                      {booking.roomId.roomType}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Check In
                    </span>
                    <span className="text-white">
                      {booking.checkInDate.split('T')[0]}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Check Out
                    </span>
                    <span className="text-white">
                      {booking.checkOutDate.split('T')[0]}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Booking Status
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs capitalize border ${booking.status === "confirmed"
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : booking.status === "pending"
                          ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Payment
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs capitalize border ${booking.paymentStatus === "paid"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : booking.paymentStatus === "unpaid"
                          ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
                          : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                        }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <select className="text-gray-300"
                      onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                      value={booking.status}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllBookings