import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { StyledHeading } from '../../components/StyledWord';

const timelineData = [
    {
        id: 1,
        type: "Experience",
        year: "2024 - Present",
        title: "Frontend Developer",
        subtitle: "Freelance / Personal",
        desc: "Designing and developing modern, responsive web applications using React, Laravel, and Tailwind CSS. Focused on creating intuitive user experiences and clean, maintainable code structures.",
        color: "#4a90d9",
        coords: "40.7128° N"
    },
    {
        id: 2,
        type: "Education",
        year: "2023 - 2026",
        title: "Software Engineering",
        subtitle: "SMKN 1 Ciomas",
        desc: "Studying fundamental software architecture, databases, and modern web development. Building practical skills in system design and real-world problem solving through code.",
        color: "#d94a8c",
        coords: "34.0522° S"
    },
    {
        id: 3,
        type: "Experience",
        year: "2023",
        title: "Web Dev Journey",
        subtitle: "Self-Taught & School",
        desc: "Began deep-diving into HTML, CSS, JavaScript, and eventually modern frameworks. Started building small projects to understand state management and API integrations.",
        color: "#4ad991",
        coords: "51.5074° N"
    }
];

export default function Education() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
    const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section 
            ref={targetRef} 
            id="education" 
            style={{ 
                position: 'relative',
                height: '300vh',
                background: '#020203'
            }}
        >
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 120%, rgba(15, 20, 30, 0.6) 0%, #020203 70%)'
            }}>
                
                {/* Background Parallax Typography */}
                <motion.div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '-5%',
                    x: bgX,
                    fontSize: 'clamp(120px, 30vw, 450px)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 900,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.02)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 0,
                    letterSpacing: '-0.05em'
                }}>
                    JOURNEY
                </motion.div>

                {/* Progress Bar */}
                <div style={{
                    position: 'absolute',
                    bottom: '40px',
                    left: '5vw',
                    width: '90vw',
                    height: '2px',
                    background: 'rgba(255,255,255,0.05)',
                    zIndex: 20,
                    borderRadius: '2px'
                }}>
                    <motion.div style={{
                        height: '100%',
                        background: '#fff',
                        width: progressBarWidth,
                        boxShadow: '0 0 15px rgba(255,255,255,0.5)',
                        borderRadius: '2px'
                    }} />
                </div>

                {/* Header Section */}
                <div style={{
                    position: 'absolute',
                    top: '12%',
                    left: '5vw',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '40px', height: '2px', background: '#4a90d9' }} />
                        <span style={{ fontSize: '13px', color: '#4a90d9', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                            Interactive Timeline
                        </span>
                    </div>
                    <h2 style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif', 
                        fontWeight: 300, 
                        fontSize: 'clamp(32px, 5vw, 64px)', 
                        color: '#fff', 
                        letterSpacing: '-0.02em', 
                        margin: 0,
                        lineHeight: 1
                    }}>
                        <StyledHeading text="Experience" color="#fff" />
                    </h2>
                </div>

                {/* Cards Container */}
                <motion.div 
                    style={{ 
                        x, 
                        display: 'flex', 
                        gap: '8vw', 
                        paddingLeft: '15vw',
                        paddingRight: '30vw',
                        alignItems: 'center',
                        zIndex: 1,
                        perspective: '2000px' // For 3D Tilt
                    }}
                >
                    {/* Connecting Line */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '15vw',
                        width: '200vw',
                        height: '2px',
                        background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 90%, rgba(255,255,255,0) 100%)',
                        pointerEvents: 'none',
                        zIndex: -1,
                    }} />

                    {timelineData.map((item, index) => (
                        <TiltCard key={item.id} data={item} index={index + 1} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

function TiltCard({ data, index }) {
    const cardRef = useRef(null);
    const formattedIndex = index < 10 ? `0${index}` : index;
    
    // Physics variables for 3D Tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["12deg", "-12deg"]), { damping: 30, stiffness: 200 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-12deg", "12deg"]), { damping: 30, stiffness: 200 });

    const glareX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]), { damping: 30, stiffness: 200 });
    const glareY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]), { damping: 30, stiffness: 200 });

    function handleMouseMove(e) {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Normalized mouse position between -0.5 and 0.5
        const currentMouseX = (e.clientX - rect.left) / width - 0.5;
        const currentMouseY = (e.clientY - rect.top) / height - 0.5;
        
        mouseX.set(currentMouseX);
        mouseY.set(currentMouseY);
    }

    function handleMouseLeave() {
        // Return to center when mouse leaves
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
                perspective: '1500px', // Creates the 3D space for the card
                flexShrink: 0
            }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: 'relative',
                    width: 'clamp(340px, 45vw, 550px)',
                    height: 'clamp(480px, 65vh, 680px)',
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d', // Important for floating inner elements
                    background: 'rgba(15, 20, 25, 0.5)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    padding: '48px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 50px 100px -20px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                }}
            >
                {/* Dynamic Spotlight Glare */}
                <motion.div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: 'none',
                        borderRadius: '24px',
                        background: useMotionTemplate`
                            radial-gradient(
                                800px circle at ${glareX} ${glareY},
                                rgba(255,255,255,0.1),
                                transparent 40%
                            )
                        `,
                        opacity: 1,
                    }}
                />

                {/* Ambient Color Orb */}
                <motion.div
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: '150px',
                        height: '150px',
                        background: data.color,
                        filter: 'blur(80px)',
                        opacity: 0.2,
                        zIndex: 0,
                        translateZ: -50 // Pushes it backward in 3D space
                    }}
                />

                {/* Header Row (Pop out 3D effect) */}
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', transform: 'translateZ(40px)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <span style={{ 
                            fontSize: '11px', 
                            color: data.color, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.25em',
                            fontWeight: 700,
                            padding: '6px 14px',
                            background: `${data.color}15`,
                            borderRadius: '999px',
                            border: `1px solid ${data.color}40`,
                            width: 'max-content'
                        }}>
                            {data.type}
                        </span>
                        <span style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.5)',
                            fontWeight: 500,
                            letterSpacing: '0.05em'
                        }}>
                            {data.year}
                        </span>
                    </div>
                    
                    <div style={{
                        fontSize: '64px',
                        fontWeight: 200,
                        fontFamily: 'Plus Jakarta Sans, sans-serif',
                        color: '#fff',
                        lineHeight: 0.8,
                        letterSpacing: '-0.05em',
                        textShadow: '0 20px 40px rgba(0,0,0,0.5)'
                    }}>
                        {formattedIndex}
                    </div>
                </div>

                {/* Bottom Content (Pop out 3D effect) */}
                <div style={{ position: 'relative', zIndex: 1, transform: 'translateZ(60px)' }}>
                    <h4 style={{ 
                        fontSize: '15px', 
                        color: data.color, 
                        fontWeight: 500, 
                        marginBottom: '12px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase'
                    }}>
                        {data.subtitle}
                    </h4>
                    <h3 style={{ 
                        fontSize: 'clamp(32px, 4vw, 48px)', 
                        color: '#fff', 
                        fontWeight: 600, 
                        fontFamily: 'Plus Jakarta Sans, sans-serif', 
                        lineHeight: 1.1,
                        marginBottom: '24px',
                        letterSpacing: '-0.02em',
                        textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                        {data.title}
                    </h3>
                    <p style={{ 
                        fontSize: '16px', 
                        color: 'rgba(255,255,255,0.6)', 
                        lineHeight: 1.8, 
                        fontFamily: 'Inter, sans-serif',
                        margin: 0,
                        fontWeight: 300
                    }}>
                        {data.desc}
                    </p>
                </div>
                
                {/* Tech Metadata (Bottom corner) */}
                <div style={{ position: 'absolute', bottom: '24px', right: '24px', transform: 'translateZ(20px)', opacity: 0.3, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '2px', color: '#fff' }}>POS: {data.coords}</span>
                    <span style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '2px', color: '#fff' }}>STATUS: VERIFIED</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

