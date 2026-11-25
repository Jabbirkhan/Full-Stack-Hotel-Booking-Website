import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../context/context';
import Loader from '../components/loader';
import axiosInstance from '../utils/axiosInstance.js';

const UserForgetPassword = () => {

    const { navigate } = useContext(Context);

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loader, setLoader] = useState(false);

    const sendResetOtp = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/send-reset-password-otp', { email });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(2);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const verifyResetOtp = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/verify-reset-password-otp', { email, otp });
            if (response.data.success) {
                toast.success(response.data.message);
                setStep(3);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoader(false);
        }
    }

    const resetPassword = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/user/reset-password', { email, otp, newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/user-login');
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
            <div className='absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none'></div>

            <div className='relative w-full max-w-5xl mx-auto'>

                {/* Header */}
                <div className='text-center mb-10'>
                    <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 mb-4'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <path d="m3 7 9 6 9-6" />
                        </svg>
                    </div>

                    <h1 className='text-2xl sm:text-3xl font-bold text-white'>
                        Reset Your Password
                    </h1>

                    <p className='text-sm sm:text-base text-gray-400 mt-2'>
                        Follow the steps below to recover your account.
                    </p>
                </div>

                {/* Main Card */}
                <div className='max-w-2xl mx-auto bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 p-5 sm:p-10'>

                    {/* Progress Steps */}
                    <div className='flex items-center justify-between gap-3 sm:gap-5 mb-10 max-w-md mx-auto'>

                        <div className='flex flex-col items-center gap-2 shrink-0'>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${step >= 1 ? 'bg-green-500 text-slate-950 shadow-lg shadow-green-500/20' : 'bg-slate-700 text-gray-400'}`}>
                                01
                            </div>
                            <span className={`text-xs sm:text-sm font-medium ${step >= 1 ? 'text-green-400' : 'text-gray-500'}`}>
                                Email
                            </span>
                        </div>

                        <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-green-500' : 'bg-slate-600'}`}></div>

                        <div className='flex flex-col items-center gap-2 shrink-0'>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${step >= 2 ? 'bg-green-500 text-slate-950 shadow-lg shadow-green-500/20' : 'bg-slate-700 text-gray-400'}`}>
                                02
                            </div>
                            <span className={`text-xs sm:text-sm font-medium ${step >= 2 ? 'text-green-400' : 'text-gray-500'}`}>
                                Verification
                            </span>
                        </div>

                        <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${step >= 3 ? 'bg-green-500' : 'bg-slate-600'}`}></div>

                        <div className='flex flex-col items-center gap-2 shrink-0'>
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${step >= 3 ? 'bg-green-500 text-slate-950 shadow-lg shadow-green-500/20' : 'bg-slate-700 text-gray-400'}`}>
                                03
                            </div>
                            <span className={`text-xs sm:text-sm font-medium ${step >= 3 ? 'text-green-400' : 'text-gray-500'}`}>
                                New Password
                            </span>
                        </div>

                    </div>

                    {/* Form Content */}
                    <div className='max-w-md mx-auto'>

                        {/* Step 1: Send Email */}
                        {step === 1 && (
                            <div className='flex flex-col gap-5'>

                                <div className='text-center mb-2'>
                                    <div className='w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="5" width="18" height="14" rx="2" />
                                            <path d="m3 7 9 6 9-6" />
                                        </svg>
                                    </div>

                                    <h2 className='text-xl font-semibold text-white'>
                                        Enter Your Email
                                    </h2>

                                    <p className='text-sm text-gray-400 mt-2 leading-relaxed'>
                                        Enter the email address you used to register your account.
                                    </p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-300'>
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                        value={email}
                                        className='w-full border border-slate-600 bg-slate-900 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
                                        placeholder='Enter your email'
                                    />
                                </div>

                                <button
                                    onClick={() => sendResetOtp()}
                                    className='w-full px-4 py-3 rounded-xl text-base sm:text-lg font-semibold bg-[#e9c349] text-[#3c2f00] hover:bg-[#d4b03d] transition-all duration-200 cursor-pointer shadow-md shadow-black/10'
                                >
                                    Send Email
                                </button>

                            </div>
                        )}

                        {/* Step 2: Verify OTP */}
                        {step === 2 && (
                            <div className='flex flex-col gap-5'>

                                <div className='text-center mb-2'>
                                    <div className='w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="11" width="18" height="11" rx="2" />
                                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            <path d="M12 15v3" />
                                        </svg>
                                    </div>

                                    <h2 className='text-xl font-semibold text-white'>
                                        Verify Your Email
                                    </h2>

                                    <p className='text-sm text-gray-400 mt-2 leading-relaxed'>
                                        Enter the verification OTP sent to your registered email address.
                                    </p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-300'>
                                        Verification OTP
                                    </label>

                                    <input
                                        type="text"
                                        onChange={(e) => setOtp(e.target.value.trim())}
                                        value={otp}
                                        className='w-full border border-slate-600 bg-slate-900 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
                                        placeholder='Enter OTP'
                                    />
                                </div>

                                <button
                                    onClick={() => verifyResetOtp()}
                                    className='w-full px-4 py-3 rounded-xl text-base sm:text-lg font-semibold bg-[#e9c349] text-[#3c2f00] hover:bg-[#d4b03d] transition-all duration-200 cursor-pointer shadow-md shadow-black/10'
                                >
                                    Next
                                </button>

                            </div>
                        )}

                        {/* Step 3: Reset Password */}
                        {step === 3 && (
                            <div className='flex flex-col gap-5'>

                                <div className='text-center mb-2'>
                                    <div className='w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center justify-center mx-auto mb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
                                            <path d="m9 12 2 2 4-4" />
                                        </svg>
                                    </div>

                                    <h2 className='text-xl font-semibold text-white'>
                                        Create New Password
                                    </h2>

                                    <p className='text-sm text-gray-400 mt-2 leading-relaxed'>
                                        Enter your new password to regain access to your account.
                                    </p>
                                </div>

                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-semibold text-gray-300'>
                                        New Password
                                    </label>

                                    <input
                                        type="text"
                                        onChange={(e) => setNewPassword(e.target.value.trim())}
                                        value={newPassword}
                                        className='w-full border border-slate-600 bg-slate-900 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10'
                                        placeholder='Enter new password'
                                    />
                                </div>

                                <button
                                    onClick={() => resetPassword()}
                                    className='w-full px-4 py-3 rounded-xl text-base sm:text-lg font-semibold bg-[#e9c349] text-[#3c2f00] hover:bg-[#d4b03d] transition-all duration-200 cursor-pointer shadow-md shadow-black/10'
                                >
                                    Continue
                                </button>

                            </div>
                        )}

                    </div>

                </div>

                <p className='text-center text-xs text-gray-500 mt-6'>
                    User Account Security
                </p>

            </div>

        </div>
    )
}

export default UserForgetPassword
