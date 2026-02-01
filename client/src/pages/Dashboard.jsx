import React from 'react';
import BentoCard from '../components/BentoCard';
import { UserPlus, Calendar, Clipboard, Sparkles, Shield, Zap, ArrowRight, Heart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    return (
        <div className="page-container">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ marginBottom: '4rem' }}
            >
                <div style={{ maxWidth: '800px' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: 'rgba(255,255,255,0.05)', padding: '8px 16px',
                        borderRadius: '50px', marginBottom: '1.5rem', fontSize: '0.9rem',
                        border: '1px solid rgba(255,255,255,0.08)'
                    }}>
                        <Sparkles size={16} color="#22d3ee" />
                        <span style={{ color: '#888' }}>Next-Generation Healthcare Platform</span>
                    </div>

                    <h1 style={{
                        fontSize: '4rem', fontWeight: '800', lineHeight: 1.1,
                        marginBottom: '1.5rem', letterSpacing: '-0.03em'
                    }}>
                        Hospital Management,
                        <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 100%)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                        }}>Reimagined</span>
                    </h1>

                    <p style={{ fontSize: '1.2rem', color: '#888', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Streamline patient care, appointments, and medical records with our intelligent
                        hospital operating system. Built for modern healthcare.
                    </p>

                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/admit" style={{ textDecoration: 'none' }}>
                            <button className="btn-primary" style={{
                                display: 'flex', alignItems: 'center', gap: '8px'
                            }}>
                                Get Started <ArrowRight size={18} />
                            </button>
                        </Link>
                        <button style={{
                            background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.1)',
                            padding: '0.8rem 2rem', borderRadius: '50px', cursor: 'pointer',
                            fontWeight: 600, transition: '0.2s'
                        }}>
                            Watch Demo
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* BENTO GRID */}
            <div className="bento-grid">

                {/* Quick Actions - Large Cards */}
                <Link to="/admit" style={{ textDecoration: 'none' }}>
                    <BentoCard className="col-span-2" delay={0.1} style={{
                        background: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(16, 16, 16, 0.4) 100%)',
                        minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{
                                padding: '12px', background: 'rgba(34, 211, 238, 0.2)',
                                borderRadius: '12px', border: '1px solid rgba(34, 211, 238, 0.3)'
                            }}>
                                <UserPlus size={28} color="#22d3ee" />
                            </div>
                            <ArrowRight size={24} color="#666" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Patient Admission</h3>
                            <p style={{ color: '#888' }}>Register new patients and manage records</p>
                        </div>
                    </BentoCard>
                </Link>

                <Link to="/appointments" style={{ textDecoration: 'none' }}>
                    <BentoCard className="col-span-2" delay={0.2} style={{
                        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(16, 16, 16, 0.4) 100%)',
                        minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{
                                padding: '12px', background: 'rgba(139, 92, 246, 0.2)',
                                borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)'
                            }}>
                                <Calendar size={28} color="#8b5cf6" />
                            </div>
                            <ArrowRight size={24} color="#666" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Appointments</h3>
                            <p style={{ color: '#888' }}>Schedule and manage doctor appointments</p>
                        </div>
                    </BentoCard>
                </Link>

                {/* Feature Highlights */}
                <BentoCard className="col-span-2 row-span-2" delay={0.3} style={{
                    background: '#fff', color: '#000', borderColor: '#fff',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                }}>
                    <div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#000' }}>
                            Why MediCore?
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {[
                                { icon: Shield, label: 'HIPAA Compliant', desc: 'Enterprise-grade security' },
                                { icon: Zap, label: 'Lightning Fast', desc: 'Optimized performance' },
                                { icon: Heart, label: 'Patient First', desc: 'Designed for care' }
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <div style={{
                                        padding: '10px', background: '#f0f0f0',
                                        borderRadius: '10px', flexShrink: 0
                                    }}>
                                        <item.icon size={20} color="#000" />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 700, marginBottom: '4px', color: '#000' }}>
                                            {item.label}
                                        </h4>
                                        <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </BentoCard>

                <Link to="/visits" style={{ textDecoration: 'none' }}>
                    <BentoCard className="col-span-2" delay={0.4} style={{
                        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(16, 16, 16, 0.4) 100%)',
                        minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{
                                padding: '12px', background: 'rgba(236, 72, 153, 0.2)',
                                borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.3)'
                            }}>
                                <Clipboard size={28} color="#ec4899" />
                            </div>
                            <ArrowRight size={24} color="#666" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Visit Records</h3>
                            <p style={{ color: '#888' }}>Track patient visits and medical history</p>
                        </div>
                    </BentoCard>
                </Link>

                {/* System Status */}
                <BentoCard className="col-span-4" delay={0.5}>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', flexWrap: 'wrap', gap: '2rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                padding: '12px', background: '#0a0a0a', borderRadius: '50%',
                                border: '1px solid #222'
                            }}>
                                <Activity size={24} color="#4ade80" />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>System Status</h4>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{
                                        width: '8px', height: '8px', background: '#4ade80',
                                        borderRadius: '50%', boxShadow: '0 0 10px #4ade80'
                                    }} />
                                    <span style={{ color: '#4ade80', fontSize: '0.9rem' }}>All Systems Operational</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '2rem', color: '#888', fontSize: '0.9rem' }}>
                            <div>
                                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>99.9%</div>
                                <div>Uptime</div>
                            </div>
                            <div style={{ borderLeft: '1px solid #222', paddingLeft: '2rem' }}>
                                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>&lt;100ms</div>
                                <div>Response Time</div>
                            </div>
                            <div style={{ borderLeft: '1px solid #222', paddingLeft: '2rem' }}>
                                <div style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>24/7</div>
                                <div>Support</div>
                            </div>
                        </div>
                    </div>
                </BentoCard>

            </div>
        </div>
    );
};

export default Dashboard;
