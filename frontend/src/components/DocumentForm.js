import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user ? user.token : null;
            const { data } = await axios.post('http://localhost:5000/api/documents', { title, content, isPrivate }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('🎉 Document created successfully!');
            setTimeout(() => navigate(`/document/${data._id}`), 1500);
        } catch (error) {
            setError('❌ Failed to create document. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-400 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg transition-all">
                <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">📄 Create New Document</h2>
                {error && <p className="text-red-600 text-center mb-4 font-semibold animate-pulse">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4 font-semibold animate-pulse">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-left font-medium mb-1">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-left font-medium mb-1">Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label htmlFor="private" className="font-medium text-gray-700">
                            Visibility: <span className={`font-bold ${isPrivate ? 'text-red-600' : 'text-green-600'}`}>{isPrivate ? 'Private' : 'Public'}</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="privated"
                                checked={isPrivate}
                                onChange={(e) => setIsPrivate(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-all ring-2 peer-focus:ring-blue-500"></div>
                            <div className="absolute w-5 h-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-full"></div>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-700 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-800 hover:to-blue-700 transition-all"
                    >
                        🚀 Create Document
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DocumentForm;
