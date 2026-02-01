import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { apiCall } from '../api';
import { User, Calendar, MapPin, Phone, Mail, Activity, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';
import '../form-styles.css';

const AdmissionPage = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dob: '', age: '',
        gender: 'Male', bloodGroup: '', phone: '', email: '',
        address: ''
    });

    const [status, setStatus] = useState({ loading: false, error: null, success: null });
    const [registeredPatient, setRegisteredPatient] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: null });

        try {
            // Calls /api/patients/register now
            const res = await apiCall('/patients/register', 'POST', formData);
            setRegisteredPatient(res.data);
            setStatus({ loading: false, error: null, success: 'Patient Registered Successfully!' });
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
                    <h1>Patient Admission</h1>
                    <p>Register a new patient into the hospital system. All fields marked with * are required.</p>
                </div>

                {!registeredPatient ? (
                    <form onSubmit={handleSubmit} className="form-grid">
                        {/* PERSONAL DETAILS SECTION */}
                        <div className="form-section-title">
                            <User size={20} /> Personal Information
                        </div>

                        <div className="form-group span-6">
                            <label className="form-label">First Name *</label>
                            <input className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Enter first name" />
                        </div>

                        <div className="form-group span-6">
                            <label className="form-label">Last Name *</label>
                            <input className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Enter last name" />
                        </div>

                        <div className="form-group span-4">
                            <label className="form-label">Date of Birth *</label>
                            <input type="date" className="form-input" name="dob" value={formData.dob} onChange={handleChange} required />
                        </div>

                        <div className="form-group span-4">
                            <label className="form-label">Age</label>
                            <input type="number" className="form-input" name="age" value={formData.age} onChange={handleChange} placeholder="Calc automatically" />
                        </div>

                        <div className="form-group span-4">
                            <label className="form-label">Gender *</label>
                            <select className="form-input" name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* CONTACT DETAILS SECTION */}


                        <div className="form-group span-4">
                            <label className="form-label">Blood Group</label>
                            <input className="form-input" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder="e.g. O+" />
                        </div>

                        <div className="form-group span-4">
                            <label className="form-label">Phone Number *</label>
                            <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Enter phone number" />
                        </div>

                        <div className="form-group span-4">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-input" name="email" value={formData.email} onChange={handleChange} placeholder="patient@example.com" />
                        </div>

                        <div className="form-group span-full">
                            <label className="form-label">Full Address *</label>
                            <textarea className="form-input" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter complete residential address" />
                        </div>

                        <div className="span-full" style={{ marginTop: '1rem' }}>
                            <button type="submit" className="btn-primary" disabled={status.loading} style={{ width: '100%', padding: '1.2rem' }}>
                                {status.loading ? 'Processing...' : 'Complete Registration'}
                            </button>
                        </div>

                        {status.error && (
                            <div className="span-full" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '8px' }}>
                                Error: {status.error}
                            </div>
                        )}
                    </form>
                ) : (
                    <div style={{ animation: 'fadeIn 0.5s ease', textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                            <User size={40} color="#10b981" />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>Registration Successful</h2>
                        <p style={{ color: '#aaa', marginBottom: '2rem' }}>Patient has been successfully added to the system.</p>

                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '16px',
                            padding: '1.5rem',
                            maxWidth: '500px',
                            margin: '0 auto 2rem',
                            border: '1px solid rgba(255,255,255,0.1)',
                            textAlign: 'left'
                        }}>
                            <h3 style={{ color: '#22d3ee', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Patient Card</h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#888' }}>Full Name</span>
                                    <span style={{ color: '#fff', fontWeight: 600 }}>{registeredPatient.firstName} {registeredPatient.lastName}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#888' }}>Patient ID</span>
                                    <span style={{ color: '#fff', fontWeight: 600 }}>{registeredPatient.patientId || 'PENDING'}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#888' }}>Age / Gender</span>
                                    <span style={{ color: '#fff' }}>{registeredPatient.age} / {registeredPatient.gender}</span>
                                </div>
                                <div>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: '#888' }}>Contact</span>
                                    <span style={{ color: '#fff' }}>{registeredPatient.phone}</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button className="btn-primary" onClick={() => setRegisteredPatient(null)}>Register New Patient</button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AdmissionPage;
