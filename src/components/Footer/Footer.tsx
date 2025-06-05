import { NavLink } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "./../Logo.svg";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] text-white py-8 px-4 md:px-8 lg:px-[75px] min-h-[324px]">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Logo and Description Section */}
                    <div className="flex flex-col gap-4">
                        <img className="h-16 lg:h-20" src={Logo} alt="Mind Tracking Logo" />
                        <p className="text-sm lg:text-base text-[#E5E7EB] max-w-md">
                            Seu companheiro digital para autoconhecimento, bem-estar mental e crescimento pessoal.
                        </p>
                    </div>

                    {/* Navigation Section */}
                    <div>
                        <h2 className="text-base font-semibold mb-4">Navegação</h2>
                        <ul className="space-y-3 text-sm text-[#E5E7EB]">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `hover:text-white transition-colors ${isActive ? "font-semibold text-white" : ""}`
                                    }
                                >
                                    Início
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/questionarios"
                                    className={({ isActive }) =>
                                        `hover:text-white transition-colors ${isActive ? "font-semibold text-white" : ""}`
                                    }
                                >
                                    Questionários
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/mind-ia"
                                    className={({ isActive }) =>
                                        `hover:text-white transition-colors ${isActive ? "font-semibold text-white" : ""}`
                                    }
                                >
                                    Mind IA
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `hover:text-white transition-colors ${isActive ? "font-semibold text-white" : ""}`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/faq"
                                    className={({ isActive }) =>
                                        `hover:text-white transition-colors ${isActive ? "font-semibold text-white" : ""}`
                                    }
                                >
                                    FAQ
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-base font-semibold">Contato</h2>
                        <div className="space-y-2 text-sm text-[#E5E7EB]">
                            <p>(11) 99999-9999</p>
                            <p>contato@mindtracking.com</p>
                        </div>
                        <div className="flex gap-6 mt-2 text-xl">
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-[#3399FF] transition-colors"
                            >
                                <FaTwitter />
                            </a>
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-[#3399FF] transition-colors"
                            >
                                <FaFacebookF />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-[#3399FF] transition-colors"
                            >
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}