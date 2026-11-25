import { useState } from "react";
import { FaChartLine, FaShieldAlt, FaEnvelope, FaPhone, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance.js";
import { useContext } from "react";
import { Context } from "../../context/context.jsx";
import Loader from "../../components/loader.jsx";

const OwnerRegister = () => {

  const { navigate, setAuth } = useContext(Context);

  const [state, setState] = useState("register");

  const featureCards = [
    {
      icon: <FaChartLine />,
      title: "Analytics",
      description: "Get detailed insights into your hotel's performance and growth."
    },
    {
      icon: <FaShieldAlt />,
      title: "Security",
      description: "Rest assured with our robust security measures."
    },
    {
      icon: <FaEnvelope />,
      title: "Email Support",
      description: "We're here to help with any questions or concerns."
    },
    {
      icon: <FaPhone />,
      title: "24/7 Support",
      description: "Our dedicated support team is available round the clock."
    },
    {
      icon: <FaCheck />,
      title: "Easy Setup",
      description: "Set up your hotel effortlessly with our user-friendly interface."
    },
  ]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loader, setLoader] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "register") {
        setLoader(true);
        const response = await axiosInstance.post(`/api/v1/owner/register`, { name, email, password });
        if (response.data.success) {
          toast.success(response.data.message);
          setState("login");
        }
      } else {
        setLoader(true);
        const response = await axiosInstance.post(`/api/v1/owner/login`, { email, password });
        if (response.data.success) {
          toast.success(response.data.message);
          setAuth({
            status: 'authenticated',
            role: response.data.role
          })
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication failed");
    } finally {
      setLoader(false);
    }
  }

  if (loader) {
    return <Loader />
  }

  return (
    <div className="w-full h-screen bg-[#051424] text-[#d4e4fa] overflow-x-hidden py-5 sm:py-2 ">
      <main className="relative z-10 mx-auto px-5 md:px-16 flex flex-col lg:flex-row items-center lg:items-center gap-8">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-8">

          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e9c349]/10 border border-[#e9c349]/20 rounded-full w-fit">
              <span className="text-[#e9c349] uppercase tracking-widest text-xs font-medium">
                Partner Portal
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold max-w-xl leading-tight">
              Define the Standard of{" "}
              <span className="text-[#e9c349] italic">
                Celestial
              </span>{" "}
              Luxury.
            </h1>

            <p className="text-[#c6c6cd] text-lg max-w-lg">
              Join an elite ecosystem of global hospitality leaders. Horizon
              Sky provides the digital infrastructure to manage your premier
              properties with absolute precision and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md">
            {featureCards.slice(0, 2).map((card, index) => (
              <div
                key={index}
                className="bg-[#0f172ab3] backdrop-blur-3xl border border-[#bec6e0]/20 rounded-xl p-6 shadow-[inset_0_0_20px_rgba(233,195,73,0.05)] hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mb-3">{card.icon}</div>

                <h3 className="text-lg font-semibold mb-1">
                  {card.title}
                </h3>

                <p className="text-sm text-[#c6c6cd]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full lg:w-1/2 max-w-xl">
          <div className="relative overflow-hidden bg-[#0f172ab3] backdrop-blur-3xl border border-[#bec6e0]/20 rounded-2xl p-4 md:p-8 shadow-[inset_0_0_20px_rgba(233,195,73,0.05)]">

            <div className="absolute -top-24 -right-24 w-48 bg-[#e9c349]/5 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-2">
                Become a Partner
              </h2>

              <p className="text-[#c6c6cd] mb-5">
                Register your interest to join the exclusive Horizon Sky
                collection.
              </p>

              <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">

                {/* Name */}
                {state === "register" && <div className="flex flex-col gap-2">
                  <label className="uppercase tracking-widest text-xs text-[#c6c6cd] ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    placeholder="E.g. Julian Vane"
                    className="w-full bg-white/5 border border-[#45464d]/30 rounded-lg px-4 py-3 text-[#d4e4fa] outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349]/20 transition-all"
                  />
                </div>}


                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="uppercase tracking-widest text-xs text-[#c6c6cd] ml-1">
                    Business Email
                  </label>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c6c6cd] group-focus-within:text-[#e9c349]" />
                    <input
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      name='email'
                      placeholder="vane@horizon-partners.com"
                      className="w-full bg-white/5 border border-[#45464d]/30 rounded-lg pl-12 pr-4 py-3 text-[#d4e4fa] outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-gray-400">
                      Password
                    </label>
                    {state === "login" ? <p onClick={() => navigate('/owner-forget-password')} className="text-xs text-blue-600 hover:underline cursor-pointer">
                      Forgot password?
                    </p> : ""}
                  </div>
                  <div className="relative group">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c6c6cd] group-focus-within:text-[#e9c349]" />
                    <input
                      type="text"
                      onChange={(e) => setPassword(e.target.value)}
                      name='password'
                      placeholder="e.g AaZzertg533?@"
                      className="w-full bg-white/5 border border-[#45464d]/30 rounded-lg pl-12 pr-4 py-3 text-[#d4e4fa] outline-none focus:border-[#e9c349] focus:ring-1 focus:ring-[#e9c349]/20 transition-all"
                    />
                  </div>
                </div>

                <button type="submit" className="mt-2 w-full py-4 rounded-xl bg-[#e9c349] text-[#3c2f00] font-bold uppercase tracking-[0.2em] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(233,195,73,0.3)] active:scale-[0.98] transition-all duration-500 cursor-pointer">
                  {state === "login" ? "Login" : "Create an account"}
                </button>

                {state === "register" ?
                  <p className="text-center text-[13px] text-[#c6c6cd]/60">
                    Already have an account?{" "}
                    <span onClick={() => setState("login")} className="text-[#e9c349] hover:underline cursor-pointer">
                      Login
                    </span>
                  </p>
                  :
                  <p className="text-center text-[13px] text-[#c6c6cd]/60">
                    I don't have an account?{" "}
                    <span onClick={() => setState("register")} className="text-[#e9c349] hover:underline cursor-pointer">
                      Register
                    </span>
                  </p>
                }

              </form>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default OwnerRegister