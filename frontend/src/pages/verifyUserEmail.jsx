import React from 'react'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { Context } from '../context/context.jsx';
import Loader from '../components/loader.jsx';
import axiosInstance from '../utils/axiosInstance.js';

const VerifyUserEmail = () => {

    const { auth, navigate, fetchUserProfile } = useContext(Context);
    const [otp, setOtp] = useState('');

    const [loader, setLoader] = useState(false);

    const onSubmitHandler = async () => {
        try {
            if (auth.status !== 'authenticated' || auth.role !== 'user') {
                return navigate('/login');
            }

            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/verify-email-otp', { otp });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchUserProfile();
                navigate('/');
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
        <div className='relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 px-4 py-10'>

            {/* Background Decorations */}
            <div className='absolute -top-32 -left-32 w-80 h-80 bg-green-500/10 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute -bottom-32 -right-32 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none'></div>

            {/* Verification Card */}
            <div className='relative w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 p-6 sm:p-10'>

                {/* Icon */}
                <div className='w-16 h-16 flex items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 mx-auto mb-6'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                        <path d="m16 16 2 2 4-4" />
                    </svg>
                </div>

                {/* Heading */}
                <div className='text-center mb-8'>
                    <h1 className='text-2xl sm:text-3xl font-bold text-white leading-snug'>
                        Verify Your Email
                    </h1>

                    <p className='text-sm sm:text-base text-gray-400 mt-3 leading-relaxed'>
                        Please check your email. We have sent you a verification OTP to confirm your account.
                    </p>
                </div>

                {/* OTP Input */}
                <div className='flex flex-col gap-2 mb-5'>
                    <label className='text-sm font-semibold text-gray-300'>
                        Verification OTP
                    </label>

                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.trim())}
                        className='w-full border border-slate-600 bg-slate-900 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
                        placeholder='Enter verification OTP'
                    />
                </div>

                {/* Verify Button */}
                <button
                    onClick={() => onSubmitHandler()}
                    className='w-full px-4 py-3.5 rounded-xl text-lg font-semibold bg-[#e9c349] text-[#3c2f00] hover:bg-[#d4b03d] transition-all duration-200 cursor-pointer shadow-md shadow-black/10'
                >
                    Verify Email
                </button>

                {/* Footer */}
                <div className='flex items-center justify-center gap-2 mt-6 text-xs text-gray-500'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Your account security matters</span>
                </div>

            </div>

        </div>
    )
}

export default VerifyUserEmail
