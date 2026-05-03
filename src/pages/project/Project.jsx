import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpRight } from 'react-icons/hi2';
import { StyledWord, StyledHeading } from '../../components/StyledWord';
import { AnimatedNumber } from '../../components/AnimatedNumber';

import { projectsData as projects } from '../../data/projectsData';

export default function Project() {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [vis, setVis] = useState(false);
    const [hov, setHov] = useState(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.03 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const a = (d = 0) => ({
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
    });

    return (
        <section id="projects" ref={ref} style={{ background: '#0a0a0a', padding: 'clamp(100px, 15vh, 160px) 0', position: 'relative', overflow: 'hidden', scrollMarginTop: 80, zIndex: 1 }}>
            {/* Ambient */}
            <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
                {/* Label */}
                <div style={{ ...a(0), display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}><AnimatedNumber value={3} pad={2} trigger={vis} /></span>
                    <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Selected Work</span>
                </div>

                <h2 style={{ ...a(50), fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.95, color: '#fff', marginBottom: 80, letterSpacing: '-0.02em' }}>
                    <StyledWord text="Projects" color="#fff" /><br /><StyledWord text="Portfolio" color="#1e3a5f" />
                </h2>

                {/* Project list */}
                {projects.map((p, i) => (
                    <article key={p.id} style={{
                        ...a(100 + i * 100),
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        padding: '56px 0',
                        transition: 'border-color 0.4s cubic-bezier(0.16,1,0.3,1)',
                    }}
                        onMouseEnter={() => setHov(i)}
                        onMouseLeave={() => setHov(null)}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16" style={{ alignItems: 'center' }}>
                            {/* Text — switches order on odd */}
                            <div className={`lg:col-span-5 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                {/* Number + line */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                                    <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 18, color: hov === i ? '#1e3a5f' : 'rgba(255,255,255,0.2)', transition: 'color 0.5s' }}><AnimatedNumber value={parseInt(p.id)} pad={2} trigger={vis} duration={1800} /></span>
                                    <div style={{
                                        flex: 1, height: 1,
                                        background: hov === i ? 'rgba(30,58,95,0.3)' : 'rgba(255,255,255,0.05)',
                                        transition: 'background 0.5s',
                                        transformOrigin: 'left',
                                        transform: hov === i ? 'scaleX(1)' : 'scaleX(0.6)',
                                        transitionProperty: 'background, transform',
                                        transitionDuration: '0.5s',
                                    }} />
                                </div>

                                {/* Title */}
                                <h3 style={{
                                    fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400,
                                    fontSize: 'clamp(28px, 3.5vw, 52px)', lineHeight: 1,
                                    color: '#fff', marginBottom: 16, letterSpacing: '-0.02em',
                                    whiteSpace: 'pre-line',
                                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                                    transform: hov === i ? 'translateX(8px)' : 'translateX(0)',
                                    textTransform: 'uppercase',
                                }}>
                                    <StyledHeading text={p.title} color="#fff" />
                                </h3>

                                <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: 20, fontWeight: 300 }}>{p.desc}</p>

                                {/* Tags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                                    {p.tags.map(t => (
                                        <span key={t} style={{
                                            fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
                                            padding: '4px 12px', border: '1px solid rgba(255,255,255,0.08)',
                                            color: 'rgba(255,255,255,0.35)', transition: 'border-color 0.3s, color 0.3s',
                                        }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.color = '#fff'; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
                                        >{t}</span>
                                    ))}
                                </div>

                                {/* Details Button */}
                                <div style={{ display: 'flex', gap: 32, marginTop: 20 }}>
                                    <button 
                                        onClick={() => navigate(`/project/${p.id}`)}
                                        data-hover
                                        style={{ 
                                            fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600, fontSize: 13, 
                                            color: '#0a0a0a', background: '#fff', padding: '12px 28px',
                                            borderRadius: '999px',
                                            border: 'none', cursor: 'none',
                                            display: 'flex', alignItems: 'center', gap: 8,
                                            transition: 'all 0.3s',
                                        }}>
                                        View Details <HiArrowUpRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Image */}
                            <div className={`lg:col-span-7 ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                <a href="#" data-hover style={{
                                    display: 'block', position: 'relative', aspectRatio: '16/10', overflow: 'hidden',
                                    border: '1px solid rgba(255,255,255,0.05)', background: '#111',
                                }}>
                                    {/* Mask reveal overlay */}
                                    <div style={{
                                        position: 'absolute', inset: 0, background: '#0a0a0a', zIndex: 10,
                                        transform: vis ? 'scaleX(0)' : 'scaleX(1)',
                                        transformOrigin: i % 2 === 0 ? 'right' : 'left',
                                        transition: 'transform 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.2s',
                                    }} />
                                    {/* Placeholder text */}
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{
                                            fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800,
                                            fontSize: 'clamp(24px, 4vw, 48px)',
                                            color: hov === i ? 'rgba(30,58,95,0.15)' : 'rgba(255,255,255,0.04)',
                                            transition: 'color 0.6s, transform 0.6s',
                                            transform: hov === i ? 'scale(1.05)' : 'scale(1)',
                                        }}>{p.title.replace('\n', ' ')}</span>
                                    </div>

                                    {/* Hover overlay */}
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: hov === i ? 'rgba(30,58,95,0.08)' : 'transparent',
                                        transition: 'background 0.5s',
                                    }} />

                                    {/* Arrow circle */}
                                    <div style={{
                                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        opacity: hov === i ? 1 : 0, transition: 'opacity 0.4s',
                                    }}>
                                        <div style={{
                                            width: 64, height: 64, borderRadius: '50%', background: '#fff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            transform: hov === i ? 'scale(1) rotate(0)' : 'scale(0) rotate(-90deg)',
                                            transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                                            boxShadow: '0 0 30px rgba(30,58,95,0.3)',
                                        }}>
                                            <HiArrowUpRight size={22} color="#0a0a0a" />
                                        </div>
                                    </div>

                                    {/* Bottom accent */}
                                    <div style={{
                                        position: 'absolute', bottom: 0, left: 0, height: 2,
                                        background: 'linear-gradient(90deg, #1e3a5f, #2a5a8f)',
                                        width: hov === i ? '100%' : '0%',
                                        transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
                                    }} />
                                </a>
                            </div>
                        </div>
                    </article>
                ))}

                {/* Last border */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />

                {/* View all */}
                <div style={{ ...a(700), marginTop: 60, display: 'flex', justifyContent: 'center' }}>
                    <a href="#" className="btn-primary" data-hover at>
                        View All Projects <HiArrowUpRight style={{ marginLeft: 8 }} />
                    </a>
                </div>
            </div>
        </section>
    );
}
