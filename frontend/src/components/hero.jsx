import { FaSearch, FaCalendarAlt, FaUserFriends } from "react-icons/fa";
import { assets } from "../assets/assets.js";

const Hero = () => {

    return (
        <section className="relative h-130 w-full overflow-hidden bg-slate-900">

            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center z-10" style={{ backgroundImage: `url(${assets.heroImage})` }} />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/40 to-slate-950 z-20" />

            {/* Hero Content */}
            <div className="relative z-30 flex h-full flex-col items-center justify-center px-6">

                {/* Heading */}
                <div className="mb-16 max-w-3xl text-center">

                    <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
                        Beyond the Clouds
                    </h1>

                    <p className="text-lg leading-8 text-gray-300 md:text-xl">
                        Discover a new dimension of luxury hospitality where
                        the sky is not the limit, but our starting point.
                    </p>

                </div>

            </div>
        </section>
    );
};

export default Hero