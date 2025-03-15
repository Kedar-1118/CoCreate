import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Hide navbar on these routes
    const hiddenRoutes = ['/', '/login', '/register'];
    if (hiddenRoutes.includes(location.pathname)) return null;

    return (
        <nav className="bg-slate-900 shadow-md py-4 px-6 flex justify-between items-center">
            <Link to="/dashboard" className="text-2xl font-bold text-blue-600 flex items-center no-underline">
                CoCreate
            </Link>
            <div className="flex items-center space-x-4">
                <Link className="text-gray-100 hover:text-blue-300 no-underline" to="/dashboard">Dashboard</Link>
                {user ? (
                    <div className="relative">
                        <button
                            className="text-gray-100 hover:text-blue-300 no-underline"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            {user.username} ▼
                        </button>
                        <div className={`absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg ${dropdownOpen ? 'block' : 'hidden'}`}>
                            <button
                                className="block bg-slate-100 w-full text-center px-2 py-2 text-gray-900 hover:text-blue-600 no-underline rounded-lg"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link className="text-gray-700 hover:text-blue-600 no-underline" to="/login">Login</Link>
                        <Link className="text-gray-700 hover:text-blue-600 no-underline" to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
