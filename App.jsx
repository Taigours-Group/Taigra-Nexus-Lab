
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Services } from './pages/Services.jsx';
import { Projects } from './pages/Projects.jsx';
import { Blogs } from './pages/Blogs.jsx';
import { Contact } from './pages/Contact.jsx';
import { AdminLogin } from './pages/Admin/Login.jsx';
import { AdminDashboard } from './pages/Admin/Dashboard.jsx';

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let minLoadingTimePassed = false;

    // Force minimum loading time of 5 seconds if page loads fast
    const minLoadingTimer = setTimeout(() => {
      minLoadingTimePassed = true;
    }, 5000);

    const handleLoad = () => {
      const loadTime = Date.now() - startTime;
      
      if (loadTime < 3000) {
        // If page loads in less than 3 seconds, force show loading for 5 seconds
        setTimeout(() => {
          clearTimeout(minLoadingTimer);
          setLoadingComplete(true);
          setTimeout(() => setIsLoaded(true), 800);
        }, 5000 - loadTime);
      } else {
        // If page takes longer than 5 seconds, show until fully loaded
        clearTimeout(minLoadingTimer);
        if (minLoadingTimePassed) {
          setLoadingComplete(true);
          setTimeout(() => setIsLoaded(true), 800);
        }
      }
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(minLoadingTimer);
    };
  }, []);

  const handleLoadingComplete = () => {
    setLoadingComplete(true);
    setTimeout(() => setIsLoaded(true), 800);
  };

  return (
    <>
      {showLoading && !isLoaded && (
        <LoadingScreen 
          onComplete={handleLoadingComplete} 
          forceShow={!loadingComplete}
        />
      )}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
