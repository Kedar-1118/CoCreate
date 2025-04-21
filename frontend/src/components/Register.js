import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/send-otp`, { email });
            setOtpSent(true);
            setSuccessMessage('✅ OTP sent to your email.');
        } catch (error) {
            setError(error.response?.data?.message || 'Error sending OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, { name, email, password, otp });
            localStorage.setItem('token', data.token);
            setSuccessMessage('🎉 Registration successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2500);
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid OTP. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-400 p-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-6">Create Account</h2>

                {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-600 mb-4 font-medium">{error}</motion.div>}
                {successMessage && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 mb-4 font-medium">{successMessage}</motion.div>}

                {!otpSent ? (
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-left font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-left font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div>
                            <label htmlFor="otp" className="block text-left font-medium text-gray-700">Enter OTP</label>
                            <input
                                type="text"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            {loading ? 'Verifying...' : 'Verify OTP & Register'}
                        </button>
                    </form>
                )}

                <p className="mt-6 text-gray-600 text-sm text-center">
                    Already have an account?{' '}
                    <a href="/login" className="no-underline text-blue-600 font-medium hover:underline">Login here</a>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
