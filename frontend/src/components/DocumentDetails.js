import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../services/documentService';
import { io } from 'socket.io-client';
import { motion } from 'framer-motion';

const DocumentDetails = () => {
    const socket = io('http://localhost:5000');
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const message = location.state?.message;

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const doc = await getDocumentById(id);
                setTitle(doc.title);
                setContent(doc.content);
                setIsPrivate(doc?.private);
            } catch {
                setError('⚠️ Failed to fetch document.');
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [id]);

    useEffect(() => {
        socket.emit('joinDocument', id);
        socket.on('receiveUpdate', (data) => {
            if (data.title !== title) setTitle(data.title);
            if (data.content !== content) setContent(data.content);
        });
        return () => socket.disconnect();
    }, [id, title, content]);

    const handleUpdate = async () => {
        try {
            await updateDocument(id, { title, content, private: isPrivate });
            socket.emit('documentUpdate', { documentId: id, title, content, private: isPrivate });
            setSuccessMessage('✅ Document updated successfully!');
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch {
            setError('❌ Failed to update document.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDocument(id);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || '❌ Failed to delete document.');
        }
    };

    if (loading) {
        return (
            <div className="text-white text-center text-xl mt-24 animate-pulse">
                ⏳ Loading your document...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-400 p-4 sm:p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 sm:p-6 lg:p-10 rounded-2xl shadow-2xl max-w-4xl sm:mx-auto"
            >
                {message && <div className="mb-4 text-green-600 font-semibold text-sm sm:text-base">{message}</div>}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center text-slate-800 mb-6">
                    📝 Edit Document
                </h2>

                {error && <p className="text-red-500 mb-4 text-sm sm:text-base">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4 text-sm sm:text-base">{successMessage}</p>}

                {/* Title Field */}
                <div className="mb-6">
                    <label className="block text-base sm:text-lg font-semibold mb-2 text-slate-700">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            socket.emit('documentUpdate', { documentId: id, title: e.target.value, content });
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                    />
                </div>

                {/* Content Field */}
                <div className="mb-6">
                    <label className="block text-base sm:text-lg font-semibold mb-2 text-slate-700">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            socket.emit('documentUpdate', { documentId: id, title, content: e.target.value });
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg min-h-[180px] focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                    />
                </div>

                {/* Privacy Toggle */}
                <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                    <span className="text-sm sm:text-base font-medium text-slate-700">
                        {isPrivate ? '🔒 Private' : '🌍 Public'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300" />
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-full" />
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-2 px-5 rounded-lg shadow transition"
                        onClick={handleUpdate}
                    >
                        💾 Save
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white text-lg font-semibold py-2 px-5 rounded-lg shadow transition"
                        onClick={handleDelete}
                    >
                        🗑️ Delete
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default DocumentDetails;
