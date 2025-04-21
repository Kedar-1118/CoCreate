import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const location = useLocation();
    const hiddenRoutes = ["/", "/register", "/login"];

    if (hiddenRoutes.includes(location.pathname)) return null;

    return (
        <footer className="bg-slate-900 text-gray-300 py-4 w-full flex justify-center items-center shadow-inner  bottom-0 z-50">
            <div className="text-center text-sm sm:text-base">
                <p>
                    &copy; {new Date().getFullYear()} <span className="font-bold text-white">CoCreate</span> — Crafted for collaboration ✨
                </p>
                <p className="text-xs text-slate-500 mt-1">Empowering teams, one idea at a time.</p>
            </div>
        </footer>
    );
};

export default Footer;
