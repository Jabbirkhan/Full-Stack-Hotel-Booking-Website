import { FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
// import { bookings, users } from "../assets/assets.js";
import {FaCalendarAlt,FaCheckCircle,FaClock,FaTimesCircle,FaEye,FaBan,FaMoneyBillWave} from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context/context.jsx";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance.js";
import Loader from "../components/loader.jsx";

const Profile = () => {

  const { userProfile, allBookings, auth, setAuth, navigate, fetchUserProfile } = useContext(Context);

  // const user = users[0];

  const [isEdit, setIsEdit] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || '');
      setEmail(userProfile.email || '');
      setPhone(userProfile.phone || '');
      setAvatar(userProfile.avatar || null);
    }
  }, [userProfile]);


  const totalBookings = allBookings.length || 0;
  const confirmedBookings = allBookings.filter(booking => booking.status === "confirmed").length || 0;
  const pendingBookings = allBookings.filter(booking => booking.status === "pending").length || 0;
  const cancelledBookings = allBookings.filter(booking => booking.status === "cancelled").length || 0;

  const [loader, setLoader] = useState(false);

  const updateProfile = async () => {
    try {
      if(auth.status !== "authenticated" || auth.role !== "user") {
        return navigate("/login");
      }
      setLoader(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      avatar && formData.append("avatar", avatar);

      const response = await axiosInstance.patch(`/api/v1/user/update-profile`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUserProfile();
        setIsEdit(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while updating the profile.");
    } finally {
      setLoader(false);
    }
  }

  const deleteAccount = async () => {
    try {
      if(auth.status !== "authenticated" || auth.role !== "user") {
        return navigate("/login");
      }
      setLoader(true);
      const response = await axiosInstance.delete(`/api/v1/user/delete-account`);
      if (response.data.success) {
        toast.success(response.data.message);
        setAuth({
          status: 'unauthenticated',
          role: null
        })
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong while deleting the account.");
    } finally {
      setLoader(false);
    }
  }

  if (loader) { 
    return <Loader />
  }

  return (
    <section className="bg-slate-900 min-h-screen pt-30 px-5 sm:px-10 md:px-20">
      <div className="max-w-7xl mx-auto">

        <div className="relative bg-[#181b22] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* User Details */}
          <div className="flex flex-col md:flex-row items-center md:items-center gap-8">

            {/* User Avatar */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#dec29a]/30">
                {avatar &&
                <img src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)} alt={userProfile.name} className="w-full h-full object-cover" />
                }
              </div>

              {isEdit && <label htmlFor="image" className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-[#dec29a] hover:bg-[#e4af60] text-black flex items-center justify-center duration-300 cursor-pointer">
                <FaCamera />
                <input type="file" id="image" onChange={(e)=>setAvatar(e.target.files[0])} hidden />
              </label>}
              {!avatar && <p className="absolute top-17 right-12 text-gray-400">No Image</p>}
            </div>
            
            {/* User Information */}
            <div className="text-center md:text-left">
              {/* User Name */}
              <div>
                {isEdit ? (
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="w-full py-2 px-3 border-none outline-none bg-slate-800 rounded-md text-sm text-gray-400 placeholder-gray-500 focus:ring-2 focus:ring-[#dec29a] duration-300"
                  />
                ) : (
                  <h1 className="text-4xl font-bold text-[#dec29a]">
                    {name}
                  </h1>
                )}
              </div>
              {/* User Email and Phone */}
              <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-4 text-gray-400">

                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaEnvelope className="text-[#dec29a]" />
                    <p className="text-sm text-gray-400">
                      {email}
                    </p>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-2">
                  {phone && <FaPhone className="text-[#dec29a]" />}
                 {isEdit ? (
                    <input
                      type="tel"
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      className="flex-1 py-2 px-3 border-none outline-none bg-slate-800 rounded-md text-sm text-gray-400 placeholder-gray-500 focus:ring-2 focus:ring-[#dec29a] duration-300"
                    />
                  ) : (
                    <p className="text-sm text-gray-400">
                      {phone}
                    </p>
                  )}
                </div>

              </div>
              {/* User Badges */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">

                { userProfile.provider && (<span className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm uppercase">
                  {userProfile.provider}
                </span>)}

              </div>

            </div>

          </div>
          
          {/* Edit Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {isEdit && (
              <button onClick={updateProfile} className="px-8 py-3 border border-[#dec29a] rounded-full text-[#dec29a] hover:bg-[#e4af60] hover:text-black duration-300 cursor-pointer">
                Save Changes
              </button>
            )}
            {isEdit && (
              <button onClick={()=>setIsEdit(false)} className="px-8 py-3 border border-[#dec29a] rounded-full text-[#dec29a] hover:bg-[#e4af60] hover:text-black duration-300 cursor-pointer">
                Cancel Editing
              </button>
            )}
            {!isEdit && (
              <button onClick={() => setIsEdit(true)} className="px-8 py-3 border border-[#dec29a] rounded-full text-[#dec29a] hover:bg-[#e4af60] hover:text-black duration-300 cursor-pointer">
              Edit Profile
              </button>
            )}
          </div>

          <button onClick={deleteAccount} className="absolute top-2 right-2 px-4 py-2 bg-red-100/20 text-white hover:text-red-800 rounded-md hover:bg-red-200 transition-all duration-300 cursor-pointer">
            Delete Account
          </button>

        </div>

        {/* Booking Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 my-10">

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
                Confirmed
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
                Cancelled
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

      </div>
    </section>
  );
};

export default Profile;