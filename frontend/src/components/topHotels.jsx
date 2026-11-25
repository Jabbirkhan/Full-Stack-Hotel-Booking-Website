import { useContext } from "react";
// import { hotels } from "../assets/assets.js";
import {FaArrowRight,FaStar,FaMapMarkerAlt} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../context/context.jsx";

const TopHotels = () => {
    const { allHotels } = useContext(Context);
    const hotels = allHotels;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="py-20 mx-5 sm:mx-10 md:mx-20">

            <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div>
                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#dec29a]">
                        Destinations
                    </span>
                    <h2 className="mt-2 text-4xl font-bold text-[#dec29a] lg:text-5xl">
                        Our Top Hotels
                    </h2>
                </div>
                <Link to='/hotels' onClick={scrollToTop}>
                    <button className="flex items-center gap-2 text-sm font-semibold uppercase text-[#dec29a] hover:text-[#e4af60] cursor-pointer transition-color">
                        View All Hotels
                        <FaArrowRight />
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.filter((hotel) => hotel.status === true).slice(0, 6).map((hotel) => (
                    <div key={hotel._id} className="group overflow-hidden rounded-lg shadow-md shadow-[#e4af60] bg-slate-900 transition duration-500 hover:-translate-y-2">
                        <div className="overflow-hidden">
                            <img src={hotel.images[0]} alt={hotel.name} className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"/>
                        </div>

                        <div className="space-y-3 p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-2xl font-semibold text-white">
                                        {hotel.name}
                                    </h3>
                                    <div className="mt-2 flex items-center gap-2 text-gray-400">
                                        <FaMapMarkerAlt className="text-xs text-amber-300" />
                                        <span>
                                            {hotel.city}, {hotel.country}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1">
                                    <FaStar className="text-sm text-[#e4af60]" />
                                    <span className="font-semibold text-[#e4af60]">
                                        4.9
                                    </span>
                                </div>
                            </div>

                            <p className="line-clamp-1 text-gray-400">
                                {hotel.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {hotel.amenities.slice(0, 3).map((amenity) => (
                                    <span key={amenity} className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase text-gray-300">
                                        {amenity}
                                    </span>
                                ))}
                            </div>
                            
                            <Link to={`/hotel-detail/${hotel._id}`} onClick={scrollToTop}>
                                <button className="mt-3 w-full rounded-xl border border-[#dec29a] py-3 font-semibold text-[#dec29a] transition hover:bg-[#e4af60] cursor-pointer hover:text-slate-900">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default TopHotels