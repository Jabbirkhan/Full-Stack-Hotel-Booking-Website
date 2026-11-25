import { useContext } from "react";
import { rooms } from "../assets/assets.js";
import {FaUserFriends,FaExpandArrowsAlt} from "react-icons/fa";
import { Context } from "../context/context.jsx";
import { Link } from "react-router-dom";

const TopRooms = () => {

    const { allRooms } = useContext(Context);
    const rooms = allRooms;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    return (
        <section className="py-20 mx-5 sm:mx-10 md:mx-20">

            <div className="mb-12 text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
                    Sanctuaries
                </span>
                <h2 className="mt-2 text-4xl font-bold text-white lg:text-5xl">
                    Our Top Rooms
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                {rooms.filter((room) => room.status === true).slice(0, 6).map((room) => (
                  <div key={room._id} className="group flex flex-col gap-6 overflow-hidden rounded-md shadow-md shadow-[#e4af60] bg-slate-900 p-5 transition duration-300 hover:-translate-y-1 hover:bg-slate-800">
                    
                        <div className="overflow-hidden rounded-md shrink-0">
                            <img src={room.images[0]} alt={room.roomType} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"/>
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                            <div>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-white">
                                            {room.roomType} Room
                                        </h3>
                                        <p className="mt-1 text-gray-400">
                                            {room.hotelId.name}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-1 text-right">
                                        <h4 className="text-xl font-bold text-[#dec29a]">
                                            ${room.pricePerNight}
                                        </h4>
                                        <span className="text-sm text-gray-400">
                                            / night
                                        </span>
                                    </div>
                                </div>

                                <p className="mt-1 line-clamp-2 text-gray-400">
                                    {room.description}
                                </p>

                                <div className="mt-1 flex flex-wrap gap-5">
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <FaUserFriends className="text-[#dec29a]" />
                                        <span>
                                            {room.capacity} Guests
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <FaExpandArrowsAlt className="text-[#dec29a]" />
                                        <span>
                                            Room #{room.roomNumber}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {room.amenities.slice(0, 4).map((amenity) => (
                                        <span key={amenity} className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wider text-gray-300">
                                            {amenity}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link to={`/room-detail/${room._id}`} onClick={scrollToTop}>
                            <button className="mt-5 w-full rounded-md border border-white/10 py-3 font-semibold text-white transition hover:border-[#dec29a] hover:text-[#dec29a] cursor-pointer">
                                View Room
                            </button>
                            </Link>

                        </div>

                    </div>
                ))}

            </div>

        </section>
    );
};

export default TopRooms