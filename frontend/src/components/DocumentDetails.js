import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../services/documentService';
import { io } from 'socket.io-client';

const DocumentDetails = () => {
    const socket = io('http://localhost:5000');
    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const doc = await getDocumentById(id);
                setDocument(doc);
                setTitle(doc.title);
                setContent(doc.content);
            } catch (error) {
                setError('Failed to fetch document');
            } finally {
                setLoading(false);
            }
        };
        fetchDocument();
    }, [id]);

    useEffect(() => {
        socket.emit('joinDocument', id);
        socket.on('receiveUpdate', (updatedData) => {
            setTitle(updatedData.title || title);
            setContent(updatedData.content || content);
        });
        return () => {
            socket.disconnect();
        };
    }, [id, title, content]);

    const handleUpdate = async () => {
        try {
            await updateDocument(id, { title, content });
            socket.emit('documentUpdate', { documentId: id, title, content });
            setSuccessMessage('Document updated successfully!');
        } catch (error) {
            setError('Failed to update document');
        }
        setTimeout(() => navigate('/dashboard'), 3000);
    };

    const handleDelete = async () => {
        try {
            await deleteDocument(id);
            navigate('/dashboard');
        } catch (error) {
            setError('Failed to delete document');
        }
    };

    if (loading) return <div className="text-center text-gray-500">Loading document...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-red-400 p-6">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mx-auto">
                {message && <div className="alert alert-success mb-4">{message}</div>}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Edit Document</h2>
                {error && <div className="text-red-600 mb-4">{error}</div>}
                <div className="mb-4">
                    <label htmlFor="title" className="block font-semibold">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="w-full p-2 border rounded-lg"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            socket.emit('documentUpdate', { documentId: id, title: e.target.value, content });
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block font-semibold">Content:</label>
                    <textarea
                        id="content"
                        className="w-full p-2 border rounded-lg h-40"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            socket.emit('documentUpdate', { documentId: id, title, content: e.target.value });
                        }}
                    />
                </div>
                {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}
                <div className="flex gap-4">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700" onClick={handleUpdate}>Save Changes</button>
                    <button className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700" onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DocumentDetails;
