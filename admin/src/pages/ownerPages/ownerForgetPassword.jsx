import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from "./../../utils/axiosInstance.js";
import { Context } from "./../../context/context";
import Loader from "./../../components/loader";

const OwnerForgetPassword = () => {

    const { navigate } = useContext(Context);

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loader, setLoader] = useState(false);

    const sendResetOtp = async () => {
        try {
            setLoader(true);
            const response = await axiosInstance.post('/api/v1/owner/send-reset-password-otp', {email});
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
            const response = await axiosInstance.post('/api/v1/owner/verify-reset-password-otp', { email, otp });
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
            const response = await axiosInstance.post('/api/v1/owner/reset-password', { email, otp, newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/owner-login');
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
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 sm:px-6">

            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-amber-400/10 blur-[120px]"></div>
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[120px]"></div>

            <div className="relative z-10 w-full max-w-lg">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
                        <svg
                            className="h-8 w-8 text-[#e9c349]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.7"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        Reset Your Password
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                        Follow the steps below to securely recover access to your account.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8 flex items-center px-2 sm:px-5">

                    <div className="flex shrink-0 flex-col items-center gap-2">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                            step >= 1
                                ? 'border-[#e9c349] bg-[#e9c349] text-[#3c2f00]'
                                : 'border-slate-700 bg-slate-800 text-slate-500'
                        }`}>
                            {step > 1 ? '✓' : '01'}
                        </div>
                        <span className={`text-xs font-medium ${step >= 1 ? 'text-[#e9c349]' : 'text-slate-500'}`}>
                            Email
                        </span>
                    </div>

                    <div className={`mx-3 mb-6 h-0.5 flex-1 transition-all duration-300 ${
                        step >= 2 ? 'bg-[#e9c349]' : 'bg-slate-700'
                    }`}></div>

                    <div className="flex shrink-0 flex-col items-center gap-2">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                            step >= 2
                                ? 'border-[#e9c349] bg-[#e9c349] text-[#3c2f00]'
                                : 'border-slate-700 bg-slate-800 text-slate-500'
                        }`}>
                            {step > 2 ? '✓' : '02'}
                        </div>
                        <span className={`text-xs font-medium ${step >= 2 ? 'text-[#e9c349]' : 'text-slate-500'}`}>
                            Verification
                        </span>
                    </div>

                    <div className={`mx-3 mb-6 h-0.5 flex-1 transition-all duration-300 ${
                        step >= 3 ? 'bg-[#e9c349]' : 'bg-slate-700'
                    }`}></div>

                    <div className="flex shrink-0 flex-col items-center gap-2">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300 ${
                            step >= 3
                                ? 'border-[#e9c349] bg-[#e9c349] text-[#3c2f00]'
                                : 'border-slate-700 bg-slate-800 text-slate-500'
                        }`}>
                            03
                        </div>
                        <span className={`text-xs font-medium ${step >= 3 ? 'text-[#e9c349]' : 'text-slate-500'}`}>
                            New Password
                        </span>
                    </div>

                </div>

                {/* Main Card */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl shadow-black/20 sm:p-9">

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#e9c349]"></span>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[#e9c349]">
                                        Step 01
                                    </span>
                                </div>

                                <h2 className="text-xl font-semibold text-white">
                                    Enter Your Email
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Enter the email address you used to register. We will send you a password reset OTP.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <svg
                                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>

                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value.trim())}
                                        value={email}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#e9c349] focus:ring-2 focus:ring-[#e9c349]/10"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => sendResetOtp()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9c349] px-5 py-3.5 text-base font-semibold text-[#3c2f00] transition-all duration-200 hover:bg-[#d4b03d] cursor-pointer"
                            >
                                Send Reset OTP
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </button>

                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#e9c349]"></span>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[#e9c349]">
                                        Step 02
                                    </span>
                                </div>

                                <h2 className="text-xl font-semibold text-white">
                                    Verify Your Email
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Enter the OTP sent to your registered email address to continue.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Verification OTP
                                </label>

                                <div className="relative">
                                    <svg
                                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2zm2 5h6m-6 4h.01M12 13h.01M15 13h.01M9 17h6" />
                                    </svg>

                                    <input
                                        type="text"
                                        onChange={(e) => setOtp(e.target.value.trim())}
                                        value={otp}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3.5 pl-12 pr-4 text-sm tracking-widest text-white outline-none transition-all placeholder:tracking-normal placeholder:text-slate-500 focus:border-[#e9c349] focus:ring-2 focus:ring-[#e9c349]/10"
                                        placeholder="Enter OTP"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => verifyResetOtp()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9c349] px-5 py-3.5 text-base font-semibold text-[#3c2f00] transition-all duration-200 hover:bg-[#d4b03d] cursor-pointer"
                            >
                                Verify OTP
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </button>

                        </div>
                    )}

                    {/* Step 3 */}
                    {step === 3 && (
                        <div className="flex flex-col gap-6">

                            <div>
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#e9c349]"></span>
                                    <span className="text-xs font-semibold uppercase tracking-widest text-[#e9c349]">
                                        Step 03
                                    </span>
                                </div>

                                <h2 className="text-xl font-semibold text-white">
                                    Create New Password
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    Enter your new password below to complete the password reset process.
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    New Password
                                </label>

                                <div className="relative">
                                    <svg
                                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4" />
                                    </svg>

                                    <input
                                        type="text"
                                        onChange={(e) => setNewPassword(e.target.value.trim())}
                                        value={newPassword}
                                        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-[#e9c349] focus:ring-2 focus:ring-[#e9c349]/10"
                                        placeholder="Enter new password"
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => resetPassword()}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e9c349] px-5 py-3.5 text-base font-semibold text-[#3c2f00] transition-all duration-200 hover:bg-[#d4b03d] cursor-pointer"
                            >
                                Reset Password
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7" />
                                </svg>
                            </button>

                        </div>
                    )}

                </div>

                <p className="mt-6 text-center text-xs text-slate-500">
                    Secure password recovery
                </p>

            </div>
        </div>
    )
}

export default OwnerForgetPassword
