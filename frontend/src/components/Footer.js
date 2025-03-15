import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Pages where Logout button should be hidden
    const hiddenRoutes = ["/", "/register", "/login"];

    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        navigate("/login"); // Redirect to login
    };

    return (
        <div>
            {!hiddenRoutes.includes(location.pathname) && (
                <footer className="bg-gray-900 text-white h-16 w-full fixed bottom-0 left-0 flex justify-between items-center px-6">
                    <p>&copy; {new Date().getFullYear()} YourApp. All rights reserved.</p>


                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>

                </footer>
            )}
        </div>
    );
};

export default Footer;
