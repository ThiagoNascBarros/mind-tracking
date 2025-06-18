import Logo from "/images/Logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleProtectedNavigation } from "../../utils/auth";
import { UserRoundIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClick = () => {
    navigate("/sign-in");
  };

  const handleNavigation = (path: string, label?: string) => {
    if (label?.toLowerCase() === "inicio") {
      navigate("/");
    } else {
      handleProtectedNavigation(navigate, path);
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-[#fff] hover:text-[#2544F4] font-medium transition-colors text-base ${
      isActive ? "text-[#2544F4] opacity-100" : "opacity-65 hover:opacity-100"
    }`;

  return (
    <header
      className="h-[86px] px-4 sm:px-8 md:px-12 lg:px-[120px] flex items-center justify-between border-[#bebebe] relative"
      style={{ background: "#070B1F" }}
    >
      <div>
        <NavLink to={isLoggedIn ? "/dashboard" : "/"}>
          <img
            src={Logo}
            alt="logo"
            className="w-[160px] md:w-[180px] lg:w-[212px] h-[46px]"
          />
        </NavLink>
      </div>

      {/* Menu Desktop */}
      <nav className="hidden lg:block">
        <ul className="flex gap-16">
          {(isLoggedIn 
            ? ["Questionarios", "Mind AI", "Dashboard"]
            : ["Inicio", "Questionarios", "Mind AI", "Dashboard"]
          ).map((item) => (
            <li key={item}>
              <button
                onClick={() =>
                  handleNavigation(
                    `/${item.toLowerCase().replace(/\s+/g, "-")}`,
                    item
                  )
                }
                className={navLinkClass({ isActive: false })}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botão ou ícone Desktop */}
      {/* Botão ou ícone Desktop */}
      <div className="hidden lg:block">
        {isLoggedIn ? (
          <button
            onClick={() => navigate("/perfil")}
            className="flex items-center justify-center text-white hover:text-[#3399FF] transition-colors"
            aria-label="Perfil"
          >
            <Avatar className="bg-[#3399FF] hover:bg-blue-700 size-12 hover:text-gray-50">
              <AvatarFallback>
                <UserRoundIcon size={24} className="hover:text-gray-50" aria-hidden="true" />
              </AvatarFallback>
            </Avatar>
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="px-[24px] py-[10px] text-white bg-[#3399FF] hover:bg-blue-700 rounded-[24px] font-medium transition-colors duration-200 cursor-pointer"
          >
            Comece Agora
          </button>
        )}
      </div>

      {/* Botão Menu Mobile */}
      <motion.button
        onClick={toggleMenu}
        className="lg:hidden p-2"
        aria-label="Menu"
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={isMenuOpen ? "open" : "closed"}
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? (
            <XMarkIcon className="size-8 md:size-10 text-white" />
          ) : (
            <Bars3Icon className="size-8 md:size-10 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="absolute top-[86px] left-0 right-0 lg:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            style={{ background: "#070B1F" }}
          >
            <ul className="flex flex-col p-4 md:p-6 space-y-6 items-start md:space-y-7">
              {(isLoggedIn 
                ? ["Questionarios", "Mind AI", "Dashboard"]
                : ["Inicio", "Questionarios", "Mind AI", "Dashboard"]
              ).map((item, index) => (
                <motion.li
                  key={item}
                  variants={menuItemVariants}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <button
                    onClick={() => {
                      handleNavigation(
                        `/${item.toLowerCase().replace(/\s+/g, "-")}`,
                        item
                      );
                      toggleMenu();
                    }}
                    className={navLinkClass({ isActive: false })}
                  >
                    {item}
                  </button>
                </motion.li>
              ))}

              <motion.li
                variants={menuItemVariants}
                transition={{ delay: 0.5 }}
              >
                {isLoggedIn ? (
                  <button
                    onClick={() => navigate("/perfil")}
                    className="flex gap-5 items-center text-white hover:text-[#3399FF] transition-colors"
                    aria-label="Perfil"
                  >
                    <Avatar className="bg-[#3399FF] hover:bg-blue-700 size-12 hover:text-gray-50">
                      <AvatarFallback>
                        <UserRoundIcon size={28.5} className="hover:text-gray-50" aria-hidden="true" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-lg font-semibold">Perfil</span>
                  </button>
                ) : (
                  <motion.button
                    onClick={() => {
                      handleClick();
                      toggleMenu();
                    }}
                    className="bg-[#3399FF] text-white font-medium px-[24px] py-[10px] md:py-[12px] rounded-[24px] w-full text-base md:text-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Comece Agora
                  </motion.button>
                )}
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
