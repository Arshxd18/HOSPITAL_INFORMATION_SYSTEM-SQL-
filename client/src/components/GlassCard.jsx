import React from 'react';
import BentoCard from './BentoCard';

// Wrapper to instantly upgrade all pages to Bento style
const GlassCard = (props) => {
    return <BentoCard {...props} />;
};

export default GlassCard;
