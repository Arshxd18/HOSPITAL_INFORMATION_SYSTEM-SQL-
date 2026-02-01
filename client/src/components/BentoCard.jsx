import React from 'react';
import { motion } from 'framer-motion';

const BentoCard = ({ children, className = '', title, subTitle, delay = 0, style, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay, ease: [0.23, 1, 0.32, 1] }} // Exponential ease
            className={`bento-card ${className}`}
            style={{
                background: 'rgba(16, 16, 16, 0.4)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                ...style // Allow style override
            }}
            {...props}
        >
            {(title || subTitle) && (
                <div style={{ marginBottom: '1rem' }}>
                    {title && <h3 style={{ fontSize: '1.2rem', color: 'white' }}>{title}</h3>}
                    {subTitle && <p style={{ fontSize: '0.9rem', color: '#666' }}>{subTitle}</p>}
                </div>
            )}
            {children}
        </motion.div>
    );
};

export default BentoCard;
