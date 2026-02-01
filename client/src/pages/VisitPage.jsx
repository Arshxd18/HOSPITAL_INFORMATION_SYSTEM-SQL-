import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { apiCall } from '../api';
import { Clipboard, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import '../form-styles.css';

const VisitPage = () => {
    const [formData, setFormData] = useState({
        patientId: '', doctorId: '', appointmentId: '', admissionId: '',
        date: new Date().toISOString().split('T')[0], visitType: 'OPD', notes: ''
    });
    const [status, setStatus] = useState({ loading: false, error: null, success: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: null });

        try {
            await apiCall('/visits/record', 'POST', formData);
            setStatus({ loading: false, error: null, success: 'Visit Recorded Successfully!' });
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
                    <h1>Record Visit</h1>
                    <p>Log a new patient visit and clinical notes.</p>
                </div>

                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-section-title">
                        <Clipboard size={20} /> Visit Details
                    </div>

                    <div className="form-group span-4">
                        <label className="form-label">Patient ID</label>
                        <input type="number" className="form-input" name="patientId" value={formData.patientId} onChange={handleChange} required placeholder="ID" />
                    </div>

                    <div className="form-group span-4">
                        <label className="form-label">Doctor ID</label>
                        <input type="number" className="form-input" name="doctorId" value={formData.doctorId} onChange={handleChange} required placeholder="ID" />
                    </div>

                    <div className="form-group span-4">
                        <label className="form-label">Appointment ID</label>
                        <input type="number" className="form-input" name="appointmentId" value={formData.appointmentId} onChange={handleChange} placeholder="Optional" />
                    </div>

                    <div className="form-group span-4">
                        <label className="form-label">Date</label>
                        <input type="date" className="form-input" name="date" value={formData.date} onChange={handleChange} required />
                    </div>

                    <div className="form-group span-4">
                        <label className="form-label">Type</label>
                        <select className="form-input" name="visitType" value={formData.visitType} onChange={handleChange}>
                            <option value="OPD">OPD (Outpatient)</option>
                            <option value="IPD">IPD (Inpatient)</option>
                        </select>
                    </div>

                    <div className="form-group span-4">
                        <label className="form-label">Admission ID</label>
                        <input type="number" className="form-input" name="admissionId" value={formData.admissionId} onChange={handleChange} placeholder="Optional" />
                    </div>

                    <div className="form-group span-full">
                        <label className="form-label">Diagnosis & Notes</label>
                        <textarea className="form-input" name="notes" value={formData.notes} onChange={handleChange} rows="4" required placeholder="Enter clinical findings..." />
                    </div>

                    <div className="span-full" style={{ marginTop: '1rem' }}>
                        <button type="submit" className="btn-primary" disabled={status.loading} style={{ width: '100%', padding: '1.2rem' }}>
                            {status.loading ? 'Saving Record...' : 'Save Visit Record'}
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

export default VisitPage;
