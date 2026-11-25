import React, { useState, useContext } from "react";
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock, FaPhone, FaArrowRight, FaStar, FaConciergeBell } from "react-icons/fa";
import { toast } from "react-toastify";
import { Context } from "../context/context";
import axiosInstance from "../utils/axiosInstance.js";
import Loader from "./../components/loader";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Login = () => {

  const { backendUrl, navigate, setAuth } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [state, setState] = useState("Register");

  const [loading, setLoading] = useState(false);

  const googleAuth = () => {
    window.location.href = `${backendUrl}/api/v1/user/google`;
  }

  const githubAuth = () => {
    window.location.href = `${backendUrl}/api/v1/user/github`;
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        setLoading(true);
        const response = await axiosInstance.post(`/api/v1/user/login`, { email, password });
        if (response.data.success) {
          setAuth({
            status: "authenticated",
            role: response.data.role
          });
          toast.success(response.data.message || "Login successful");
          navigate('/');
        }
      } else {
        if (!privacyChecked) {
          toast.error("Please agree to the Privacy Policy and Terms of Service");
          return;
        }
        setLoading(true);
        const response = await axiosInstance.post(`/api/v1/user/register`, { name, email, password });
        if (response.data.success) {
          toast.success(response.data.message || "Registration successful");
          setState("Login");
        }
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />

  return (

    <div className="h-screen bg-[#051424] flex items-center justify-center p-2 overflow-hidden relative">
      <main className="relative z-10 w-full h-full grid md:grid-cols-2 overflow-hidden rounded-xl border border-[#bec6e0]/10 bg-[#0f172ab3] backdrop-blur-2xl shadow-2xl">

        {/* Left Side */}
        <div className="hidden w-full h-screen md:flex flex-col justify-between p-10 border-r border-[#45464d]/10 relative overflow-hidden">

          <div className="absolute inset-0 opacity-40">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${assets.userRegister})`, }}
            />
          </div>

          <div className="relative z-20">
            <h1 className="text-[#e9c349] text-2xl font-bold uppercase tracking-[0.15em]">
              Horizon Sky
            </h1>

            <p className="text-[#c6c6cd] mt-4 text-lg max-w-sm">
              Ascend to a new standard of global travel and exclusive
              experiences.
            </p>
          </div>

          <div className="relative z-20 space-y-6">
            <div className="flex items-start gap-4">
              <FaStar className="text-[#e9c349] mt-1" />

              <div>
                <h3 className="text-[#e9c349] uppercase text-sm font-semibold tracking-wider">
                  Elite Membership
                </h3>

                <p className="text-[#c6c6cd]/80 text-sm">
                  Priority reservations at the world's most exclusive
                  destinations.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaConciergeBell className="text-[#e9c349] mt-1" />

              <div>
                <h3 className="text-[#e9c349] uppercase text-sm font-semibold tracking-wider">
                  Global Concierge
                </h3>

                <p className="text-[#c6c6cd]/80 text-sm">
                  Personalized attention for every step of your journey, 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full h-screen p-4 md:p-12 flex flex-col justify-center">

          <div className="mb-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#d4e4fa] mb-2 tracking-tight">
              {state === "Register" ? "Create Your Account" : "Welcome Back"}
            </h2>

            {state === "Register" && (<p className="text-[#c6c6cd]">
              Begin your journey with the world's premier luxury travel network.
            </p>)}
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-3">

            {/* Full Name */}
            {state === "Register" && (<div>
              <label className="block mb-2 text-xs uppercase tracking-[0.15em] text-[#c6c6cd]">
                Full Name
              </label>

              <div className="relative border border-[#45464d]/30 bg-white/5 rounded overflow-hidden focus-within:border-[#e9c349] focus-within:shadow-[0_0_15px_rgba(233,195,73,0.15)] transition-all">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c6c6cd]" />

                <input
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alexander Sterling"
                  className="w-full bg-transparent py-2 pl-12 pr-4 outline-none text-[#d4e4fa] placeholder:text-[#c6c6cd]/30"
                />
              </div>
            </div>)}

            {/* Email */}
            <div>
              <label className="block mb-2 text-xs uppercase tracking-[0.15em] text-[#c6c6cd]">
                Email Address
              </label>

              <div className="relative border border-[#45464d]/30 bg-white/5 rounded overflow-hidden focus-within:border-[#e9c349] focus-within:shadow-[0_0_15px_rgba(233,195,73,0.15)] transition-all">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c6c6cd]" />

                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@horizonsky.com"
                  className="w-full bg-transparent py-2 pl-12 pr-4 outline-none text-[#d4e4fa] placeholder:text-[#c6c6cd]/30"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                {state === "Login" ? <p onClick={() => navigate('/user-forget-password')} className="text-xs text-blue-600 hover:underline cursor-pointer">
                  Forgot password?
                </p> : ""}
              </div>

              <div className="relative border border-[#45464d]/30 bg-white/5 rounded overflow-hidden focus-within:border-[#e9c349] focus-within:shadow-[0_0_15px_rgba(233,195,73,0.15)] transition-all">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c6c6cd]" />

                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent py-2 pl-12 pr-4 outline-none text-[#d4e4fa] placeholder:text-[#c6c6cd]/30"
                />
              </div>
            </div>

            {/* Terms */}
            {state === 'Register' && <div>
              <input
                type="checkbox"
                id="privacy-terms"
                checked={privacyChecked}
                onChange={(e) => setPrivacyChecked(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="privacy-terms" className="text-sm text-gray-600">
                I agree to the
                <Link to='/privacy-policy' className="text-blue-600 px-1 hover:underline">
                  Privacy Policy
                </Link>
                and
                <Link to='/terms-of-service' className="text-blue-600 px-1 hover:underline">
                  Terms of Service
                </Link>
              </label>
            </div>}

            {/* Buttons */}
            <div className="pt-4 space-y-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded bg-[#e9c349] text-[#3c2f00] uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#e9c349]/10 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>{state === "Register" ? "Create an account" : "Login"}</span>
                <FaArrowRight />
              </button>

              <div className="flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-[#45464d]/20" />
                <span className="text-xs uppercase text-[#c6c6cd]/50">
                  OR
                </span>
                <div className="h-px flex-1 bg-[#45464d]/20" />
              </div>

              <button
                type="button"
                onClick={googleAuth}
                className="w-full py-3 px-6 rounded border border-[#45464d]/50 text-[#d4e4fa] flex items-center justify-center gap-3 hover:bg-white/5 active:scale-[0.98] transition-all cursor-pointer"
              >
                <FaGoogle className="w-4 h-4" />

                <span>{state === "Register" ? "Register with Google" : "Login with Google"}</span>
              </button>
            </div>

            {state === "Register" ?
              <p onClick={() => setState("Login")} className="text-center text-[#c6c6cd] mt-2">
                Already have an account?{" "}
                <span className="text-[#e9c349] font-semibold hover:brightness-110 cursor-pointer">
                  Sign In
                </span>
              </p>
              :
              <p onClick={() => setState("Register")} className="text-center text-[#c6c6cd] mt-2">
                I didn't have an account?{" "}
                <span className="text-[#e9c349] font-semibold hover:brightness-110 cursor-pointer">
                  Register
                </span>
              </p>}
          </form>
        </div>
      </main>
    </div>

  )
}

export default Login
