import {FaFacebookF,FaInstagram,FaLinkedinIn,FaTwitter} from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const location = useLocation();
  if (location.pathname === '/user-login' || location.pathname === '/user-forget-password' || location.pathname === '/verify-email' || location.pathname === '/terms-of-service' || location.pathname === '/privacy-policy') {
    return null;
  }

    return (
        <footer className="border-t border-white/10 bg-slate-950">
            <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-12 px-6 py-20">

                <div>
                    <h2 className="text-3xl font-bold text-[#dec29a]">
                        Horizon Sky
                    </h2>
                    <p className="mt-5 leading-8 text-gray-400">
                        Experience luxury hotels with premium rooms, unforgettable stays, and world-class hospitality across Pakistan.
                    </p>
                </div>

                <div>
                    <h3 className="mb-5 text-xl font-semibold text-white">
                        Quick Links
                    </h3>
                    <ul className="space-y-3 text-gray-400">
                        <li>
                            <a href="#" className="transition hover:text-[#e4af60]">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-[#e4af60]">
                                Hotels
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-[#e4af60]">
                                Rooms
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="transition hover:text-[#e4af60]">
                                About
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-5 text-xl font-semibold text-white">
                        Support
                    </h3>
                    <ul className="space-y-3 text-gray-400">
                        <li>
                            <a href="/contact" className="transition hover:text-[#e4af60]">
                                Contact
                            </a>
                        </li>
                        <li>
                            <a href="/privacy-policy" className="transition hover:text-[#e4af60]">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/terms-of-service" className="transition hover:text-[#e4af60]">
                                Terms & Conditions
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition hover:text-[#e4af60]">
                                FAQs
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="mb-5 text-xl font-semibold text-white">
                        Follow Us
                    </h3>

                    <div className="flex gap-4">
                        <button className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#dec29a] text-[#dec29a] transition hover:border-[#e4af60] hover:bg-[#e4af60] hover:text-slate-900">
                            <FaFacebookF />
                        </button>

                        <button className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#dec29a] text-[#dec29a] transition hover:border-[#e4af60] hover:bg-[#e4af60] hover:text-slate-900">
                            <FaInstagram />
                        </button>

                        <button className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#dec29a] text-[#dec29a] transition hover:border-[#e4af60] hover:bg-[#e4af60] hover:text-slate-900">
                            <FaTwitter />
                        </button>

                        <button className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#dec29a] text-[#dec29a] transition hover:border-[#e4af60] hover:bg-[#e4af60] hover:text-slate-900">
                            <FaLinkedinIn />
                        </button>
                    </div>
                </div>

            </div>

            <div className="border-t border-white/10 py-6 text-center text-gray-500">
                © 2026 Horizon Sky. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer