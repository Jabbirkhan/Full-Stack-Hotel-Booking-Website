import { useContext, useState } from "react";
// import { rooms } from "../../assets/assets.js";
import { FiSearch, FiFilter, FiEye, FiEdit2, FiTrash2, FiEyeOff } from "react-icons/fi";
import { Context } from "../../context/context.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import Loader from "../../components/loader.jsx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AllRooms = () => {

  const { ownerAllRooms, setOwnerAllRooms, auth, navigate, fetchOwnerRooms } = useContext(Context);
  const rooms = ownerAllRooms.slice();

  const [loader, setLoader] = useState(false);

  const deleteRoom = async (id) => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'owner') {
        return navigate('/owner-login');
      }
      setLoader(true);
      const response = await axiosInstance.delete(`/api/v1/owner/delete-room/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setOwnerAllRooms((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  const updateRoomStatus = async (id) => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'owner') {
        return navigate('/owner-login');
      }
      setLoader(true);
      const response = await axiosInstance.patch(`/api/v1/owner/update-room-status/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchOwnerRooms();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (rooms.length === 0) {
    return (
      <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
        <h2 className="text-3xl font-bold text-white text-center mt-10">
          No Rooms Found
        </h2>
        <Link to='/add-room' onClick={scrollToTop}>
          <button className='px-5 py-2 rounded-md bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 mt-2 cursor-pointer'>Add Room</button>
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
            Managed Rooms
          </h2>
          <p className="text-gray-400 mt-2 max-w-3xl leading-7">
            Manage every room across your hotels. Track availability, pricing,
            room types and occupancy from a centralized dashboard.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search rooms..."
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
      <section className="px-6 lg:px-10 pb-10 hidden xl:block">
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#18181f]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-4 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Room Image
                </th>
                <th className="px-4 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Room
                </th>
                <th className="px-4 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Hotel
                </th>
                <th className="px-4 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Type
                </th>
                <th className="px-4 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Capacity
                </th>
                <th className="px-4 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Price/Night
                </th>
                <th className="px-4 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Status
                </th>
                <th className="px-4 py-5 text-right text-sm uppercase tracking-wider text-[#dec29a]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr
                  key={room._id}
                  className="group border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-4 py-4">
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={room.images[0]}
                        alt={room.roomNumber}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <h4 className="font-semibold text-white">
                      Room {room.roomNumber}
                    </h4>
                    <p className="text-sm text-gray-400">
                      ID: {room._id}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <div className="text-white">
                      {room.hotelId.name}
                    </div>
                    <p className="text-sm text-gray-400">
                      {room.hotelId.city}
                    </p>
                  </td>

                  <td className="px-4 py-4 text-gray-300">
                    {room.roomType}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-300">
                    {room.capacity} Guests
                  </td>

                  <td className="px-4 py-4 text-center font-semibold text-white">
                    ${room.pricePerNight}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs capitalize border ${room.status
                          ? "bg-green-500/10 border-green-500/20 text-green-400"
                          : "bg-red-500/10 border-red-500/20 text-red-400"
                          }`}
                      >
                        {room.status ? "Available" : "Unavailable"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => updateRoomStatus(room._id)} className="p-2 hover:text-[#dec29a] transition cursor-pointer">
                        {room.status === true ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                      </button>
                      {/* <button className="p-2 hover:text-blue-400 transition cursor-pointer">
                        <FiEdit2 size={18} />
                      </button> */}
                      <button onClick={() => deleteRoom(room._id)} className="p-2 hover:text-red-400 transition cursor-pointer">
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Mobile Cards */}
      <section className="xl:hidden px-5 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rooms.map((room) => (
            <div key={room._id} className="bg-[#18181f] border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img src={room.images[0]} alt={room.roomNumber} className="w-full h-full object-cover hover:scale-110 transition duration-500" />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium capitalize border ${room.status
                    ? "bg-green-500/10 text-green-400 border-green-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                >
                  {room.status}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">
                    Room {room.roomNumber}
                  </h3>
                  <span className="text-lg font-bold text-[#dec29a]">
                    ${room.pricePerNight}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  ID: {room._id}
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Hotel
                    </span>
                    <span className="text-white text-right">
                      {room.hotelId.name}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Room Type
                    </span>
                    <span className="text-white">
                      {room.roomType}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Capacity
                    </span>
                    <span className="text-white">
                      {room.capacity} Guests
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Price / Night
                    </span>
                    <span className="font-semibold text-[#dec29a]">
                      ${room.pricePerNight}
                    </span>
                  </div>

                  <div className="border-b border-white/5 pb-3">
                    <p className="text-gray-400 mb-2">
                      Description
                    </p>
                    <p className="text-white leading-7">
                      {room.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-3">
                      Amenities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={()=>updateRoomStatus(room._id)} className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center hover:text-[#dec29a] hover:border-[#dec29a]/30 transition cursor-pointer">
                    {room.status === true ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                  </button>
                  {/* <button className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center hover:text-blue-400 hover:border-blue-400/30 transition cursor-pointer">
                    <FiEdit2 size={18} />
                  </button> */}
                  <button onClick={()=>deleteRoom(room._id)} className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center hover:text-red-400 hover:border-red-400/30 transition cursor-pointer">
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllRooms