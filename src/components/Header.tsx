import Logo from "./Logo.svg";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = () => {
        navigate("/login");
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const menuVariants = {
        closed: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const menuItemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) => 
        `text-[#fff] hover:text-[#2544F4] font-medium transition-colors text-base ${
            isActive ? 'text-[#2544F4] opacity-100' : 'opacity-65 hover:opacity-100'
        }`;

    return (
        <header className="h-[86px] px-4 sm:px-8 md:px-12 lg:px-[120px] flex items-center justify-between border-[#bebebe] relative" style={{ background: "#070B1F" }}>
            <div>
                <NavLink to="/">
                    <img 
                        src={ Logo } 
                        alt="logo" 
                        className="w-[160px] md:w-[180px] lg:w-[212px] h-[46px]"
                    />
                </NavLink>
            </div>

            {/* Menu Desktop */}
            <nav className="hidden lg:block">
                <ul className="flex gap-16">
                    <li>
                        <NavLink 
                            to="/"
                            className={navLinkClass}
                        >
                            Inicio
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink 
                            to="/questionarios"
                            className={navLinkClass}
                        >
                            Questionários
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink
                            to="/mind-ai"
                            className={navLinkClass}
                        >
                            Mind AI
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink 
                            to="/dashboard"
                            className={navLinkClass}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                </ul>
            </nav>

            {/* Botão Desktop */}
            <div className="hidden lg:block">
                <button
                    onClick={handleClick}
                    className="bg-[#3399FF] text-white font-medium px-[24px] py-[10px] rounded-[24px] text-base align-text-bottom"
                >
                    Comece Agora
                </button>
            </div>

            {/* Botão Menu Mobile/Tablet */}
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
                        closed: { rotate: 0 }
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

            {/* Menu Mobile/Tablet */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav 
                        className="absolute top-[86px] left-0 right-0 lg:hidden"
                        initial="closed"
                        animate="open"
                        style={{ background: "#070B1F" }}
                        exit="closed"
                        variants={menuVariants}
                    >
                        <ul className="flex flex-col p-4 md:p-6 space-y-4 md:space-y-6">
                            <motion.li
                                variants={menuItemVariants}
                                transition={{ delay: 0.1 }}
                            >
                                <NavLink 
                                    to="/"
                                    className={navLinkClass}
                                    onClick={toggleMenu}
                                >
                                    Inicio
                                </NavLink>
                            </motion.li>
                            
                            <motion.li
                                variants={menuItemVariants}
                                transition={{ delay: 0.2 }}
                            >
                                <NavLink 
                                    to="/questionarios"
                                    className={navLinkClass}
                                    onClick={toggleMenu}
                                >
                                    Questionários
                                </NavLink>
                            </motion.li>
                            
                            <motion.li
                                variants={menuItemVariants}
                                transition={{ delay: 0.3 }}
                            >
                                <NavLink
                                    to="/mind-ai"
                                    className={navLinkClass}
                                    onClick={toggleMenu}
                                >
                                    Mind AI
                                </NavLink>
                            </motion.li>
                            
                            <motion.li
                                variants={menuItemVariants}
                                transition={{ delay: 0.4 }}
                            >
                                <NavLink 
                                    to="/dashboard"
                                    className={navLinkClass}
                                    onClick={toggleMenu}
                                >
                                    Dashboard
                                </NavLink>
                            </motion.li>

                            <motion.li
                                variants={menuItemVariants}
                                transition={{ delay: 0.5 }}
                            >
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
                            </motion.li>
                        </ul>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    )
}