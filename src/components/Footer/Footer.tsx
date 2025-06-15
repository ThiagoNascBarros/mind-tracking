import { NavLink, useNavigate } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import Logo from "/images/Logo.svg";
import { handleProtectedNavigation } from "../../utils/auth";
import { useEffect, useState } from "react";

export default function Footer() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleNavigation = (path: string, label?: string) => {
        if (label?.toLowerCase() === 'inicio') {
            navigate('/');
        } else if (label?.toLowerCase() === 'faq') {
            navigate('/faq');
        } else {
            handleProtectedNavigation(navigate, path);
        }
    };

  return (
    <footer className="bg-gradient-to-bl from-[#03061B] via-[#0F1526] to-[#0F1A3D] text-white py-8 sm:py-8 px-2 sm:px-4 md:px-8 md:py-12 lg:px-[75px] min-h-[324px] flex flex-col justify-center">
      <div className="container mx-auto pl-2 md:pl-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between sm:gap-10 h-[500px] sm:h-auto">
          <div className="flex flex-col items-start lg:items-start gap-2 sm:gap-4 lg:gap-8 w-full lg:w-1/3 text-left">
            <NavLink to={isLoggedIn ? "/dashboard" : "/"}>
              <img
                className="h-12 sm:h-16 lg:h-19 transform hover:scale-105 transition-transform duration-300"
                src={Logo}
                alt="Mind Tracking Logo"
              />
            </NavLink>
            <p className="text-sm sm:text-sm lg:text-base text-[#E5E7EB] leading-relaxed w-[300px] sm:w-auto">
              Seu companheiro digital para autoconhecimento, bem-estar mental e
              crescimento pessoal.
            </p>
          </div>

          {/* Navigation Section */}
          <div className="w-full lg:w-auto">
            <nav>
              <h2 className="text-base sm:text-[16px] font-semibold mb-3 sm:mb-4 text-left">
                Navegação
              </h2>
              <ul className="space-y-2 sm:space-y-2 text-sm sm:text-[14px] text-[#E5E7EB] font-regular flex flex-col items-start">
                {!isLoggedIn && (
                  <li>
                    <button
                      onClick={() => handleNavigation('/', 'Inicio')}
                      className="hover:text-[#2544F4] transition-all duration-300 ease-in-out transform hover:translate-x-1"
                    >
                      Início
                    </button>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => handleNavigation('/questionarios', 'Questionários')}
                    className="hover:text-[#2544F4] transition-all duration-300 ease-in-out transform hover:translate-x-1"
                  >
                    Questionários
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/mind-ai', 'Mind IA')}
                    className="hover:text-[#2544F4] transition-all duration-300 ease-in-out transform hover:translate-x-1"
                  >
                    Mind IA
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/dashboard', 'Dashboard')}
                    className="hover:text-[#2544F4] transition-all duration-300 ease-in-out transform hover:translate-x-1"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/faq', 'FAQ')}
                    className="hover:text-[#2544F4] transition-all duration-300 ease-in-out transform hover:translate-x-1"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex flex-col gap-3 sm:gap-5 items-start lg:items-start w-full lg:w-1/3 lg:pl-28">
            <h2 className="text-base sm:text-[16px] font-semibold mb-2 sm:mb-2 text-left">
              Contato
            </h2>
            <span className="text-sm sm:text-[14px] text-[#E5E7EB] hover:text-white transition-colors duration-300">
              (11) 99999-9999
            </span>
            <span className="text-sm sm:text-[14px] text-[#E5E7EB] hover:text-white transition-colors duration-300">
                            suporte.mindtrack@gmail.com
            </span>
            <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-4 text-xl sm:text-2xl">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3399FF] transform hover:scale-110 transition-all duration-300"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3399FF] transform hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#3399FF] transform hover:scale-110 transition-all duration-300"
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
