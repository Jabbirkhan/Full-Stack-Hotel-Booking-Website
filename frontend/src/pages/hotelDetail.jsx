import { useMemo, useState, useContext, useEffect } from "react";
import { FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWifi, FaSwimmingPool, FaParking, FaDumbbell, FaUtensils, FaUserFriends, FaExpandArrowsAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/context.jsx";
import axiosInstance from "../utils/axiosInstance.js";
import { toast } from "react-toastify";

const HotelDetail = () => {

  const { id } = useParams();
  const { auth, navigate, allHotels } = useContext(Context);

  const hotel = useMemo(() => {
    return allHotels.find((h) => h._id === id);
  }, [id, allHotels]);

  const [hotelRooms, setHotelRooms] = useState([]);

  const fetchHotelRooms = async () => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'user') {
        return navigate('/user-login');
      }
      const response = await axiosInstance.get(`/api/v1/user/hotel-rooms/${id}`);
      if (response.data.success) {
        setHotelRooms(response.data.rooms);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }

  useEffect(() => {
    if(auth.status !== 'authenticated' || auth.role !== 'user') {
      return navigate('/login');
    }
    fetchHotelRooms();
  }, [id]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!hotel) {
    return (
      <main className="pt-30 min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="pt-30 pb-20 bg-slate-900 text-white">
      {/* Hero Gallery */}
      <section className="px-5 sm:px-10 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
        <div className="lg:col-span-8 h-70 sm:h-105 lg:h-180 overflow-hidden rounded-2xl group">
          <img src={hotel.images?.[0]} alt={hotel.name} className="w-full h-full object-cover duration-700 group-hover:scale-105" />
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6 h-180">
          <div className="flex-1 overflow-hidden rounded-2xl group">
            <img src={hotel.images?.[1]} alt={hotel.name} className="w-full h-full object-cover duration-700 group-hover:scale-110" />
          </div>

          <div className="flex-1 overflow-hidden rounded-2xl group relative">
            <img src={hotel.images?.[2]} alt={hotel.name} className="w-full h-full object-cover duration-700 group-hover:scale-110" />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center">
              <button className="border border-white px-5 py-2 rounded-full text-sm font-medium cursor-pointer">
                View {hotel.images?.length} Photos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Detail */}
      <section className="px-5 sm:px-10 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left */}
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-4 mb-5">
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${hotel.status === true
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
                }`}
            >
              {hotel.status === true ? "Operational" : "Inactive"}
            </span>

            {/* <div className="flex items-center gap-1 text-[#dec29a]">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} />
              ))}
              <span className="ml-2 text-white font-medium">5.0</span>
            </div> */}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-5">
            {hotel.name}
          </h1>

          <div className="flex items-center gap-3 text-gray-400 mb-10">
            <FaMapMarkerAlt className="text-[#dec29a]" />
            <span>
              {hotel.address}, {hotel.city}, {hotel.country}
            </span>
          </div>

          <div className="space-y-6 max-w-4xl text-gray-300 leading-8 text-lg">
            <p>{hotel.description}</p>

            <p>
              Experience premium hospitality with elegant rooms, modern
              facilities, exceptional dining, and personalized services.
              Whether you're traveling for business or vacation, our hotel
              offers everything you need for a comfortable and memorable stay.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-4">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col gap-8">
            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-5">
                Contact Information
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                    <FaPhoneAlt className="text-[#dec29a]" />
                  </div>

                  <div>
                    <h4 className="font-semibold">{hotel.phone}</h4>
                    <p className="text-sm text-gray-400">
                      Primary Concierge
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                    <FaEnvelope className="text-[#dec29a]" />
                  </div>

                  <div>
                    <h4 className="font-semibold">{hotel.email}</h4>
                    <p className="text-sm text-gray-400">
                      General Enquiries
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            <div>
              <p className="text-xs tracking-widest uppercase text-gray-400 mb-5">
                Exclusive Amenities
              </p>

              <div className="grid grid-cols-2 gap-5">
                {hotel.amenities.map((amenity) => {
                  const icon =
                    amenity === "WiFi" ? (
                      <FaWifi />
                    ) : amenity === "Swimming Pool" ? (
                      <FaSwimmingPool />
                    ) : amenity === "Parking" ? (
                      <FaParking />
                    ) : amenity === "Restaurant" ? (
                      <FaUtensils />
                    ) : amenity === "Gym" ? (
                      <FaDumbbell />
                    ) : (
                      <FaStar />
                    );

                  return (
                    <div key={amenity} className="flex items-center gap-3">
                      <span className="text-[#dec29a] text-lg">{icon}</span>
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* hotels rooms */}
      <section className="px-5 sm:px-10 md:px-20 my-10">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dec29a]">
              Destinations
            </span>
            <h2 className="mt-2 text-4xl font-bold text-[#dec29a] lg:text-5xl">
              All Available Rooms
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {hotelRooms.map((room) => (
            <div key={room._id} className="group flex flex-col gap-6 overflow-hidden rounded-md shadow-md shadow-[#e4af60] bg-slate-900 p-5 transition duration-300 hover:-translate-y-1 hover:bg-slate-800">

              <div className="overflow-hidden rounded-md shrink-0">
                <img src={room.images?.[0]} alt={room.roomType} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {room.roomType} Room
                      </h3>
                      <p className="mt-1 text-gray-400">
                        {room.hotelId.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-right">
                      <h4 className="text-xl font-bold text-[#dec29a]">
                        ${room.pricePerNight}
                      </h4>
                      <span className="text-sm text-gray-400">
                        / night
                      </span>
                    </div>
                  </div>

                  <p className="mt-1 line-clamp-2 text-gray-400">
                    {room.description}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-5">
                    <div className="flex items-center gap-2 text-gray-300">
                      <FaUserFriends className="text-[#dec29a]" />
                      <span>
                        {room.capacity} Guests
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <FaExpandArrowsAlt className="text-[#dec29a]" />
                      <span>
                        Room #{room.roomNumber}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {room.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wider text-gray-300">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to={`/room-detail/${room._id}`} onClick={scrollToTop}>
                  <button className="mt-5 w-full rounded-md border border-white/10 py-3 font-semibold text-white transition hover:border-[#dec29a] hover:text-[#dec29a] cursor-pointer">
                    View Room
                  </button>
                </Link>

              </div>

            </div>
          ))}

        </div>
      </section>
    </main>
  );
};

export default HotelDetail