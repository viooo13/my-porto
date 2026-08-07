import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StyledHeading } from '../../components/StyledWord';

const timelineData = [
    {
        id: 1,
        type: "Experience",
        year: "2023",
        title: "Web Development Learning Journey",
        subtitle: "Self-Taught & School",
        desc: "Began deep-diving into HTML, CSS, JavaScript, and eventually modern frameworks. Started building small projects to understand state management and API integrations.",
        x: 20, // percentage
        y: 70,
    },
    {
        id: 2,
        type: "Education",
        year: "2023 - 2026",
        title: "Software Engineering (RPL)",
        subtitle: "SMKN 1 Ciomas",
        desc: "Studying fundamental software architecture, databases, and modern web development. Building practical skills in system design and real-world problem solving through code.",
        x: 50,
        y: 25,
    },
    {
        id: 3,
        type: "Experience",
        year: "2024 - Present",
        title: "Frontend Developer (Freelance)",
        subtitle: "Self-Employed",
        desc: "Designing and developing modern, responsive web applications using React, Laravel, and Tailwind CSS. Focused on creating intuitive user experiences.",
        x: 80,
        y: 60,
    }
];

// Generate background stars
const bgStars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
}));

export default function Education() {
    const [activeNode, setActiveNode] = useState(null);
    const containerRef = useRef(null);

    return (
        <section id="education" style={{ 
            background: '#05050a', 
            position: 'relative', 
            zIndex: 1, 
            padding: '120px 0',
            overflow: 'hidden',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Background Stars */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                {bgStars.map(star => (
                    <motion.div
                        key={star.id}
                        style={{
                            position: 'absolute',
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: star.size,
                            height: star.size,
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                        }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            delay: star.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 40px', width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ textAlign: 'center', marginBottom: '60px' }}
                >
                    <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', letterSpacing: '-0.02em', margin: '0 0 16px 0' }}>
                        <StyledHeading text="Journey Constellation" color="#fff" />
                    </h2>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                        Explore the stars of my journey. Hover over the glowing stars to reveal milestones in my education and experience.
                    </p>
                </motion.div>

                {/* Constellation Container */}
                <div 
                    ref={containerRef}
                    style={{ 
                        position: 'relative', 
                        flex: 1, 
                        minHeight: '600px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Desktop/Tablet Constellation View */}
                    <div className="constellation-view" style={{ position: 'absolute', inset: 0, display: 'none' }}>
                        {/* Connecting Lines (SVG) */}
                        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
                            <motion.path
                                d={`M ${timelineData[0].x}% ${timelineData[0].y}% L ${timelineData[1].x}% ${timelineData[1].y}% L ${timelineData[2].x}% ${timelineData[2].y}%`}
                                stroke="rgba(74, 144, 217, 0.4)"
                                strokeWidth="2"
                                strokeDasharray="6,6"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* Stars (Nodes) */}
                        {timelineData.map((node, i) => (
                            <motion.div
                                key={node.id}
                                style={{
                                    position: 'absolute',
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: activeNode === i ? 10 : 5,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.5, duration: 0.8, type: 'spring' }}
                                onMouseEnter={() => setActiveNode(i)}
                                onMouseLeave={() => setActiveNode(null)}
                            >
                                {/* The Star itself */}
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: activeNode === i ? '#fff' : '#4a90d9',
                                    boxShadow: activeNode === i ? '0 0 30px #fff' : '0 0 20px #4a90d9',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: 'translate(-50%, -50%)',
                                }}>
                                    <div style={{ width: '8px', height: '8px', background: '#05050a', borderRadius: '50%' }} />
                                    
                                    {/* Pulse Effect */}
                                    <motion.div 
                                        style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px solid rgba(74,144,217,0.5)' }}
                                        animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                                    />
                                </div>

                                {/* Label (shows when not active to hint) */}
                                <AnimatePresence>
                                    {activeNode !== i && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                position: 'absolute',
                                                top: '15px',
                                                left: '-50%',
                                                transform: 'translateX(-50%)',
                                                whiteSpace: 'nowrap',
                                                color: 'rgba(255,255,255,0.8)',
                                                fontSize: '12px',
                                                fontFamily: 'Inter, sans-serif',
                                                letterSpacing: '0.1em',
                                                textTransform: 'uppercase',
                                                pointerEvents: 'none',
                                                textShadow: '0 0 10px rgba(0,0,0,0.8)'
                                            }}
                                        >
                                            {node.year}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Detail Card */}
                                <AnimatePresence>
                                    {activeNode === i && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.3, type: 'spring' }}
                                            style={{
                                                position: 'absolute',
                                                top: node.y > 50 ? 'auto' : '20px',
                                                bottom: node.y > 50 ? '20px' : 'auto',
                                                left: node.x > 50 ? 'auto' : '20px',
                                                right: node.x > 50 ? '20px' : 'auto',
                                                width: '320px',
                                                background: 'rgba(15, 20, 35, 0.75)',
                                                backdropFilter: 'blur(20px)',
                                                WebkitBackdropFilter: 'blur(20px)',
                                                border: '1px solid rgba(74, 144, 217, 0.3)',
                                                borderRadius: '16px',
                                                padding: '24px',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
                                                pointerEvents: 'none'
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                                <span style={{ 
                                                    fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, color: '#4a90d9', 
                                                    letterSpacing: '0.1em', padding: '4px 10px', background: 'rgba(74, 144, 217, 0.15)', 
                                                    borderRadius: '999px'
                                                }}>
                                                    {node.year}
                                                </span>
                                                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                                    {node.type}
                                                </span>
                                            </div>
                                            <h3 style={{ fontSize: '18px', color: '#fff', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif', margin: '0 0 6px 0' }}>
                                                {node.title}
                                            </h3>
                                            <h4 style={{ fontSize: '13px', color: '#4a90d9', fontWeight: 400, margin: '0 0 12px 0' }}>
                                                {node.subtitle}
                                            </h4>
                                            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                                                {node.desc}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile View (List) */}
                    <div className="mobile-view" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '30px', paddingTop: '20px' }}>
                        {timelineData.map((node, i) => (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.2, duration: 0.6 }}
                                style={{
                                    background: 'rgba(15, 20, 35, 0.5)',
                                    border: '1px solid rgba(74, 144, 217, 0.15)',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#4a90d9' }} />
                                
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                    <span style={{ 
                                        fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, color: '#4a90d9', 
                                        letterSpacing: '0.1em', padding: '4px 10px', background: 'rgba(74, 144, 217, 0.1)', 
                                        borderRadius: '999px'
                                    }}>
                                        {node.year}
                                    </span>
                                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {node.type}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '18px', color: '#fff', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif', margin: '0 0 6px 0' }}>
                                    {node.title}
                                </h3>
                                <h4 style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, margin: '0 0 12px 0' }}>
                                    {node.subtitle}
                                </h4>
                                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                                    {node.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @media (min-width: 768px) {
                    .constellation-view { display: block !important; }
                    .mobile-view { display: none !important; }
                }
            `}} />
        </section>
    );
}

