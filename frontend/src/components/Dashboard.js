import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                const { data } = await axios.get('http://localhost:5000/api/documents', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDocuments(data);
            } catch (error) {
                console.error('Failed to fetch documents:', error);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-400 p-4 sm:p-6 lg:p-8">
            {/* Welcome Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-4"
            >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight bg-gradient-to-r from-white via-yellow-300 to-white bg-clip-text text-transparent drop-shadow-md">
                    Welcome to CoCreate 🚀
                </h2>
                <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto text-white/90 font-medium">
                    Real-time <span className="font-semibold text-yellow-100">collaboration</span>, <span className="font-semibold text-blue-100">brainstorming</span>, and <span className="font-semibold text-pink-100">productivity</span>.
                </p>
                <p className="mt-2 text-sm sm:text-md lg:text-lg text-white/70">
                    Say goodbye to messy docs and hello to seamless teamwork ✨
                </p>
            </motion.div>

            {/* Dashboard Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/20 backdrop-blur-lg p-4 sm:p-6 lg:p-8 rounded-xl shadow-2xl max-w-full sm:max-w-7xl mx-auto"
            >
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4 sm:gap-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow">📂 Your Documents</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-white/80 hover:bg-white text-blue-700 font-semibold py-2 px-4 sm:px-6 rounded-lg transition duration-200 shadow-md"
                        onClick={() => navigate('/document/new')}
                    >
                        + Create Document
                    </motion.button>
                </div>

                {loading ? (
                    <p className="text-center text-white/80 animate-pulse">Loading documents...</p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid  sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
                    >
                        {documents.map((doc) => (
                            <motion.div
                                key={doc._id}
                                whileHover={{ scale: 1.03 }}
                                className="bg-white/80 text-slate-800 p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg backdrop-blur-md overflow-hidden"
                            >
                                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 break-words">{doc.title}</h3>
                                <p className="text-xs sm:text-sm lg:text-base text-slate-600 mb-1">
                                    🕒 {new Date(doc.createdAt).toLocaleString()}
                                </p>
                                <p className={doc.private ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>
                                    {doc.private ? '🔒 Private' : '🌍 Public'}
                                </p>
                                <p className="text-sm sm:text-md lg:text-lg text-slate-700 mt-2 break-words">
                                    {doc.content.length > 40 ? `${doc.content.slice(0, 40)}...` : doc.content}
                                </p>
                                <Link
                                    to={`/document/${doc._id}`}
                                    className="block mt-4 no-underline bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 sm:px-6 rounded-lg font-medium"
                                >
                                    Open Document
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {!loading && documents.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mt-6 sm:mt-8 lg:mt-10 text-white/80 font-medium"
                    >
                        No documents found. Start by creating one!
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Dashboard;
