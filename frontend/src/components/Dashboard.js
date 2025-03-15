import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-400 p-6">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-black">Welcome to CoCreate</h2>
                <p className="text-slate-900 mt-2 font-bold">Empowering teams with seamless real-time collaboration, idea sharing, and effortless communication.</p>
                <p className="text-slate-900 mt-2 font-bold">Experience real-time document editing, team discussions, and streamlined workflow—all in one place!</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
                </div>
                {loading ? (
                    <p className="text-center text-gray-500">Loading documents...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {documents.map((doc) => (
                            <div key={doc._id} className="bg-gray-100 rounded-lg shadow-lg p-4 hover:bg-blue-100">
                                <h5 className="text-xl font-semibold">{doc.title}</h5>
                                <p className="text-gray-600">Created on: {new Date(doc.createdAt).toLocaleDateString()}</p>
                                <Link to={`/document/${doc._id}`} className="block text-center bg-blue-600 text-white py-2 mt-3 rounded-lg hover:bg-blue-700">Open Document</Link>
                            </div>
                        ))}
                    </div>
                )}
                <div className="text-center mt-6">
                    <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700" onClick={() => navigate('/document/new')}>Create New Document</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
