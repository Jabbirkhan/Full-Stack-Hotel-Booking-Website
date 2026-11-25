import { useContext, useState } from "react";
import {
    FiMapPin,
    FiMail,
    FiPhone,
    FiClock,
    FiUser,
    FiSend,
    FiHeadphones,
    FiArrowRight,
    FiMessageCircle,
    FiCalendar,
    FiShield,
    FiStar,
} from "react-icons/fi";
import { Context } from "../context/context";
import axiosInstance from "../utils/axiosInstance.js";
import Loader from "../components/loader";
import { toast } from "react-toastify";

const Contact = () => {

    const { auth, navigate } = useContext(Context);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loader, setLoader] = useState(false);

    const sendContactMessage = async (e) => {
        e.preventDefault();
        try {
            if (auth.status !== 'authenticated' || auth.role !== 'user') {
                return navigate('/user-login');
            }

            setLoader(true);
            const response = await axiosInstance.post(`/api/v1/user/send-contact-message`, { name, email, subject, message });
            if (response.data.success) {
                toast.success(response.data.message);
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
        <main className="min-h-screen bg-slate-900 text-gray-300">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-slate-700/60 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
                <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-indigo-600/10 blur-3xl" />
                <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

                <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24 lg:px-12">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300">
                            <FiMessageCircle size={16} />
                            We're Here to Help
                        </span>

                        <h1 className="mt-7 max-w-xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Let's Make Your
                            <span className="mt-2 block bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                                Stay Exceptional.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-8 text-gray-400 sm:text-lg">
                            Have a question about your reservation, need help planning
                            your stay, or looking for something special? Our team is
                            always ready to make your experience memorable.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <a
                                href="#contact-form"
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:bg-indigo-500"
                            >
                                Get in Touch
                                <FiArrowRight size={18} />
                            </a>

                            <a
                                href="tel:+923001234567"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/70 px-6 py-3.5 font-semibold text-gray-200 transition hover:border-slate-500 hover:bg-slate-700"
                            >
                                <FiPhone size={17} />
                                Call Our Team
                            </a>
                        </div>

                        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-400">
                            <span className="flex items-center gap-2">
                                <FiShield className="text-emerald-400" size={17} />
                                Personalized Assistance
                            </span>
                            <span className="flex items-center gap-2">
                                <FiStar className="text-amber-400" size={17} />
                                Guest-First Service
                            </span>
                        </div>
                    </div>

                    {/* Hotel Illustration */}
                    <div className="relative mx-auto w-full max-w-lg py-5">
                        <div className="absolute inset-8 rounded-full bg-indigo-500/10 blur-3xl" />

                        <div className="relative rounded-3xl border border-slate-700 bg-slate-800/90 p-4 shadow-2xl shadow-black/20 sm:p-6">
                            <div className="relative flex h-64 flex-col justify-between overflow-hidden rounded-2xl bg-linear-to-br from-indigo-950 via-slate-800 to-slate-900 p-6 sm:h-72 sm:p-8">
                                <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border border-white/10" />
                                <div className="absolute -right-2 -top-8 h-32 w-32 rounded-full border border-white/10" />

                                <div className="relative flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-indigo-300">
                                        <FiCalendar size={25} />
                                    </div>
                                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                                        Guest Services
                                    </span>
                                </div>

                                <div className="relative">
                                    <p className="text-sm font-medium tracking-widest text-indigo-300">
                                        YOUR COMFORT, OUR PRIORITY
                                    </p>
                                    <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                                        Every Stay,
                                        <br />
                                        A Special Story.
                                    </h2>
                                    <p className="mt-3 text-sm leading-6 text-gray-400">
                                        We're here to make every detail feel effortless.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                                        <FiHeadphones size={22} />
                                    </div>
                                    <h3 className="mt-3 font-semibold text-white">
                                        Guest Support
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-gray-400">
                                        Here when you need us.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                                        <FiShield size={22} />
                                    </div>
                                    <h3 className="mt-3 font-semibold text-white">
                                        Booking Help
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-gray-400">
                                        Assistance with reservations.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-2 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-amber-400 shadow-xl sm:-right-5">
                            <FiStar size={25} />
                        </div>

                        <div className="absolute -bottom-2 -left-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-indigo-400 shadow-xl sm:-left-5">
                            <FiMessageCircle size={25} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Information and Form */}
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-20 lg:px-12">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Contact Information */}
                    <div className="lg:col-span-4">
                        <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                            Contact Information
                        </span>

                        <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            We're Just a Message Away
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-gray-400">
                            Whether you're booking your next getaway or need help with
                            an existing reservation, we'd love to hear from you.
                        </p>

                        <div className="mt-7 space-y-4">
                            {/* Address */}
                            <div className="group flex gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 transition duration-300 hover:border-indigo-500/40 hover:bg-slate-800/80">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 transition group-hover:bg-indigo-500 group-hover:text-white">
                                    <FiMapPin size={23} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">Visit Us</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-400">
                                        123 Grand Avenue, Hospitality District
                                        <br />
                                        Karachi, Pakistan - 74000
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="group flex gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 transition duration-300 hover:border-indigo-500/40 hover:bg-slate-800/80">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 transition group-hover:bg-emerald-500 group-hover:text-white">
                                    <FiMail size={23} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">Email Us</h3>
                                    <a
                                        href="mailto:reservations@example.com"
                                        className="mt-2 block break-all text-sm leading-6 text-gray-400 transition hover:text-indigo-300"
                                    >
                                        reservations@example.com
                                    </a>
                                    <a
                                        href="mailto:support@example.com"
                                        className="block break-all text-sm leading-6 text-gray-400 transition hover:text-indigo-300"
                                    >
                                        support@example.com
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="group flex gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 transition duration-300 hover:border-indigo-500/40 hover:bg-slate-800/80">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500 group-hover:text-white">
                                    <FiPhone size={23} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">Call Us</h3>
                                    <a
                                        href="tel:+923001234567"
                                        className="mt-2 block text-sm leading-6 text-gray-400 transition hover:text-indigo-300"
                                    >
                                        +92 300 123 4567
                                    </a>
                                    <p className="text-sm leading-6 text-gray-400">
                                        International: +92 21 1234 5678
                                    </p>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="group flex gap-4 rounded-2xl border border-slate-700 bg-slate-800 p-5 transition duration-300 hover:border-indigo-500/40 hover:bg-slate-800/80">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 transition group-hover:bg-amber-500 group-hover:text-white">
                                    <FiClock size={23} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-white">Working Hours</h3>
                                    <p className="mt-2 text-sm leading-6 text-gray-400">
                                        Monday - Friday: 9 AM - 8 PM
                                        <br />
                                        Saturday - Sunday: 10 AM - 6 PM
                                    </p>
                                    <p className="mt-2 text-xs text-emerald-400">
                                        Emergency guest assistance available 24/7
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div id="contact-form" className="lg:col-span-8">
                        <div className="rounded-3xl border border-slate-700 bg-slate-800 p-6 shadow-xl shadow-black/10 sm:p-8 lg:p-10">
                            <span className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                                Send an Inquiry
                            </span>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                How Can We{" "}
                                <span className="bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                                    Help You?
                                </span>
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
                                Share your questions or special requests with us. Our team
                                will be happy to assist you with your stay.
                            </p>

                            <form onSubmit={sendContactMessage} className="mt-8 space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                onChange={(e) => setName(e.target.value)} value={name}
                                                placeholder="Enter your full name"
                                                autoComplete="name"
                                                required
                                                className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3.5 pl-11 text-sm text-white outline-none transition placeholder:text-gray-500 hover:border-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                onChange={(e) => setEmail(e.target.value)} value={email}
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                required
                                                className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3.5 pl-11 text-sm text-white outline-none transition placeholder:text-gray-500 hover:border-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="+92 300 1234567"
                                            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 hover:border-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            className="mb-2 block text-sm font-medium text-gray-300"
                                        >
                                            Inquiry Type
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            defaultValue=""
                                            onChange={(e) => setSubject(e.target.value)} value={subject}
                                            required
                                            className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3.5 text-sm text-gray-300 outline-none transition hover:border-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                        >
                                            <option value="" disabled>
                                                Select an inquiry
                                            </option>
                                            <option value="reservation">Room Reservation</option>
                                            <option value="existing-booking">
                                                Existing Booking
                                            </option>
                                            <option value="cancellation">
                                                Cancellation or Refund
                                            </option>
                                            <option value="special-request">
                                                Special Request
                                            </option>
                                            <option value="other">Other Inquiry</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="bookingReference"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Booking Reference{" "}
                                        <span className="text-gray-500">(Optional)</span>
                                    </label>
                                    <input
                                        id="bookingReference"
                                        name="bookingReference"
                                        type="text"
                                        placeholder="e.g. BK-123456"
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-gray-500 hover:border-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-gray-300"
                                    >
                                        Your Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        onChange={(e) => setMessage(e.target.value)} value={message}
                                        placeholder="Tell us about your question or special requirements..."
                                        required
                                        className="w-full resize-y rounded-xl border border-slate-600 bg-slate-900 px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-gray-500 hover:border-slate-500 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:-translate-y-0.5 hover:from-indigo-500 hover:to-blue-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
                                >
                                    <FiSend
                                        size={18}
                                        className="transition-transform group-hover:translate-x-1"
                                    />
                                    Send Your Inquiry
                                </button>

                                <p className="text-center text-xs leading-5 text-gray-500">
                                    Your information will be handled responsibly and used to
                                    respond to your inquiry.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Immediate Assistance Banner */}
                <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-indigo-500/20 bg-linear-to-r from-slate-800 via-slate-800 to-indigo-950/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                    <div className="flex items-center gap-5">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400">
                            <FiHeadphones size={28} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Need Immediate Assistance?
                            </h3>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
                                For urgent booking questions or assistance during your
                                stay, contact our guest support team directly.
                            </p>
                        </div>
                    </div>

                    <a
                        href="tel:+923001234567"
                        className="inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-xl border border-indigo-400/40 bg-indigo-500/10 px-5 py-3 font-semibold text-indigo-300 transition hover:border-indigo-400 hover:bg-indigo-600 hover:text-white sm:self-center"
                    >
                        Contact Support
                        <FiArrowRight size={18} />
                    </a>
                </div>
            </section>
        </main>
    );
};

export default Contact;
