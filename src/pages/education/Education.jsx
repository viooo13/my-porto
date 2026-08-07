import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StyledHeading } from '../../components/StyledWord';

const timelineData = [
    {
        id: 1,
        type: "Experience",
        year: "2024 - Present",
        title: "Frontend Developer",
        subtitle: "Freelance / Personal",
        desc: "Designing and developing modern, responsive web applications using React, Laravel, and Tailwind CSS. Focused on creating intuitive user experiences and clean, maintainable code structures.",
        color: "#4a90d9"
    },
    {
        id: 2,
        type: "Education",
        year: "2023 - 2026",
        title: "Software Engineering",
        subtitle: "SMKN 1 Ciomas",
        desc: "Studying fundamental software architecture, databases, and modern web development. Building practical skills in system design and real-world problem solving through code.",
        color: "#d94a8c"
    },
    {
        id: 3,
        type: "Experience",
        year: "2023",
        title: "Web Dev Journey",
        subtitle: "Self-Taught & School",
        desc: "Began deep-diving into HTML, CSS, JavaScript, and eventually modern frameworks. Started building small projects to understand state management and API integrations.",
        color: "#4ad991"
    }
];

export default function Education() {
    const targetRef = useRef(null);

    // useScroll tracks the progress of scrolling through the targetRef section
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Translate horizontal scroll based on vertical scroll
    // The amount of -% depends on how many items we have and their widths
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

    // Parallax background text
    const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <section 
            ref={targetRef} 
            id="education" 
            style={{ 
                position: 'relative',
                height: '300vh', // Gives us plenty of scrolling space
                background: '#05050a'
            }}
        >
            {/* The Sticky Container */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                background: 'radial-gradient(circle at 50% 100%, rgba(15, 20, 30, 1) 0%, #05050a 70%)'
            }}>
                
                {/* Background Parallax Typography */}
                <motion.div style={{
                    position: 'absolute',
                    top: '15%',
                    left: '-10%',
                    x: bgX,
                    fontSize: 'clamp(100px, 25vw, 400px)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                    fontWeight: 900,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.03)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 0,
                    letterSpacing: '-0.05em'
                }}>
                    JOURNEY
                </motion.div>

                {/* Section Header sticky on the left side */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    zIndex: 10
                }}>
                    <h2 style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif', 
                        fontWeight: 300, 
                        fontSize: 'clamp(24px, 3vw, 40px)', 
                        color: '#fff', 
                        letterSpacing: '-0.02em', 
                        margin: '0 0 8px 0' 
                    }}>
                        <StyledHeading text="Experience" color="#fff" />
                    </h2>
                    <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Scroll to explore
                    </p>
                </div>

                {/* Horizontal Scroll Track */}
                <motion.div 
                    style={{ 
                        x, 
                        display: 'flex', 
                        gap: '6vw', 
                        paddingLeft: '10vw',
                        paddingRight: '30vw', // Extra padding at end so last item stops nicely
                        alignItems: 'center',
                        zIndex: 1
                    }}
                >
                    {timelineData.map((item, index) => (
                        <Card key={item.id} data={item} index={index + 1} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

// Separate component for the cards
function Card({ data, index }) {
    const formattedIndex = index < 10 ? `0${index}` : index;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            style={{
                position: 'relative',
                width: 'clamp(320px, 40vw, 500px)',
                height: 'clamp(400px, 60vh, 600px)',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '24px',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)'
            }}
        >
            {/* Ambient Glow */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-20%',
                width: '50%',
                height: '50%',
                background: data.color,
                filter: 'blur(100px)',
                opacity: 0.15,
                zIndex: 0,
                borderRadius: '50%'
            }} />

            {/* Top Row: Type & Year */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ 
                    fontSize: '12px', 
                    color: data.color, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.15em',
                    fontWeight: 600,
                    border: `1px solid ${data.color}40`,
                    padding: '6px 14px',
                    borderRadius: '999px',
                    background: `${data.color}10`
                }}>
                    {data.type}
                </span>
                <span style={{ 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 400
                }}>
                    {data.year}
                </span>
            </div>

            {/* Big Background Number */}
            <div style={{
                position: 'absolute',
                bottom: '-5%',
                right: '-5%',
                fontSize: '250px',
                fontWeight: 900,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                color: 'rgba(255,255,255,0.02)',
                lineHeight: 1,
                pointerEvents: 'none',
                zIndex: 0
            }}>
                {formattedIndex}
            </div>

            {/* Bottom Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h4 style={{ 
                    fontSize: '16px', 
                    color: 'rgba(255,255,255,0.6)', 
                    fontWeight: 400, 
                    marginBottom: '12px' 
                }}>
                    {data.subtitle}
                </h4>
                <h3 style={{ 
                    fontSize: 'clamp(28px, 3vw, 42px)', 
                    color: '#fff', 
                    fontWeight: 600, 
                    fontFamily: 'Plus Jakarta Sans, sans-serif', 
                    lineHeight: 1.1,
                    marginBottom: '24px',
                    letterSpacing: '-0.02em'
                }}>
                    {data.title}
                </h3>
                <p style={{ 
                    fontSize: '15px', 
                    color: 'rgba(255,255,255,0.5)', 
                    lineHeight: 1.8, 
                    fontFamily: 'Inter, sans-serif',
                    margin: 0
                }}>
                    {data.desc}
                </p>
            </div>
            
            {/* Subtle Line Left Edge */}
            <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '40%',
                background: data.color,
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
                opacity: 0.5
            }} />
        </motion.div>
    );
}

