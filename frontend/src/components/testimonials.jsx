import {FaQuoteLeft} from "react-icons/fa";
import { assets } from "../assets/assets";

const Testimonials = () => {
    return (
        <section className="py-20 mx-5 sm:mx-10 md:mx-20">
            <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-slate-900 p-8 md:p-16">
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full blur-[120px] bg-[#dec29a]"/>
                <div className="relative mx-auto max-w-4xl text-center">
                    <FaQuoteLeft className="mx-auto mb-8 text-6xl text-[#dec29a]"/>
                    <p className="text-2xl italic leading-relaxed text-white md:text-3xl">
                        "The level of service at Horizon Sky is unparalleled. Every detail was thoughtfully planned and every moment felt luxurious. It was truly an unforgettable experience."
                    </p>
                    <div className="mt-10 flex flex-col items-center">
                        <img src={assets.testimonialImage} alt="Client" className="mb-4 h-20 w-20 rounded-full border-2 object-cover border-[#dec29a]"/>
                        <h4 className="text-xl font-semibold text-white">
                            Alexandra Vaught
                        </h4>
                        <p className="mt-1 text-sm uppercase tracking-[0.3em] text-[#dec29a]">
                            Founder Of Stellar Ventures
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials