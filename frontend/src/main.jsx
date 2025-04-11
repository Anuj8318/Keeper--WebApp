import React, { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Header from './components/header/Header.jsx'; 
import Footer from './components/footer/Footer.jsx'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const RootApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
     
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route
            path="/app"
            element={isAuthenticated ? <App /> : <Navigate to="/login" />}
          />
        </Routes>
        <Footer />
    </Router>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
