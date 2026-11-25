import { hotels } from '../assets/assets.js'
import { FaArrowRight, FaStar, FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useContext, useState, useMemo } from 'react';
import { Context } from '../context/context.jsx';
import { debounce, set } from 'lodash';
import Pagination from '../components/pagination.jsx';
import { useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import Loader from '../components/loader.jsx';

const Hotels = () => {

  const { auth } = useContext(Context);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);

  const [hotelName, setHotelName] = useState('');
  const [hotelLocation, setHotelLocation] = useState('');
  const [amenity, setAmenity] = useState('');

  const [hotelNameInput, setHotelNameInput] = useState('');
  const [hotelLocationInput, setHotelLocationInput] = useState('');

  const hotelNameDebounce = useMemo(
    () =>
      debounce((value) => {
        setHotelName(value);
        setPage(1);
      }, 500),
    []
  )

  const hotelLocationDebounce = useMemo(
    () =>
      debounce((value) => {
        setHotelLocation(value);
        setPage(1);
      }, 500),
    []
  )

  // const applyFilters = () => {
  //   let filteredHotels = hotelname || hotelLocation || amenity ? [...allHotels] : [...hotels];

  //   if (hotelname) {
  //     filteredHotels = filteredHotels.filter((hotel) => hotel.name.toLowerCase().includes(hotelname.toLowerCase()));
  //   }
  //   if (hotelLocation) {
  //     filteredHotels = filteredHotels.filter((hotel) => hotel.city.toLowerCase().includes(hotelLocation.toLowerCase()));
  //   }
  //   if (amenity) {
  //     filteredHotels = filteredHotels.filter((hotel) => hotel.amenities.includes(amenity));
  //   }
  //   setFilteredHotels(filteredHotels);
  // }

  // useEffect(() => {
  //   applyFilters();
  // }, [hotelname, hotelLocation, amenity, allHotels]);

  useEffect(() => {
    return () => {
      hotelNameDebounce.cancel();
      hotelLocationDebounce.cancel();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const [loader, setLoader] = useState(false);

  const fetchAllHotels = async (page) => {
    try {
      setLoader(true);

      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', 9);

      if (hotelName) {
        params.append('hotelName', hotelName);
      }
      if (hotelLocation) {
        params.append('hotelLocation', hotelLocation);
      }
      if (amenity) {
        params.append('amenity', amenity);
      }

      const response = await axiosInstance.get(`/api/v1/user/all-hotels?${params.toString()}`);
      if (response.data.success) {
        setHotels(response.data.hotels);
        setTotalHotels(response.data.totalHotels);
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
      fetchAllHotels(page);
    }
  }, [auth, page, hotelName, hotelLocation, amenity]);

  if (hotels.length === 0) {
    return <Loader />
    // return (
    //   <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
    //     <h2 className="text-3xl font-bold text-white text-center mt-10">
    //       No Hotels Found
    //     </h2>
    //     <p onClick={()=>window.location.reload()} className='text-blue-500 hover:text-underline my-2 cursor-pointer transition-all duration-200' >Refresh</p>
    //   </main>
    // )
  }

  if (loader) {
    return <Loader />
  }

  return (
    <main className='bg-slate-900'>
      <div className='py-20 mx-5 sm:mx-10 md:mx-20'>

        <div className='bg-slate-800 my-5 p-5 rounded-lg flex flex-wrap justify-between items-center gap-5 border border-white/30'>

          <div className='flex flex-1 flex-col gap-1'>
            <label htmlFor="name" className='text-gray-300'>Hotel Name</label>
            <div className='flex items-center gap-2 bg-slate-900 text-gray-400 px-3 pr-2 rounded-md outline-none'>
              <FaBed className='text-2xl' />
              <input type="text"
                value={hotelNameInput}
                onChange={(e) => {
                hotelNameDebounce(e.target.value);
                setHotelNameInput(e.target.value);
              }} className='py-3 border-none outline-none' placeholder='Search Hotels...' />
            </div>
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <label htmlFor="location" className='text-gray-300'>Location</label>
            <div className='flex items-center gap-2 bg-slate-900 text-gray-400 px-3 pr-2 rounded-md outline-none'>
              <FaBed className='text-2xl' />
              <input type="text"
                value={hotelLocationInput}
                onChange={(e) => {
                  hotelLocationDebounce(e.target.value);
                  setHotelLocationInput(e.target.value);
                }} className='py-3 border-none outline-none' placeholder='Search Location...' />
            </div>
          </div>

          <div className='flex flex-1 flex-col gap-1'>
            <span className='text-gray-300'>Amenities</span>
            <select value={amenity} onChange={(e) => setAmenity(e.target.value)} className='px-5 py-3 bg-slate-900 rounded-md border-none text-gray-300'>
              <option value="">Select Amenity</option>
              <option value="AC">AC</option>
              <option value="TV">TV</option>
              <option value="WiFi">WiFi</option>
              <option value="Gym">Gym</option>
              <option value="Parking">Parking</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Swimming Pool">Swimming Pool</option>
            </select>
          </div>

        </div>

        <section className="py-5">

          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dec29a]">
                Destinations
              </span>
              <h2 className="mt-2 text-4xl font-bold text-[#dec29a] lg:text-5xl">
                All Hotels
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.filter((hotel) => hotel.status === true).map((hotel) => (
              <div key={hotel._id} className="group overflow-hidden rounded-lg shadow-md shadow-[#e4af60] bg-slate-900 transition duration-500 hover:-translate-y-2">
                <div className="overflow-hidden bg-linear-to-rb bg-slate-800 via-slate-700 from-slate-800 rounded-tr-lg rounded-tl-lg">
                  <img src={hotel.images[0]} alt={hotel.name} className="h-60 w-full object-contain transition duration-700 group-hover:scale-110" />
                </div>

                <div className="space-y-3 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {hotel.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2 text-gray-400">
                        <FaMapMarkerAlt className="text-xs text-amber-300" />
                        <span>
                          {hotel.city}, {hotel.country}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1">
                      <FaStar className="text-sm text-[#e4af60]" />
                      <span className="font-semibold text-[#e4af60]">
                        4.9
                      </span>
                    </div>
                  </div>

                  <p className="line-clamp-1 text-gray-400">
                    {hotel.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.slice(0, 3).map((amenity) => (
                      <span key={amenity} className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase text-gray-300">
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <Link to={`/hotel-detail/${hotel._id}`} onClick={scrollToTop}>
                    <button className="mt-3 w-full rounded-xl border border-[#dec29a] py-3 font-semibold text-[#dec29a] transition hover:bg-[#e4af60] cursor-pointer hover:text-slate-900">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </section>

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

export default Hotels
