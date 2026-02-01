import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            width: '100%',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(10px)',
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
        }}>
            <p style={{
                color: '#666',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.5px'
            }}>
                Designed & Built by <span style={{ color: '#fff', fontWeight: 600 }}>Mohamed Arshad</span>
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                <a
                    href="https://github.com/Arshxd18"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#888', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#888'}
                >
                    <Github size={18} />
                </a>
                <a
                    href="https://www.linkedin.com/in/mohamed-arshadm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#888', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#0077b5'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#888'}
                >
                    <Linkedin size={18} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
