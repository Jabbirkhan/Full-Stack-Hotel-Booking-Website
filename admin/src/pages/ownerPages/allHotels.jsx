import { useContext, useState } from "react";
// import { hotels } from "../../assets/assets.js"; 
import { FiSearch, FiFilter, FiEye, FiEdit2, FiTrash2, FiEyeOff } from "react-icons/fi";
import { Context } from "../../context/context.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import Loader from "../../components/loader.jsx";
import { Link } from "react-router-dom";

const AllHotels = () => {

  const { ownerAllHotels, setOwnerAllHotels, auth, navigate, fetchOwnerHotels } = useContext(Context);
  const hotels = ownerAllHotels.slice();

  const [loader, setLoader] = useState(false);

  const deleteHotel = async (id) => {
    try {
      if(auth.status !== 'authenticated' || auth.role !== 'owner'){
        return navigate('/owner-login');
      }
      setLoader(true);
      const response = await axiosInstance.delete(`/api/v1/owner/delete-hotel/${id}`);
      if(response.data.success){
        toast.success(response.data.message);
        setOwnerAllHotels((prev) => prev.filter((h)=>h._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }
  
  const updateHotelStatus = async (id) => {
    try {
      if(auth.status !== 'authenticated' || auth.role !== 'owner'){
        return navigate('/owner-login');
      }
      setLoader(true);
      const response = await axiosInstance.patch(`/api/v1/owner/update-hotel-status/${id}`);
      if(response.data.success){
        toast.success(response.data.message);
        fetchOwnerHotels();
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  if(loader){
    return <Loader />
  }

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  if(hotels.length === 0){
    return (
      <main className="min-h-screen w-full flex flex-1 flex-col justify-center items-center p-3 py-5 bg-slate-900">
        <h2 className="text-3xl font-bold text-white text-center mt-10">
          No Hotels Found
        </h2>
        <Link to='/' onClick={scrollToTop}>
          <button className='px-5 py-2 rounded-md bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-200 mt-2 cursor-pointer'>Add Hotel</button>
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full flex flex-1 flex-col p-3 py-5 bg-slate-900">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 px-6 lg:px-10 py-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Managed Hotels
          </h2>

          <p className="text-gray-400 mt-2 max-w-3xl leading-7">
            Oversee your celestial portfolio. Monitor status,
            adjust inventory, and manage property configurations
            from a centralized command center.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

            <input
              type="text"
              placeholder="Search hotels..."
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
                <th className="px-6 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Hotel Image
                </th>

                <th className="px-6 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Name
                </th>

                <th className="px-6 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  City
                </th>

                <th className="px-6 py-5 text-left text-sm uppercase tracking-wider text-[#dec29a]">
                  Country
                </th>

                <th className="px-6 py-5 text-center text-sm uppercase tracking-wider text-[#dec29a]">
                  Status
                </th>

                <th className="px-6 py-5 text-right text-sm uppercase tracking-wider text-[#dec29a]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {hotels.map((hotel) => (
                <tr
                  key={hotel._id}
                  className="group border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-white/10">
                      <img
                        src={hotel.images[0]}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <h4 className="font-semibold text-white">
                      {hotel.name}
                    </h4>

                    <p className="text-sm text-gray-400">
                      ID: {hotel._id}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {hotel.city}
                  </td>

                  <td className="px-6 py-4 text-gray-300">
                    {hotel.country}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs border capitalize ${hotel.status
                            ? "bg-green-300 border-green-600 text-green-800"
                            : "bg-red-300 border-red-600 text-red-800"
                          }`}
                      >
                        {hotel.status ? "active" : "inactive"}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={()=>updateHotelStatus(hotel._id)} className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center hover:text-[#dec29a] hover:border-[#dec29a]/30 transition cursor-pointer">
                        {hotel .status === true ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                      </button>
                    
                      <button onClick={()=>deleteHotel(hotel._id)} className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center hover:text-red-400 hover:border-red-400/30 transition cursor-pointer">
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
        <div className="space-y-5 grid grid-cols-1 md:grid-cols-2 gap-2">
          {hotels.map((hotel) => (
            <div key={hotel._id} className="bg-[#18181f] border border-white/10 rounded-2xl overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img src={hotel.images[0]} alt={hotel.name} className="w-full h-full object-cover hover:scale-110 transition duration-500"/>
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium capitalize border ${hotel.status
                      ? "bg-green-300 border-green-600 text-green-800"
                      : "bg-red-300 border-red-600 text-red-800"
                    }`}
                >
                  {hotel.status ? "active" : "inactive"}
                </span>
              </div>

              <div className="p-5">

                <h3 className="text-xl font-semibold text-white">
                  {hotel.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  ID: {hotel._id}
                </p>

                <div className="mt-5 space-y-3">

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      City
                    </span>

                    <span className="text-white">
                      {hotel.city}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Country
                    </span>
                    <span className="text-white">
                      {hotel.country}
                    </span>
                  </div>

                  <div className="flex flex-wrap flex-row justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Email
                    </span>
                    <span className="text-white text-right">
                      {hotel.email}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-white/5 pb-3">
                    <span className="text-gray-400">
                      Phone
                    </span>
                    <span className="text-white">
                      {hotel.phone}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">
                      Address
                    </span>
                    <span className="text-white text-right">
                      {hotel.address}
                    </span>
                  </div>

                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={()=>updateHotelStatus(hotel._id)} className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center hover:text-[#dec29a] hover:border-[#dec29a]/30 transition cursor-pointer">
                    {hotel .status === true ? <FiEye size={18} /> : <FiEyeOff size={18} />}
                  </button>
                
                  <button onClick={()=>deleteHotel(hotel._id)} className="w-11 h-11 rounded-lg border border-white/10 flex items-center justify-center hover:text-red-400 hover:border-red-400/30 transition cursor-pointer">
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

export default AllHotels