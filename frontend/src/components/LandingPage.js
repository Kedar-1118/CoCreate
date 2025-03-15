import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-6">
            {/* Hero Section */}
            <div className="text-center max-w-3xl">

                <h1 className="text-5xl font-bold mb-4">Welcome to CoCreate</h1>
                <p className="text-lg mb-6">
                    Empowering teams with seamless real-time collaboration, idea sharing, and effortless communication.
                </p>
                <blockquote className="italic text-lg border-l-4 border-white pl-4 mb-6">
                    "Great things in business are never done by one person; they’re done by a team of people." – Steve Jobs
                </blockquote>
                <div className="space-x-4 py-10 mt-10">
                    <Link to="/register" className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 no-underline">Sign Up</Link>
                    <Link to="/login" className="bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 no-underline">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
