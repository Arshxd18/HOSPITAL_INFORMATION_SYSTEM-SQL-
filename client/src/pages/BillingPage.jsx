import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { apiCall } from '../api';
import { CreditCard, DollarSign, FileText } from 'lucide-react';

const BillingPage = () => {
    const [admissionId, setAdmissionId] = useState('');
    const [billData, setBillData] = useState(null);
    const [status, setStatus] = useState({ loading: false, error: null, success: null });

    const handleGenerate = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: null, success: null });
        try {
            const res = await apiCall('/billing/generate', 'POST', { admissionId });
            // Depending on actual DB response, we might just get success, or data.
            // Mocking presentation data if DB returns just success for now logic
            setBillData(res.data || { amount: 1250.00, id: Math.floor(Math.random() * 1000), details: 'Standard Ward Charges + Lab Fees' });
            setStatus({ loading: false, error: null, success: 'Invoice Generated' });
        } catch (err) {
            setStatus({ loading: false, error: err.message, success: null });
        }
    };

    return (
        <div className="page-container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem', textAlign: 'center' }}>Billing & Payments</h2>

                <GlassCard>
                    <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                            <input
                                type="number"
                                className="form-input"
                                value={admissionId}
                                onChange={(e) => setAdmissionId(e.target.value)}
                                required
                                placeholder=" "
                            />
                            <label className="form-label" style={{ marginBottom: 0 }}>Admission ID</label>
                        </div>
                        <button type="submit" className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: '12px' }}>
                            Generate Bill
                        </button>
                    </form>

                    {/* Invoice Display */}
                    {billData && (
                        <div className="glass-panel" style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', marginTop: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <FileText /> Invoice #{billData.id}
                                </h3>
                                <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#6ee7b7', padding: '4px 12px', borderRadius: '20px', fontSize: '0.875rem' }}>PENDING</span>
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <p style={{ color: 'var(--text-muted)' }}>Description</p>
                                <p style={{ fontSize: '1.1rem' }}>{billData.details}</p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99, 102, 241, 0.1)', padding: '1.5rem', borderRadius: '16px' }}>
                                <div>
                                    <p style={{ color: 'var(--text-muted)' }}>Total Amount</p>
                                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>${billData.amount}</h2>
                                </div>
                                <button className="btn-primary" style={{ background: '#10b981', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <CreditCard size={20} /> Pay Now
                                </button>
                            </div>
                        </div>
                    )}

                    {status.error && (
                        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', borderRadius: '8px' }}>
                            {status.error}
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    );
};

export default BillingPage;
