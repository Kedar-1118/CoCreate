import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="container text-center bg-blue-600 mt-5">
            <div className="jumbotron bg-blue-100 p-5">
                <h1 className="display-4 text-red-500 ">Welcome to CoCreate</h1>
                <p className="lead">
                    CoCreate: Empowering teams with seamless real-time collaboration, idea sharing, and effortless communication.
                </p>
                <hr className="my-4" />
                <p className=''>
                    Whether you're collaborating on a team project or organizing your own ideas, CoCreate provides powerful features to boost your productivity and keep everything on track
                </p>
                <div className="mt-4">
                    <Link to="/register" className="btn btn-primary btn-lg me-3 ">Register</Link>
                    <Link to="/login" className="btn btn-secondary btn-lg">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
