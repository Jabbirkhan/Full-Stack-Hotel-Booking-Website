import React from 'react'
import { FaExpandArrowsAlt, FaFreebsd, FaMonero, FaUserFriends } from 'react-icons/fa'
// import { rooms } from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState, useMemo } from 'react'
import { Context } from '../context/context.jsx'
import { debounce } from 'lodash'
import Pagination from '../components/pagination.jsx'
import axiosInstance from '../utils/axiosInstance.js'
import { toast } from 'react-toastify'
import Loader from '../components/loader.jsx'

const Rooms = () => {

  const { auth } = useContext(Context);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [totalRooms, setTotalRooms] = useState();

  const [roomType, setRoomType] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('');
  const [roomPrice, setRoomPrice] = useState();

  const [roomCapacityInput, setRoomCapacityInput] = useState('');
  const [roomPriceInput, setRoomPriceInput] = useState(0);

  const roomCapacityDebounce = useMemo(
    () =>
      debounce((value) => {
        setRoomCapacity(value);
        setPage(1);
      }, 500),
    []
  )

  const roomPriceDebounce = useMemo(
    () =>
      debounce((value) => {
        setRoomPrice(value);
        setPage(1);
      }, 1000),
    []
  )

  // const applyFilters = () => {
  //   let filteredRooms = rooms;

  //   if (roomType !== '') {
  //     filteredRooms = filteredRooms.filter((room) => room.roomType.toLowerCase().includes(roomType.toLowerCase()));
  //   }
  //   if (roomCapacity !== '') {
  //     filteredRooms = filteredRooms.filter((room) => room.capacity <= roomCapacity);
  //   }
  //   if (roomPrice !== null && roomPrice !== '') {
  //     filteredRooms = filteredRooms.filter((room) => room.pricePerNight <= roomPrice);
  //   }
  //   setFilteredRooms(filteredRooms);
  // }

  // useEffect(() => {
  //   applyFilters();
  // }, [roomType, roomCapacity, roomPrice, rooms]);

  useEffect(() => {
    return () => {
      roomCapacityDebounce.cancel();
      roomPriceDebounce.cancel();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const [loader, setLoader] = useState(false);

  const fetchAllRooms = async (page) => {
    try {
      setLoader(true);

      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 9);

      if (roomType) {
        params.append('roomType', roomType);
      }
      if (roomCapacity) {
        params.append('roomCapacity', roomCapacity);
      }
      if (roomPrice) {
        params.append('roomPrice', roomPrice);
      }

      const response = await axiosInstance.get(`/api/v1/user/all-rooms?${params.toString()}`);
      if (response.data.success) {
        setRooms(response.data.rooms);
        setTotalRooms(response.data.totalRooms);
        setTotalPages(response.data.totalPages);
        setPage(response.data.currentPage);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    if (auth.status === 'authenticated' && auth.role === 'user') {
      fetchAllRooms(page);
    }
  }, [auth, page, roomType, roomCapacity, roomPrice]);

  if (rooms.length === 0) {
    return <Loader />
    // return (
    //   <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
    //     <h2 className="text-3xl font-bold text-white text-center mt-10">
    //       No Rooms Found
    //     </h2>
    //     <p onClick={()=>window.location.reload()} className='text-blue-500 hover:text-underline my-2 cursor-pointer transition-all duration-200' >Refresh</p>
    //   </main>
    // )
  }

  if(loader){
    return <Loader />
  }

  return (
    <main className='bg-slate-900'>
      <div className='py-20 mx-5 sm:mx-10 md:mx-20'>

        <div className='bg-slate-800 my-5 p-5 rounded-lg flex flex-wrap justify-between items-center gap-5 border border-white/30'>

          <div className='flex flex-1 flex-col gap-1'>
            <span className='text-gray-300'>Room Type</span>
            <select value={roomType}
              onChange={(e) => {
              setRoomType(e.target.value);
            }} className='px-5 py-3 bg-slate-900 rounded-md border-none text-gray-300'>
              <option value="">Select Room Type</option>
              <option value="Standard">Standard</option>
              <option value="Suite">Suite</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Executive">Executive</option>
            </select>
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <label htmlFor="capacity" className='text-gray-300'>Capacity</label>
            <div className='flex items-center justify-between bg-slate-900 text-gray-400 px-3 pr-2 rounded-md outline-none'>
              <input type="number"
                value={roomCapacityInput}
                onChange={(e) => {
                  roomCapacityDebounce(e.target.value === "" ? "" : Number(e.target.value));
                  setRoomCapacityInput(e.target.value);
                }} className='py-3 border-none outline-none' placeholder='Enter capacity...' />
              <FaFreebsd className='text-2xl' />
            </div>
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <label htmlFor="price" className='text-gray-300'>Price Range</label>
            <div className='flex items-center justify-between bg-slate-900 text-gray-400 px-3 pr-2 rounded-md outline-none'>
              <input type="number"
                value={roomPriceInput}
                min={0}
                onChange={(e) => {
                  roomPriceDebounce(e.target.value === "" ? "" : Number(e.target.value));
                  setRoomPriceInput(e.target.value);
                }} className='py-3 border-none outline-none' placeholder='Enter price...' />
              <FaMonero className='text-2xl' />
            </div>
          </div>

        </div>

        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dec29a]">
              Celestial Accommodations
            </span>
            <h2 className="mt-2 text-4xl font-bold text-[#dec29a] lg:text-5xl">
              All Rooms
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">

          {rooms.filter((room) => room.status === true).map((room) => (
            <div key={room._id} className="group flex flex-col gap-6 overflow-hidden rounded-md shadow-md shadow-[#e4af60] bg-slate-900 p-5 transition duration-300 hover:-translate-y-1 hover:bg-slate-800">

              <div className="overflow-hidden rounded-md shrink-0">
                <img src={room.images[0]} alt={room.roomType} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">

                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {room.roomType} Room
                      </h3>
                      <p className="mt-1 text-gray-400">
                        {room.hotelId.name}
                      </p>
                    </div>

                    <div className="flex items-center text-right">
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

        <div className="mt-10 flex justify-center gap-3">
          <Pagination
            totalPages={totalPages}
            page={page}
            setPage={setPage}
          />
        </div>

      </div>
    </main>
  )
}

export default Rooms
