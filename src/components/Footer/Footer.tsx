import { NavLink } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "./../Logo.svg";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] text-white py-4 sm:py-8 px-2 sm:px-4 md:px-8 md:py-12 lg:px-[75px] min-h-[324px] flex flex-col justify-center">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4 sm:gap-8">
                    {/* Logo and Description Section */}
                    <div className="flex flex-col items-center lg:items-start gap-2 sm:gap-4 lg:gap-8 w-full lg:w-1/3 text-center lg:text-left">
                        <img className="h-12 sm:h-16 lg:h-24" src={Logo} alt="Mind Tracking Logo" />
                        <p className="text-xs sm:text-sm lg:text-base max-w-[200px] sm:max-w-none">Seu companheiro digital para autoconhecimento, bem-estar mental e crescimento pessoal.</p>
                    </div>

                    {/* Navigation Section */}
                    <div className="w-full lg:w-auto">
                        <nav>
                            <h2 className="text-sm sm:text-[16px] font-semibold mb-2 sm:mb-4 text-center lg:text-left">Navegação</h2>
                            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-[14px] text-[#E5E7EB] font-regular flex flex-col items-center lg:items-start">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            `hover:underline ${isActive ? "font-bold text-white" : ""}`
                                        }
                                    >
                                        Início
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/questionarios"
                                        className={({ isActive }) =>
                                            `hover:underline ${isActive ? "font-bold text-white" : ""}`
                                        }
                                    >
                                        Questionários
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/mind-ia"
                                        className={({ isActive }) =>
                                            `hover:underline ${isActive ? "font-bold text-white" : ""}`
                                        }
                                    >
                                        Mind IA
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            `hover:underline ${isActive ? "font-bold text-white" : ""}`
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/faq"
                                        className={({ isActive }) =>
                                            `hover:underline ${isActive ? "font-bold text-white" : ""}`
                                        }
                                    >
                                        FAQ
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col gap-2 sm:gap-4 items-center lg:items-start w-full lg:w-1/3">
                        <h2 className="text-sm sm:text-[16px] font-semibold mb-1 sm:mb-2 text-center lg:text-left">Contato</h2>
                        <span className="text-xs sm:text-[14px] text-[#E5E7EB]">(11) 99999-9999</span>
                        <span className="text-xs sm:text-[14px] text-[#E5E7EB]">contato@mindtracking.com</span>
                        <div className="flex gap-3 sm:gap-6 mt-2 sm:mt-4 text-lg sm:text-2xl">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3399FF]">
                                <FaTwitter />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3399FF]">
                                <FaFacebookF />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3399FF]">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}