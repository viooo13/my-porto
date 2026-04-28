import { useEffect, useRef, useState } from 'react';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaFigma, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaLaravel } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiVite, SiWebpack, SiRedux, SiJest, SiMysql, SiPostman } from 'react-icons/si';
import { StyledWord } from '../../components/StyledWord';

// Animated counter hook
const useCounter = (target, duration = 1500, start = 0) => {
    const [count, setCount] = useState(start);
    const [isAnimating, setIsAnimating] = useState(false);
    const frameRef = useRef();

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);
            
            setCount(current);
            
            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setCount(target);
                setIsAnimating(false);
            }
        };
        
        frameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, []);

    return { count, startAnimation };
};

// Animated number component
const AnimatedNumber = ({ value, pad = 2, trigger }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const frameRef = useRef();
    
    useEffect(() => {
        if (trigger && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1200;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(value * easeOut);
                
                setDisplayValue(current);
                
                if (progress < 1) {
                    frameRef.current = requestAnimationFrame(animate);
                } else {
                    setDisplayValue(value);
                }
            };
            
            frameRef.current = requestAnimationFrame(animate);
        }
        
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [trigger, hasAnimated, value]);
    
    return <span>{String(displayValue).padStart(pad, '0')}</span>;
};

const a = (vis, d = 0) => ({
    opacity: vis ? 1 : 0,
    transform: vis ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
});

const glass = {
    padding: '48px 40px',
    background: 'rgba(255,255,255,0.01)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: 2,
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
};

const cardHover = (e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
    e.currentTarget.style.borderColor = 'rgba(30,58,95,0.3)';
    e.currentTarget.style.transform = 'translateY(-6px)';
    e.currentTarget.style.boxShadow = '0 20px 80px rgba(0,0,0,0.5), 0 0 40px rgba(30,58,95,0.1)';
};

const cardLeave = (e) => {
    e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
};

export default function Skills() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    const [hovIcon, setHovIcon] = useState(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.05 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const primary = [
        { icon: FaReact, name: 'React', desc: 'Component Architecture' },
        { icon: SiNextdotjs, name: 'Next.js', desc: 'SSR & Static Sites' },
        { icon: FaLaravel, name: 'Laravel', desc: 'MVC Ecosystem' },
        { icon: SiTypescript, name: 'TypeScript', desc: 'Type Safety' },
        { icon: FaJs, name: 'JavaScript', desc: 'Core ES6+' },
        { icon: SiTailwindcss, name: 'Tailwind', desc: 'Utility Design' },
        { icon: FaPhp, name: 'PHP', desc: 'Backend Logic' },
        { icon: SiMysql, name: 'MySQL', desc: 'Relational Data' },
    ];

    const tools = [
        { icon: FaFigma, name: 'Figma' }, { icon: FaGitAlt, name: 'Git' }, 
        { icon: SiPostman, name: 'Postman' }, { icon: SiVite, name: 'Vite' },
        { icon: FaDocker, name: 'Docker' }, { icon: SiJest, name: 'Jest' }
    ];

    const soft = ['Logic Thinking', 'Creative Strategy', 'Problem Solving', 'Team Lead', 'Adaptive Learning'];

    return (
        <section id="skills" ref={ref} style={{ background: '#0a0a0a', padding: 'clamp(100px, 15vh, 160px) 0', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
            {/* Ambient Background Glows */}
            <div style={{ position: 'absolute', top: '10%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
                {/* Section Header */}
                <div style={{ ...a(vis, 0), display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>02</span>
                    <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Capabilities</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end marginBottom-80" style={{ ...a(vis, 50), marginBottom: 80 }}>
                    <div className="lg:col-span-7">
                        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.95, color: '#fff', letterSpacing: '-0.02em' }}>
                            <StyledWord text="Tech Stack &" color="#fff" /><br /><StyledWord text="Expertise" color="#1e3a5f" />
                        </h2>
                    </div>
                    <div className="lg:col-span-5">
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300 }}>
                            A curated selection of technologies I use to bridge the gap between complex logic and immersive user experiences.
                        </p>
                    </div>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Primary Stack (Large) */}
                    <div className="md:col-span-8" data-hover style={{ ...a(vis, 100), ...glass }} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
                            <div>
                                <h3 style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700, marginBottom: 8 }}>Primary Stack</h3>
                                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.02em' }}>Technologies I use daily to build production apps.</p>
                            </div>
                            <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(30,58,95,0.5)' }}>[ <AnimatedNumber value={1} pad={2} trigger={vis} /> ]</span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-12 gap-x-8">
                            {primary.map((s, i) => (
                                <div key={s.name} 
                                    onMouseEnter={() => setHovIcon(i)}
                                    onMouseLeave={() => setHovIcon(null)}
                                    style={{ display: 'flex', flexDirection: 'column', gap: 12, transition: 'all 0.4s' }}
                                >
                                    <div style={{
                                        width: 52, height: 52, borderRadius: 14,
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        background: hovIcon === i ? 'rgba(30,58,95,0.15)' : 'rgba(255,255,255,0.02)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                                        transform: hovIcon === i ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
                                        borderColor: hovIcon === i ? 'rgba(30,58,95,0.4)' : 'rgba(255,255,255,0.06)',
                                    }}>
                                        <s.icon size={22} color={hovIcon === i ? '#fff' : 'rgba(255,255,255,0.4)'} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: 12, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{s.name}</p>
                                        <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats / Experience (Tall) */}
                    <div className="md:col-span-4" data-hover style={{ ...a(vis, 200), ...glass, background: 'rgba(30,58,95,0.03)' }} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 48 }}>
                            <h3 style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>Experience</h3>
                            <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(30,58,95,0.5)' }}>[ <AnimatedNumber value={2} pad={2} trigger={vis} /> ]</span>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                            <div onMouseEnter={e => e.currentTarget.querySelector('span').style.color = '#1e3a5f'} onMouseLeave={e => e.currentTarget.querySelector('span').style.color = '#fff'}>
                                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: 12 }}>Years Active</p>
                                <span style={{ fontSize: 80, fontWeight: 800, color: '#fff', lineHeight: 1, transition: 'color 0.4s' }}>2+</span>
                                <div style={{ height: 1, width: 40, background: '#1e3a5f', marginTop: 16 }} />
                            </div>
                            <div onMouseEnter={e => e.currentTarget.querySelector('span').style.color = '#1e3a5f'} onMouseLeave={e => e.currentTarget.querySelector('span').style.color = '#fff'}>
                                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: 12 }}>Projects Done</p>
                                <span style={{ fontSize: 80, fontWeight: 800, color: '#fff', lineHeight: 1, transition: 'color 0.4s' }}>15+</span>
                                <div style={{ height: 1, width: 40, background: '#1e3a5f', marginTop: 16 }} />
                            </div>
                        </div>
                        
                        <div style={{ position: 'absolute', bottom: -20, right: -20, width: 140, height: 140, background: 'rgba(30,58,95,0.05)', borderRadius: '50%', filter: 'blur(40px)' }} />
                    </div>

                    {/* Tools (Medium) */}
                    <div className="md:col-span-7" data-hover style={{ ...a(vis, 300), ...glass }} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                            <h3 style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>Toolbox</h3>
                            <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(30,58,95,0.5)' }}>[ <AnimatedNumber value={3} pad={2} trigger={vis} /> ]</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                            {tools.map(t => (
                                <div key={t.name} style={{
                                    padding: '12px 20px', border: '1px solid rgba(255,255,255,0.05)',
                                    background: 'rgba(255,255,255,0.01)', borderRadius: 4,
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    transition: 'all 0.3s'
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(30,58,95,0.5)'; e.currentTarget.style.background = 'rgba(30,58,95,0.05)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.01)'; }}
                                >
                                    <t.icon size={16} color="rgba(255,255,255,0.3)" />
                                    <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Soft Skills (Small) */}
                    <div className="md:col-span-5" data-hover style={{ ...a(vis, 400), ...glass }} onMouseEnter={cardHover} onMouseLeave={cardLeave}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
                            <h3 style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', fontWeight: 700 }}>Human Side</h3>
                            <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(30,58,95,0.5)' }}>[ <AnimatedNumber value={4} pad={2} trigger={vis} /> ]</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {soft.map((s, i) => (
                                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16, transition: 'all 0.3s' }}
                                    onMouseEnter={e => { e.currentTarget.querySelector('div').style.width = '24px'; e.currentTarget.querySelector('span').style.color = '#fff'; }}
                                    onMouseLeave={e => { e.currentTarget.querySelector('div').style.width = '12px'; e.currentTarget.querySelector('span').style.color = 'rgba(255,255,255,0.4)'; }}
                                >
                                    <div style={{ width: 12, height: 1, background: '#1e3a5f', transition: 'width 0.4s' }} />
                                    <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
