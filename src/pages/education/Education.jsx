import { useEffect, useRef, useState } from 'react';
import { StyledHeading } from '../../components/StyledWord';

function TimelineItem({ data, isLeft }) {
    const itemRef = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { setVis(e.isIntersecting); },
            { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
        );
        if (itemRef.current) obs.observe(itemRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div 
            ref={itemRef} 
            style={{ 
                display: 'flex', 
                flexDirection: isLeft ? 'row' : 'row-reverse',
                justifyContent: 'flex-start',
                width: '100%',
                marginBottom: '60px',
                opacity: vis ? 1 : 0.3,
                transform: vis ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative'
            }}
        >
            {/* The Dot */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                transform: 'translate(-50%, 0)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: vis ? '#4a90d9' : '#1e3a5f',
                border: '3px solid #0a0a0a',
                boxShadow: vis ? '0 0 15px rgba(74, 144, 217, 0.6)' : 'none',
                transition: 'all 0.5s ease',
                zIndex: 10,
            }} className="hide-mobile" />

            {/* Mobile Dot */}
            <div style={{
                position: 'absolute',
                left: '-28px',
                top: '0',
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: vis ? '#4a90d9' : '#1e3a5f',
                boxShadow: vis ? '0 0 15px rgba(74, 144, 217, 0.6)' : 'none',
                transition: 'all 0.5s ease',
                zIndex: 10,
            }} className="hide-desktop" />

            {/* The Content Card */}
            <div 
                className="timeline-card"
                style={{
                    width: 'calc(50% - 40px)',
                    marginLeft: isLeft ? '0' : 'auto',
                    marginRight: isLeft ? 'auto' : '0',
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '32px',
                    position: 'relative',
                    backdropFilter: 'blur(10px)',
                    transition: 'transform 0.4s ease, background 0.4s ease, border-color 0.4s ease',
                    cursor: 'default',
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.transform = isLeft ? 'translateX(-5px)' : 'translateX(5px)';
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(74, 144, 217, 0.3)';
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span style={{ 
                        fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: '#4a90d9', 
                        letterSpacing: '0.1em', padding: '6px 14px', background: 'rgba(74, 144, 217, 0.1)', 
                        borderRadius: '999px'
                    }}>
                        {data.year}
                    </span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {data.type}
                    </span>
                </div>
                
                <h3 style={{ fontSize: '22px', color: '#fff', fontWeight: 600, fontFamily: 'Plus Jakarta Sans, sans-serif', margin: '0 0 8px 0' }}>
                    {data.title}
                </h3>
                <h4 style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', fontWeight: 400, margin: '0 0 16px 0' }}>
                    {data.subtitle}
                </h4>
                
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0, fontFamily: 'Inter, sans-serif' }}>
                    {data.desc}
                </p>
            </div>
            
            {/* CSS override for mobile layout */}
            <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 768px) {
                    .timeline-card {
                        width: 100% !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                    }
                }
            `}} />
        </div>
    );
}

export default function Education() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    // Scroll progress specifically for the central line
    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress when section enters screen
            const start = windowHeight - 100;
            const end = -rect.height + windowHeight / 2;
            const current = rect.top;
            
            let progress = (start - current) / (start - end);
            progress = Math.max(0, Math.min(1, progress));
            setLineHeight(progress * 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const timelineData = [
        {
            type: "Experience",
            year: "2024 - Present",
            title: "Frontend Developer (Freelance / Personal)",
            subtitle: "Self-Employed",
            desc: "Designing and developing modern, responsive web applications using React, Laravel, and Tailwind CSS. Focused on creating intuitive user experiences and clean, maintainable code structures.",
            isLeft: true
        },
        {
            type: "Education",
            year: "2023 - 2026",
            title: "Software Engineering (RPL)",
            subtitle: "SMKN 1 Ciomas",
            desc: "Studying fundamental software architecture, databases, and modern web development. Building practical skills in system design and real-world problem solving through code.",
            isLeft: false
        },
        {
            type: "Experience",
            year: "2023",
            title: "Web Development Learning Journey",
            subtitle: "Self-Taught & School",
            desc: "Began deep-diving into HTML, CSS, JavaScript, and eventually modern frameworks. Started building small projects to understand state management and API integrations.",
            isLeft: true
        }
    ];

    return (
        <section id="education" ref={ref} style={{ background: '#0a0a0a', position: 'relative', zIndex: 1, padding: '120px 0' }}>
            
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 40px', width: '100%' }}>
                
                {/* Header */}
                <div style={{ 
                    opacity: vis ? 1 : 0, 
                    transform: vis ? 'translateY(0)' : 'translateY(40px)', 
                    transition: 'all 1s cubic-bezier(0.16,1,0.3,1)',
                    textAlign: 'center', 
                    marginBottom: '80px' 
                }}>
                    <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', letterSpacing: '-0.02em', margin: '0 0 16px 0' }}>
                        <StyledHeading text="Journey & Experience" color="#fff" />
                    </h2>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
                        A blend of formal education and practical experience that shapes my perspective as a developer. Simple, structured, and focused on growth.
                    </p>
                </div>

                {/* Timeline Container */}
                <div style={{ position: 'relative' }}>
                    
                    {/* The Center Line Background (Desktop) */}
                    <div className="hide-mobile" style={{
                        position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px',
                        background: 'rgba(255,255,255,0.05)', transform: 'translateX(-50%)', zIndex: 0
                    }}>
                        {/* The Glowing Progress Line */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%',
                            height: `${lineHeight}%`,
                            background: 'linear-gradient(180deg, transparent, #4a90d9, #fff)',
                            boxShadow: '0 0 15px #4a90d9',
                            transition: 'height 0.2s ease-out'
                        }} />
                    </div>

                    {/* The Left Line Background (Mobile) */}
                    <div className="hide-desktop" style={{
                        position: 'absolute', left: '-23px', top: 0, bottom: 0, width: '2px',
                        background: 'rgba(255,255,255,0.05)', zIndex: 0
                    }}>
                        {/* The Glowing Progress Line Mobile */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%',
                            height: `${lineHeight}%`,
                            background: 'linear-gradient(180deg, transparent, #4a90d9, #fff)',
                            boxShadow: '0 0 15px #4a90d9',
                            transition: 'height 0.2s ease-out'
                        }} />
                    </div>

                    {/* Timeline Items */}
                    <div style={{ position: 'relative', zIndex: 1, paddingBottom: '20px' }}>
                        {timelineData.map((data, idx) => (
                            <TimelineItem key={idx} data={data} isLeft={data.isLeft} />
                        ))}
                    </div>

                </div>
            </div>
            
        </section>
    );
}
