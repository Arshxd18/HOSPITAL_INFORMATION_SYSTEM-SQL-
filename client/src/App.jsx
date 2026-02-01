import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import AdmissionPage from './pages/AdmissionPage';
import AppointmentPage from './pages/AppointmentPage';
import VisitPage from './pages/VisitPage';

import AnalyticsPage from './pages/AnalyticsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/admit" element={<AdmissionPage />} />
        <Route path="/appointments" element={<AppointmentPage />} />
        <Route path="/visits" element={<VisitPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
