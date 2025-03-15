import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import DocumentForm from './components/DocumentForm';
import DocumentDetails from './components/DocumentDetails';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

function App() {
    return (
        <Router  >
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/document/:id" element={<DocumentDetails />} />
                <Route path="/document/new" element={<DocumentForm />} />
            </Routes>
            <Footer class=" bottom-0 left-0 right-0" />
        </Router>
    );
}

export default App;
