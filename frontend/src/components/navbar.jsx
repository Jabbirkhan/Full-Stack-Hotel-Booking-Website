import { FaSearch, FaBars, FaUserCircle, FaArrowLeft } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Context } from "../context/context";
import { useContext, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Loader from "./loader";

const Navbar = () => {

  const { auth, setAuth, userProfile, navigate } = useContext(Context);
  const profile = userProfile;

  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const location = useLocation();

  if (location.pathname === '/user-login' || location.pathname === '/user-forget-password' || location.pathname === '/verify-email' || location.pathname === '/terms-of-service' || location.pathname === '/privacy-policy') {
    return null;
  }

  const handleLogout = () => {
    try {
      if (auth.status !== "authenticated" || auth.role !== "user") {
        return navigate("/login");
      }
      const response = axiosInstance.post("/api/v1/user/logout", {});
      if (response.data.success) {
        toast.success(response.data.message || "Logout successful");
        setAuth({
          status: "unauthenticated",
          role: null,
        });
        navigate('/login')
      }
    } catch (error) {
      if (error.response.status !== 401) {
        toast.error(error.response?.data?.message);
      }
    }
  }

  const sendOtpForEmailVerification = async () => {
    try {
      if (auth.status !== 'authenticated' || auth.role !== 'user') {
        return navigate('/login');
      }

      setLoader(true);
      const response = await axiosInstance.get('/api/v1/user/send-verify-email-otp');
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/verify-email');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoader(false);
    }
  }

  if (loader) {
    return <Loader />
  }

  return (
    <header className="w-full fixed top-0 left-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-10">
        {/* Logo */}
        <Link to='/'>
          <h1 className="bg-[#dec29a] bg-clip-text text-2xl md:text-3xl font-bold text-transparent">
            Horizon Sky
          </h1>
        </Link>
        {/* Navigation */}
        <ul className="hidden items-center gap-10 md:flex userNavbar">
          <NavLink to="/" className="pb-1 text-gray-300 text-sm font-semibold uppercase transition hover:border-b-2">
            Home
          </NavLink>
          <NavLink to="/hotels" className="pb-1 text-gray-300 text-sm font-semibold uppercase transition hover:border-b-2">
            Hotels
          </NavLink>
          <NavLink to="/rooms" className="pb-1 text-gray-300 text-sm font-semibold uppercase transition hover:border-b-2">
            Rooms
          </NavLink>
          <NavLink to="/about" className="pb-1 text-gray-300 text-sm font-semibold uppercase transition hover:border-b-2">
            About
          </NavLink>
          <NavLink to="/contact" className="pb-1 text-gray-300 text-sm font-semibold uppercase transition hover:border-b-2">
            Contact
          </NavLink>

        </ul>
        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* <button className="hidden px-2 py-2 bg-slate-500 rounded-md lg:flex items-center">
            <input type="text" className="border-none outline-none text-gray-200" placeholder="Search..." />
            <FaSearch className="text-lg text-gray-200" />
          </button> */}

          <Link to='/my-bookings'>
            <button className="hidden md:block px-4 py-2 rounded-md bg-[#dec29a] hover:bg-[#e4af60] transition-all duration-300 cursor-pointer">
              My Bookings
            </button>
          </Link>
          <div className="relative group">
            <FaUserCircle className="text-2xl sm:text-3xl md:text-4xl  text-[#dec29a] hover:text-[#e4af60] transition-all duration-300 cursor-pointer" />
            <div className="absolute z-50 top-full right-0 mt-0 w-48 bg-slate-800 rounded-md shadow-lg hidden group-hover:block">
              <Link to="/profile" className="block px-4 py-2 text-sm text-[#dec29a] hover:bg-slate-700 hover:text-[#e4af60] transition-all duration-300 cursor-pointer">Profile</Link>
              {profile.isAccountVerified ? (
                <p className="block px-4 py-2 text-sm text-[#dec29a] hover:bg-slate-700 hover:text-[#e4af60] transition-all duration-300 cursor-pointer">
                  Verified
                </p>
              ) : (
                <p
                  onClick={sendOtpForEmailVerification}
                  className="block px-4 py-2 text-sm text-[#dec29a] hover:bg-slate-700 hover:text-[#e4af60] transition-all duration-300 cursor-pointer"
                >
                  Verify email
                </p>
              )}
              <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-[#dec29a] hover:bg-slate-700 hover:text-[#e4af60] transition-all duration-300 cursor-pointer">Logout</Link>
            </div>
          </div>

          <div onClick={() => setVisible(true)} className="md:hidden">
            <FaBars className="text-2xl sm:text-3xl text-[#dec29a] hover:text-[#e4af60] transition-all duration-300 cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Navbar for mobile screen */}
      <nav className={`fixed top-0 left-0 w-full h-screen bg-slate-900 backdrop-blur-xl z-60 transition-all duration-300 ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul className="flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>

          <div className='p-4 w-full flex justify-start items-center gap-2 border-b-2 text-white'>
            <FaArrowLeft className='text-lg cursor-pointer' onClick={() => setVisible(false)} />
            <p className='text-xl' onClick={() => setVisible(false)}>Back</p>
          </div>

          <NavLink to="/" className="pb-1 text-[#dec29a] text-sm font-semibold uppercase transition hover:border-b-2"
            onClick={() => setVisible(false)}>
            Home
          </NavLink>
          <NavLink to="/hotels" className="pb-1 text-[#dec29a] text-sm font-semibold uppercase transition hover:border-b-2"
            onClick={() => setVisible(false)}>
            Hotels
          </NavLink>
          <NavLink to="/rooms" className="pb-1 text-[#dec29a] text-sm font-semibold uppercase transition hover:border-b-2"
            onClick={() => setVisible(false)}>
            Rooms
          </NavLink>
          <NavLink to="/about" className="pb-1 text-[#dec29a] text-sm font-semibold uppercase transition hover:border-b-2"
            onClick={() => setVisible(false)}>
            About
          </NavLink>
          <NavLink to="/contact" className="pb-1 text-[#dec29a] text-sm font-semibold uppercase transition hover:border-b-2"
            onClick={() => setVisible(false)}>
            Contact
          </NavLink>
          <NavLink to="/my-bookings" className="pb-1 text-[#dec29a] text-sm font-semibold uppercase transition hover:border-b-2"
            onClick={() => setVisible(false)}>
            My Bookings
          </NavLink>

        </ul>
      </nav>

    </header>
  );
};

export default Navbar