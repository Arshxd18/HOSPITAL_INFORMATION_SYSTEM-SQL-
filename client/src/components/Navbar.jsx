import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, UserPlus, Calendar, Clipboard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const navItems = [
        { path: '/', label: 'Home', icon: Activity },
        { path: '/analytics', label: 'Analytics', icon: Activity },
        { path: '/admit', label: 'Admission', icon: UserPlus },
        { path: '/appointments', label: 'Appointments', icon: Calendar },
        { path: '/visits', label: 'Visits', icon: Clipboard },
    ];

    return (
        <nav className="nav-unified">
            {/* Logo area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '30px', height: '30px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={18} color="black" strokeWidth={3} />
                </div>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'white' }}>
                    MediCore
                </span>
            </div>

            {/* Desktop Menu */}
            <div className="desktop-menu" style={{ display: 'flex', gap: '4px' }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${isActive ? 'active' : ''}`}
                            style={{
                                opacity: isActive ? 1 : 0.6,
                                background: isActive ? '#1a1a1a' : 'transparent',
                                color: isActive ? 'white' : '#888'
                            }}
                        >
                            <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                        </Link>
                    )
                })}
            </div>

            {/* Mobile Toggle */}
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                            position: 'absolute', top: '80px', right: '1rem', width: '250px',
                            background: '#111', border: '1px solid #222', borderRadius: '16px',
                            padding: '1rem', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)', overflow: 'hidden'
                        }}
                    >
                        {navItems.map((item) => (
                            <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    padding: '0.8rem 1rem',
                                    color: location.pathname === item.path ? 'white' : '#888',
                                    borderRadius: '8px', margin: '4px 0',
                                    background: location.pathname === item.path ? '#222' : 'transparent',
                                    display: 'flex', alignItems: 'center', gap: '10px'
                                }}>
                                    <item.icon size={16} /> {item.label}
                                </div>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) { .desktop-menu { display: none !important; } .mobile-toggle { display: block !important; } }
                @media (min-width: 769px) { .mobile-toggle { display: none !important; } }
            `}</style>
        </nav>
    );
};

export default Navbar;
