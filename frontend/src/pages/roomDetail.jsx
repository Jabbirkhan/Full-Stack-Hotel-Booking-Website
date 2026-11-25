import { useContext, useEffect, useMemo, useState } from "react";
// import { rooms } from "../assets/assets.js";
import { FaUsers, FaBed, FaRulerCombined, FaMapMarkerAlt, FaWifi, FaSnowflake, FaTv, FaGlassMartiniAlt, FaDumbbell, FaSpa, FaConciergeBell, FaStar, FaArrowRight, FaCalendarAlt, FaUserFriends, FaSearch } from "react-icons/fa";
import { MdCalendarMonth, MdPerson } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/context.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-toastify";

const RoomDetail = () => {

  const { id } = useParams();
  const { auth, navigate, currency, serviceFee, taxeFee, allRooms } = useContext(Context);
  const rooms = allRooms.slice();

  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalNights, setTotalNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('')

  const [bookings, setBookings] = useState([]);

  // find room
  const room = useMemo(() => {
    return rooms.find((r) => r._id === id);
  }, [id, rooms]);

  // scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // if room not found
  if (!room) {
    return (
      <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
        <h2 className="text-3xl font-bold text-white text-center mt-10">
          No Room Found
        </h2>
        <Link to='/' onClick={scrollToTop}>
          <button className='px-5 py-2 rounded-md bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 mt-2 cursor-pointer'>Home</button>
        </Link>
      </main>
    )
  }

  // fetch room bookings
  const fetchRoomBookings = async (id) => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'user') {
        return navigate('/user-login')
      }
      const response = await axiosInstance.get(`/api/v1/user/room-bookings/${id}`);
      if (response.data.success) {
        setBookings(response.data.roomBookings);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    fetchRoomBookings(id);
  }, [id]);

  // count total nights
  const countTotalNight = (checkInDate, checkOutDate) => {
    if (!checkInDate || !checkOutDate) {
      setTotalNights(0);
      return;
    }

    const date1 = new Date(checkInDate);
    const date2 = new Date(checkOutDate);

    if (date1 >= date2) {
      setTotalNights(0);
      return toast.warn("Checkin date must be smaller then checkout date")
    }

    const diffDays = Math.ceil(
      (date2 - date1) / (1000 * 60 * 60 * 24)
    );

    setTotalNights(diffDays > 0 ? diffDays : 0);
  }


  useEffect(() => {
    if (checkInDate && checkOutDate) {
      countTotalNight(checkInDate, checkOutDate);
    }
  }, [checkInDate, checkOutDate]);


  useEffect(() => {
    setTotalAmount(room.pricePerNight * totalNights + serviceFee + taxeFee);
  }, [totalNights]);


  const checkRoomAvailability = (checkInDate, checkOutDate) => {
    for (let booking of bookings) {
      const bookedCheckIn = new Date(booking.checkInDate);
      const bookedCheckOut = new Date(booking.checkOutDate);

      const requestedCheckIn = new Date(checkInDate);
      const requestedCheckOut = new Date(checkOutDate);

      if (requestedCheckIn < bookedCheckOut && requestedCheckOut > bookedCheckIn) {
        return toast.warn("Room is not available for the selected dates");
      }
    }
    return true;
  }

  const createBooking = async (id) => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'user') {
        return navigate('/login');
      }

      if (!paymentMethod) {
        return toast.warn("Please select payment method!");
      }

      const isRoomAvailable = checkRoomAvailability(checkInDate, checkOutDate);
      if (!isRoomAvailable) return;

      const idempotencyKey = sessionStorage.getItem("stripeCheckoutKey") || crypto.randomUUID();
      sessionStorage.setItem("stripeCheckoutKey", idempotencyKey);

      const response = await axiosInstance.post(`/api/v1/user/create-booking/${id}`, { checkInDate, checkOutDate, paymentMethod, idempotencyKey });
      if (response.data.success) {
        toast.success(response.data.message);
        const { session_url } = response.data;
        window.location.replace(session_url);
        sessionStorage.removeItem("stripeCheckoutKey");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.warn(error.response?.data?.message);
      } else {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  }

  return (
    <main className="pt-24 pb-20 bg-[#0B1220] text-white">
      {/* Hero Gallery */}
      <section className="px-5 sm:px-10 md:px-20 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-2 gap-4 h-auto lg:h-150">
          <div className="lg:col-span-8 lg:row-span-2 relative rounded-2xl overflow-hidden group h-75 sm:h-112.5 lg:h-auto">
            <img src={room.images?.[0]} alt={room.roomType} className="w-full h-full object-cover duration-700 group-hover:scale-105" />

            <div className="absolute bottom-6 left-6">
              <span
                className={`px-5 py-2 rounded-full text-sm font-semibold ${room.status
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                  }`}
              >
                {room.status ? "Available" : "Unavailable"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl overflow-hidden group h-62.5 lg:h-auto">
            <img src={room.images?.[1]} alt={room.roomType} className="w-full h-full object-cover duration-700 group-hover:scale-105" />
          </div>

          <div className="lg:col-span-4 relative rounded-2xl overflow-hidden group h-62.5 lg:h-auto">
            <img src={room.images?.[2]} alt={room.roomType} className="w-full h-full object-cover duration-700 group-hover:scale-105" />

            <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center cursor-pointer">
              <span className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2 rounded-full">
                +{room.images.length} Photos
              </span>
            </button>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-10 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left */}
        <div className="lg:col-span-8 space-y-8">
          <header>
            <div className="flex items-center gap-4 mb-3">
              <span className="uppercase tracking-[4px] text-[#dec29a] text-sm font-semibold">
                {room.hotelId.name}
              </span>

              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-5">
              {room.roomType} Room #{room.roomNumber}
            </h1>

            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <FaUsers className="text-[#dec29a]" />
                <span>Up to {room.capacity} Guests</span>
              </div>

              <div className="flex items-center gap-2">
                <FaRulerCombined className="text-[#dec29a]" />
                <span>Luxury Suite</span>
              </div>

              <div className="flex items-center gap-2">
                <FaBed className="text-[#dec29a]" />
                <span>{room.roomType} Bed</span>
              </div>
            </div>
          </header>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#dec29a] mb-5">
              Experience Immersion
            </h2>

            <p className="text-gray-300 leading-8 mb-8">
              {room.description} Experience luxury accommodation featuring
              elegant interiors, premium furnishings, panoramic city views,
              exceptional comfort and personalized hospitality for an
              unforgettable stay.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {room.amenities.map((item) => {
                const icon =
                  item === "WiFi" ? (
                    <FaWifi />
                  ) : item === "AC" ? (
                    <FaSnowflake />
                  ) : item === "TV" ? (
                    <FaTv />
                  ) : item === "Mini Bar" ? (
                    <FaGlassMartiniAlt />
                  ) : (
                    <FaStar />
                  );

                return (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#dec29a]">
                      {icon}
                    </div>

                    <span>{item}</span>
                  </div>
                );
              })}

              {/* <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#dec29a]">
                  <FaSpa />
                </div>
                <span>Private Spa</span>
              </div> */}

              {/* <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#dec29a]">
                  <FaConciergeBell />
                </div>
                <span>24/7 Butler</span>
              </div> */}

              {/* <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#dec29a]">
                  <FaDumbbell />
                </div>
                <span>Gym Access</span>
              </div> */}
            </div>
          </div>

          {/* Hotel Card */}
          <div className="bg-white/5 border border-l-4 border-l-[#dec29a] border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center">
            <img src={room.hotelId.images?.[0]} alt={room.hotelId.name} className="w-28 h-28 rounded-xl object-cover" />

            <div>
              <h3 className="text-2xl font-semibold mb-2">
                {room.hotelId.name}
              </h3>

              <p className="flex items-center gap-2 text-gray-400 mb-4">
                <FaMapMarkerAlt className="text-[#dec29a]" />
                {room.hotelId.address}, {room.hotelId.city},{" "}
                {room.hotelId.country}
              </p>

              {/* <button className="uppercase tracking-widest border-b border-[#dec29a]/40 hover:border-[#dec29a] text-[#dec29a] text-sm cursor-pointer">
                View Property Details
              </button> */}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-1 items-center">
                <h2 className="text-4xl font-bold text-[#dec29a]">
                  ${room.pricePerNight}
                </h2>
                <p className="text-gray-400">/ Night</p>
              </div>

              {/* <div className="flex text-[#dec29a]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div> */}
            </div>

            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-2 gap-3">

                {/* checkin date */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">
                    Check-in
                  </label>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 duration-300 cursor-pointer">
                    <input type="date"
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      value={checkInDate}
                      placeholder="Select Date"
                      className="bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* checkout date */}
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-gray-400 mb-1">
                    Check-out
                  </label>
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 duration-300 cursor-pointer">
                    <input type="date"
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      value={checkOutDate}
                      min={new Date().toISOString().split('T')[0]}
                      placeholder="Select Date"
                      className="bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Total Amount */}
            <div className="border-t border-white/10 pt-6 space-y-3 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>
                  Total Nights
                </span>

                <span>{totalNights}</span>
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Service Fee</span>
                {totalNights > 0 ? <span>{currency}{serviceFee}</span> : <span>{currency} 00</span>}
              </div>

              <div className="flex justify-between text-gray-400">
                <span>Taxes</span>
                {totalNights > 0 ? <span>{currency}{taxeFee}</span> : <span>{currency} 00</span>}
              </div>

              <div className="flex justify-between border-t border-white/10 pt-4 text-xl font-semibold">
                <span>Total</span>

                {totalNights > 0 ?
                  <span className="text-[#dec29a]">{currency}{totalAmount}</span>
                  :
                  <span className="text-[#dec29a]">{currency} 00</span>
                }
              </div>
            </div>

            <div className="max-w-sm w-full flex flex-col justify-start items-start mt-4 gap-3">
              <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
              <div className="flex justify-between items-center gap-2">
                <div onClick={() => setPaymentMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                  <input type="checkbox" required />
                  <p className='text-sm text-gray-500 font-medium mx-4'>Stripe</p>
                </div>
              </div>
            </div>

            {totalNights > 0 && (
              <button onClick={() => createBooking(room._id)} className="mt-1 w-full py-4 rounded-xl bg-[#dec29a] hover:bg-[#e4af60] text-black font-semibold uppercase tracking-widest duration-300 cursor-pointer flex items-center justify-center gap-3">
                Book Reservation
                <FaArrowRight />
              </button>
            )}

          </div>
        </div>

      </section>

    </main>
  );
};

export default RoomDetail