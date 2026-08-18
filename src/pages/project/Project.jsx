import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import { StyledWord, StyledHeading } from '../../components/StyledWord';
import { AnimatedNumber } from '../../components/AnimatedNumber';

import { projectsData as projects } from '../../data/projectsData';

export default function Project() {
    const ref = useRef(null);
    const textRef = useRef(null);
    const navigate = useNavigate();
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);



    // Scroll listener tidak lagi digunakan untuk overlay, digantikan oleh CSS transition

    const a = (d = 0) => ({
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
    });

    return (
        <section id="projects" ref={ref} style={{ background: '#0a0a0a', position: 'relative', scrollMarginTop: 80, zIndex: 1 }}>
            
            {/* Overlay Screen */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
                <div ref={textRef} style={{ 
                    position: 'sticky', top: 0, height: '100vh', 
                    background: '#0a0a0a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: vis ? 0 : 1,
                    transition: 'opacity 1.5s ease-in-out',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(30,58,95,0.15) 0%, transparent 60%)', borderRadius: '50%', pointerEvents: 'none' }} />
                    <h2 className="ruthie-regular" style={{
                        fontSize: 'clamp(90px, 22vw, 380px)',
                        margin: 0, lineHeight: 1,
                        color: 'rgba(255,255,255,0.15)',
                        textShadow: '0 0 40px rgba(255,255,255,0.1)',
                        position: 'relative', zIndex: 1
                    }}>
                        Projects
                    </h2>
                </div>
            </div>

            {/* Content Container */}
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(100px, 15vh, 160px) 0' }}>
            {/* Ambient */}
            <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>

                <h2 style={{ ...a(50), fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.95, color: '#fff', marginBottom: 80, letterSpacing: '-0.02em' }}>
                    <StyledWord text="Projects" color="#fff" /><br /><StyledWord text="Portfolio" color="#1e3a5f" />
                </h2>

            {/* Parallax Sticky Stack Layout */}
                <div style={{ position: 'relative', marginTop: 100, paddingBottom: '20vh' }}>
                    {projects.map((p, i) => {
                        return (
                            <article key={p.id} style={{ 
                                position: 'sticky', 
                                top: `calc(12vh + ${i * 50}px)`,
                                height: `calc(78vh + ${(projects.length - 1 - i) * 50}px)`,
                                marginBottom: 0, 
                                zIndex: i,
                            }}>
                                <div style={{ ...a(100 + i * 100), width: '100%', height: '78vh' }}>
                                    <a href={`/project/${p.id}`} data-hover onClick={(e) => { e.preventDefault(); navigate(`/project/${p.id}`); }} style={{
                                        display: 'block', position: 'relative', width: '100%', height: '100%',
                                        borderRadius: 40, overflow: 'hidden',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderTop: '1px solid rgba(255,255,255,0.3)',
                                        boxShadow: '0 -15px 40px rgba(0,0,0,0.6)',
                                        background: '#050505',
                                    }}>
                                        {/* Image background */}
                                        <div style={{ position: 'absolute', inset: 0 }}>
                                            <img 
                                                src={[
                                                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2400&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2400&auto=format&fit=crop",
                                                    "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2400&auto=format&fit=crop"
                                                ][i]} 
                                                alt={p.title} 
                                                style={{
                                                    width: '100%', height: '100%', objectFit: 'cover',
                                                    opacity: 0.6,
                                                }}
                                            />
                                        </div>

                                        {/* Gradient overlay */}
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.8) 100%)',
                                        }} />

                                        {/* Content */}
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            padding: 'clamp(20px, 4vw, 40px)',
                                            display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                                        }}>
                                        {/* Top part: Number & Tags */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div style={{ 
                                                    fontFamily: 'var(--font-display)', fontWeight: 800, 
                                                    fontSize: 'clamp(60px, 8vw, 120px)', lineHeight: 0.8,
                                                }}>
                                                    <svg width="1.5em" height="0.8em" style={{ overflow: 'visible', display: 'block' }}>
                                                        <text 
                                                            x="0" 
                                                            y="0.76em" 
                                                            fill="transparent" 
                                                            stroke="rgba(255,255,255,0.3)" 
                                                            strokeWidth="2" 
                                                            strokeLinejoin="round"
                                                        >
                                                            0{i + 1}
                                                        </text>
                                                    </svg>
                                                </div>
                                                
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '60%' }}>
                                                    {p.tags.map(t => (
                                                        <span key={t} style={{
                                                            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                                                            padding: '10px 24px', border: '1px solid rgba(255,255,255,0.15)',
                                                            color: '#fff', borderRadius: 100,
                                                            background: 'rgba(0,0,0,0.5)',
                                                        }}>{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            {/* Bottom part: Title & Desc */}
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                                <h3 style={{
                                                    fontFamily: 'var(--font-display)', fontWeight: 700,
                                                    fontSize: 'clamp(48px, 6vw, 100px)', lineHeight: 0.9,
                                                    color: '#fff', letterSpacing: '-0.02em',
                                                    whiteSpace: 'pre-line',
                                                }}>
                                                    {p.title}
                                                </h3>
                                                
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' }}>
                                                    <p style={{
                                                        fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)',
                                                        maxWidth: 600, fontWeight: 300,
                                                    }}>
                                                        {p.desc}
                                                    </p>
                                                    
                                                    <div style={{ 
                                                        width: 80, height: 80, borderRadius: '50%',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        color: '#fff',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        flexShrink: 0
                                                    }}>
                                                        <HiArrowUpRight size={32} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* View all */}
                <div style={{ ...a(700), marginTop: 60, display: 'flex', justifyContent: 'center' }}>
                    <a href="#" className="btn-primary" data-hover at>
                        View All Projects <HiArrowUpRight style={{ marginLeft: 8 }} />
                    </a>
                </div>
            </div>
            </div>
        </section>
    );
}
