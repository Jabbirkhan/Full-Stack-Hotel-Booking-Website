import {FaCheckCircle,FaUserShield} from "react-icons/fa";
import { assets } from "../assets/assets.js";

const Experience = () => {
    return (
        <section className="grid gap-16 py-20 lg:grid-cols-2 lg:items-center mx-5 sm:mx-10 md:mx-20">

            <div className="relative">
                <div className="overflow-hidden rounded-[40px] border border-white/10 bg-slate-900 p-4">
                    <img src={assets.experienceImage} alt="Luxury Concierge" className="aspect-square w-full rounded-[30px] object-cover"/>
                </div>

                <div className="absolute -bottom-8 -right-8 hidden rounded-3xl border border-amber-300/20 bg-slate-900/90 p-8 backdrop-blur-xl md:block">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-300/10">
                            <FaUserShield className="text-4xl text-[#dec29a]" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold text-white">
                                100% Elite
                            </h3>
                            <p className="text-gray-400">
                                Personalized Concierge
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dec29a]">
                    The Experience
                </span>

                <h2 className="mt-3 text-4xl font-bold leading-tight text-white lg:text-5xl">
                    Curated Moments In Every Orbit
                </h2>

                <p className="mt-6 text-lg leading-8 text-gray-400">
                    We don't just provide rooms; we craft unforgettable luxury
                    journeys. From private airport transfers to world-class
                    dining experiences, every detail is carefully designed to
                    make your stay exceptional.
                </p>

                <div className="mt-8 space-y-5">

                    <div className="flex items-center gap-4">
                        <FaCheckCircle className="text-xl text-[#dec29a]" />
                        <span className="text-lg text-white">
                            24/7 Personal Concierge Service
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaCheckCircle className="text-xl text-[#dec29a]" />
                        <span className="text-lg text-white">
                            Seamless Digital Check-In
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <FaCheckCircle className="text-xl text-[#dec29a]" />
                        <span className="text-lg text-white">
                            Exclusive Premium Experiences
                        </span>
                    </div>

                </div>

                <button className="mt-10 rounded-xl bg-[#dec29a] px-8 py-3 font-semibold uppercase text-slate-900 transition hover:bg-[#e4af60] cursor-pointer">
                    Explore Amenities
                </button>
            </div>

        </section>
    );
};

export default Experience