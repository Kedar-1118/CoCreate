import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { logout } from '../services/logoutServices';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // const handleLogout = () => {
    //     logout();
    //     navigate('/');
    // };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const hiddenRoutes = ['/', '/login', '/register'];
    if (hiddenRoutes.includes(location.pathname)) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-slate-900 shadow-md py-4 px-6 flex justify-between items-center z-50 ">{/* sticky top-0*/}
            <Link
                to="/dashboard"
                className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent no-underline"
            >
                CoCreate
            </Link>

            <div className="flex items-center space-x-6 relative">
                <Link
                    className={`transition-all font-medium no-underline ${isActive('/dashboard') ? 'text-blue-400' : 'text-white hover:text-blue-400'
                        }`}
                    to="/dashboard"
                >
                    Dashboard
                </Link>

                {/* Example future feature: */}
                {/* <Link
                    className={`transition-all font-medium no-underline ${isActive('/docs') ? 'text-blue-400' : 'text-white hover:text-blue-400'
                        }`}
                    to="/my-docs"
                >
                    My Docs
                </Link> */}

                {user ? (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="text-white font-semibold hover:text-blue-300 transition flex items-center gap-2"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow">
                                {user.username.toUpperCase()}
                            </div>


                        </button>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
                                >
                                    <button
                                        className="w-full text-center font-bold text-md px-4 py-2 text-gray-800 bg-red-600 hover:bg-red-800  transition shadow-lg"
                                        onClick={() => navigate('/login')}
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <>
                        <Link
                            className={`no-underline font-medium transition ${isActive('/login') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-500'
                                }`}
                            to="/login"
                        >
                            Login
                        </Link>
                        <Link
                            className={`no-underline font-medium transition ${isActive('/register') ? 'text-blue-400' : 'text-gray-300 hover:text-blue-500'
                                }`}
                            to="/register"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
