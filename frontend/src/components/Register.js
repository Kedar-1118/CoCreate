import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // 📩 **Send OTP**
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:5000/api/auth/send-otp', { email });
            setOtpSent(true);
            setSuccessMessage('OTP sent to your email. Please check and enter below.');
        } catch (error) {
            setError(error.response?.data?.message || 'Error sending OTP. Try again.');
        }
    };

    // ✅ **Verify OTP & Register**
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/verify-otp', { name, email, password, otp });
            localStorage.setItem('token', data.token);

            setSuccessMessage('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid OTP. Try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-400 p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                <h2 className="text-3xl font-bold text-blue-700 mb-6">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

                {!otpSent ? (
                    // Step 1: Collect User Details & Send OTP
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-left font-medium">Username</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left font-medium">Email Address</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-left font-medium">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                            Send OTP
                        </button>
                    </form>
                ) : (
                    // Step 2: Enter OTP & Verify
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div>
                            <label htmlFor="otp" className="block text-left font-medium">Enter OTP</label>
                            <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                            Verify OTP & Register
                        </button>
                    </form>
                )}

                <p className="mt-4 text-gray-600">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
            </div>
        </div>
    );
};

export default Register;
