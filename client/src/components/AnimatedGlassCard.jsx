import React from 'react';
import { motion } from 'framer-motion';

const AnimatedGlassCard = ({ children, delay = 0, className = '', hoverEffect = true, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
            whileHover={hoverEffect ? {
                y: -5,
                boxShadow: "0 20px 40px -10px rgba(99, 102, 241, 0.3)",
                borderColor: "rgba(255, 255, 255, 0.3)"
            } : {}}
            style={{
                background: 'rgba(30, 41, 59, 0.4)', // Darker translucent
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '2rem',
                overflow: 'hidden',
                position: 'relative'
            }}
            className={className}
            {...props}
        >
            {/* Subtle Gradient Blob for glow effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05), transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </motion.div>
    );
};

export default AnimatedGlassCard;
