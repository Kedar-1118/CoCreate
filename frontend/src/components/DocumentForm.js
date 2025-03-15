import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user ? user.token : null;
            const { data } = await axios.post('http://localhost:5000/api/documents', { title, content }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccess('Document created successfully!');
            setTimeout(() => navigate(`/document/${data._id}`), 2000);
        } catch (error) {
            setError('Failed to create document. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-400 p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Create New Document</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-left font-medium">Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-left font-medium">Content</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]" />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">Create</button>
                </form>
            </div>
        </div>
    );
};

export default DocumentForm;
