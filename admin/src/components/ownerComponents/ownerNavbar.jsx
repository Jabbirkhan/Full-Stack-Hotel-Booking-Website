import React, { useContext, useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Context } from '../../context/context';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import { toast } from 'react-toastify';
import Loader from '../loader.jsx';

const OwnerNavbar = () => {

    const { setVisible, auth, setAuth, navigate, ownerProfile } = useContext(Context);
    const profile = ownerProfile;

    const [loader, setLoader] = useState(false);

    const location = useLocation();
    if (location.pathname === '/owner-login' || location.pathname === '/login' || location.pathname === '/owner-forget-password' || location.pathname === '/verify-email') {
        return null
    }

    const handleLogout = async () => {
        try {
            if (auth.status !== "authenticated" || auth.role !== "owner") {
                return navigate("/login");
            }
            const response = await axiosInstance.post("/api/v1/owner/logout", {});
            if (response.data.success) {
                toast.success(response.data.message || "Logout successful");
                setAuth({
                    status: "unauthenticated",
                    role: null,
                });
                navigate('/login');
            }
        } catch (error) {
            if (error.response.status !== 401) {
                toast.error(error.response?.data?.message);
            }
        }
    }

    if (loader) {
        return <Loader />
    }

    return (
        <div className='fixed top-0 left-0 right-0 bg-slate-900 px-5 sm:px-10 md:px-20 flex justify-between items-center py-1 h-14 border border-b border-white/20'>
            <div className='flex items-center gap-2'>
                <FaBars onClick={() => setVisible(true)} className='sm:hidden text-lg sm:text-xl text-[#dec29a] hover:text-[#e4af60] transition-all duration-300 cursor-pointer' />
                <h2 className='text-2xl sm:text-3xl font-bold bg-linear-to-r from-[#dec29a] to-[#e4af60] bg-clip-text text-transparent'>Horizon Sky</h2>
            </div>
            <div className='relative group'>
                <FaUserCircle className='text-2xl sm:text-3xl md:text-4xl text-[#dec29a] hover:text-[#e4af60] transition-all duration-300 cursor-pointer' />
                <div className='absolute top-full right-0 mt-0 hidden group-hover:block w-48 p-2 bg-slate-800'>
                    <p onClick={handleLogout} className='hover:bg-slate-600/70 px-4 py-2 cursor-pointer text-gray-300'>
                        {auth.status === "authenticated" ? "Logout" : "login"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OwnerNavbar
