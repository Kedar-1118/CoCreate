import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const MyDocs = () => {
    const [myDocs, setMyDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyDocs = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/documents/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMyDocs(data);
            } catch (err) {
                console.error('Failed to fetch documents:', err);

            } finally {
                setLoading(false);
            }
        };

        fetchMyDocs();
    }, [navigate]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-400 p-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center text-white mb-12 px-4"
            >
                <h2 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-300 bg-clip-text text-transparent py-2">
                    📄 My Documents
                </h2>
                <p className="text-lg sm:text-xl max-w-3xl mx-auto text-slate-100 font-medium">
                    View and manage all documents created by <span className="text-yellow-200 font-bold">{JSON.parse(localStorage.getItem('user'))?.username}</span>.
                </p>
            </motion.div>

            {/* Documents */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-600 p-8 rounded-xl shadow-2xl max-w-6xl mx-auto"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">📚 Your Created Docs</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-gradient-to-r from-purple-700 to-violet-600 text-white py-2 px-6 rounded-lg"
                        onClick={() => navigate('/document/new')}
                    >
                        + Create New
                    </motion.button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-300 animate-pulse">Loading your documents...</p>
                ) : myDocs.length === 0 ? (
                    <p className="text-center text-gray-300">You haven't created any documents yet.</p>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {myDocs.map((doc) => (
                            <motion.div
                                key={doc._id}
                                whileHover={{ scale: 1.03 }}
                                className="bg-gradient-to-br from-teal-500 to-indigo-400 p-6 rounded-xl shadow-md text-white"
                            >
                                <h3 className="text-xl font-semibold mb-1">{doc.title}</h3>
                                <p className="text-sm mb-1">🕒 {new Date(doc.createdAt).toLocaleString()}</p>
                                <p className={doc.private ? 'text-red-200 font-semibold' : 'text-green-200 font-semibold'}>
                                    {doc.private ? '🔒 Private' : '🌍 Public'}
                                </p>
                                <Link
                                    to={`/document/${doc._id}`}
                                    className="block mt-4 bg-blue-700 hover:bg-blue-800 text-white text-center py-2 rounded-lg font-medium no-underline"
                                >
                                    Open Document
                                </Link>
                            </motion.div>
                        ))}

                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MyDocs;
