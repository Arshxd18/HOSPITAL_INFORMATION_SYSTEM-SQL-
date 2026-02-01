import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { apiCall } from '../api';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import '../form-styles.css';

const AppointmentPage = () => {
    const [formData, setFormData] = useState({
        patientId: '', doctorId: '', date: '', time: ''
    });
    const [status, setStatus] = useState({ loading: false, error: null, success: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: null });

        try {
            await apiCall('/appointments/book', 'POST', formData);
            setStatus({ loading: false, error: null, success: 'Appointment Booked Successfully!' });
        } catch (err) {
            setStatus({ loading: false, error: err.message, success: null });
        }
    };

    return (
        <div className="form-page-container">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="form-card"
            >
                <div className="form-header">
                    <h1>Book Appointment</h1>
                    <p>Schedule a consultation with a doctor.</p>
                </div>

                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-section-title">
                        <User size={20} /> Appointment Details
                    </div>

                    <div className="form-group span-6">
                        <label className="form-label">Patient ID</label>
                        <input type="number" className="form-input" name="patientId" value={formData.patientId} onChange={handleChange} required placeholder="Enter Patient ID" />
                    </div>

                    <div className="form-group span-6">
                        <label className="form-label">Doctor ID</label>
                        <input type="number" className="form-input" name="doctorId" value={formData.doctorId} onChange={handleChange} required placeholder="Enter Doctor ID" />
                    </div>

                    <div className="form-group span-6">
                        <label className="form-label">Date</label>
                        <input type="date" className="form-input" name="date" value={formData.date} onChange={handleChange} required />
                    </div>

                    <div className="form-group span-6">
                        <label className="form-label">Time</label>
                        <input type="time" className="form-input" name="time" value={formData.time} onChange={handleChange} required />
                    </div>

                    <div className="span-full" style={{ marginTop: '1rem' }}>
                        <button type="submit" className="btn-primary" disabled={status.loading} style={{ width: '100%', padding: '1.2rem' }}>
                            {status.loading ? 'Booking...' : 'Confirm Appointment'}
                        </button>
                    </div>

                    {status.error && (
                        <div className="span-full" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '8px' }}>
                            Error: {status.error}
                        </div>
                    )}
                    {status.success && (
                        <div className="span-full" style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#6ee7b7', borderRadius: '8px' }}>
                            {status.success}
                        </div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default AppointmentPage;
