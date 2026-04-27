import { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaImage } from 'react-icons/fa';

function HeroButton({ children, href, className }) {
    return (
        <a
            href={href}
            className={`btn-hero ${className || ''}`}
        >
            <div className="btn-text">
                <span className="btn-text-inner">
                    {children}
                    <span className="btn-text-alt">{children}</span>
                </span>
            </div>
            <span className="btn-arrow">↗</span>
        </a>
    );
}

export default function Hero() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [scroll, setScroll] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [showCvModal, setShowCvModal] = useState(false);
    useEffect(() => {
        setLoaded(true);
        const onScroll = () => setScroll(window.scrollY);
        const onMouse = (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            setMouse({
                x: (clientX - centerX) / centerX * 40,
                y: (clientY - centerY) / centerY * 40,
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('mousemove', onMouse);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('mousemove', onMouse);
        };
    }, []);

    return (
        <>
            <section id="hero" style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#0a0a0a',
            overflow: 'hidden',
            width: '100%',
            paddingTop: 'clamp(80px, 15vh, 140px)'
        }}>

            {/* ── Background Master visual ── */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                {/* Aurora */}
                <div style={{
                    position: 'absolute', top: '20%', left: '20%',
                    width: '70vw', height: '70vw',
                    background: 'radial-gradient(circle, rgba(30,58,95,0.15) 0%, transparent 70%)',
                    transform: `translate3d(${mouse.x * 1.5}px, ${mouse.y * 1.5}px, 0)`,
                    transition: 'transform 1.5s var(--ease)',
                    filter: 'blur(100px)',
                }} />

                {/* Kinetic Grid */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    opacity: 0.5,
                }} />
            </div>

            {/* ── Main Layout Container ── */}
            <div style={{
                maxWidth: '100%',
                margin: '0 auto',
                padding: '0 6vw',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 10
            }}>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-center flex-1 pt-12 pb-12 lg:pt-24 lg:pb-24 gap-y-12">

                    {/* Left Side: Typography (Col 1-8) */}
                    <div className="lg:col-span-8 flex flex-col justify-center"
                        style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(40px)', transition: 'all 1s var(--ease) 0.2s' }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                            <div style={{ height: 1, width: 30, background: '#1e3a5f' }} />
                            <p style={{
                                fontFamily: 'Inter, sans-serif', fontSize: 'clamp(9px, 1vw, 11px)', fontWeight: 600,
                                letterSpacing: 'clamp(0.2em, 0.6vw, 0.6em)', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.3)',
                            }}>
                                CREATIVE FRONTEND DEVELOPER
                            </p>
                        </div>

                        <h1 style={{
                            fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800,
                            fontSize: 'clamp(40px, 14vw, 190px)',
                            lineHeight: 0.75, letterSpacing: '-0.06em',
                            color: '#fff', marginBottom: 56,
                            textTransform: 'uppercase',
                        }}>
                            <div style={{ overflow: 'hidden' }}>
                                <span style={{ display: 'inline-block', animation: 'slideUp 1s var(--ease) 0.1s both', color: '#ffff' }}>VIO</span>
                            </div>
                            <div style={{ overflow: 'hidden', marginTop: 10 }}>
                                <span style={{
                                    display: 'inline-block',
                                    animation: 'slideUp 1s var(--ease) 0.2s both',
                                    color: '#1e3a5f'
                                }}>
                                    ADYTIA
                                </span>
                            </div>
                        </h1>

                        <div className="max-w-[480px]" style={{ width: '100%' }}>
                            <p style={{
                                fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 1.2vw, 18px)', fontWeight: 300,
                                color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, marginBottom: 'clamp(24px, 4vh, 48px)'
                            }}>
                                Building <span style={{ color: '#fff', fontWeight: 500 }}>immersive digital solutions</span> where precision code meets premium editorial design.
                            </p>

                            <div style={{ display: 'flex', gap: 'clamp(16px, 2vw, 24px)', marginBottom: 'clamp(24px, 4vh, 56px)', flexWrap: 'wrap' }}>
                                {[
                                    { name: 'GITHUB', icon: FaGithub, link: '#' },
                                    { name: 'LINKEDIN', icon: FaLinkedin, link: '#' },
                                    { name: 'VIEW CV', icon: FaImage, onClick: () => setShowCvModal(true) }
                                ].map((item, i) => (
                                    <a key={i} href={item.link || '#'} {...(item.download ? { download: true } : {})} {...(item.target ? { target: item.target } : {})} style={{
                                        display: 'flex', alignItems: 'center', gap: 10,
                                        textDecoration: 'none', color: 'rgba(255,255,255,0.3)',
                                        fontSize: 10, letterSpacing: '0.15em', fontWeight: 600,
                                        transition: 'all 0.4s',
                                        cursor: 'pointer'
                                    }}
                                        onClick={item.onClick}
                                        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                                        <item.icon size={16} style={{ color: '#1e3a5f' }} />
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="flex items-center gap-10" style={{ flexWrap: 'wrap', gap: 'clamp(12px, 2vw, 40px)' }}>
                                <HeroButton href="#projects">VIEW PROJECTS</HeroButton>
                                <a href="#about" style={{
                                    fontSize: 'clamp(8px, 0.8vw, 9px)', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                                    display: 'flex', alignItems: 'center', gap: 12, transition: 'all 0.4s'
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                                    <div style={{ width: 12, height: 1, background: '#1e3a5f' }} />
                                    DISCOVER
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Visual (Col 9-12) */}
                    <div className="lg:col-span-4 flex justify-center lg:justify-end"
                        style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'scale(0.95)', transition: 'all 1s var(--ease) 0.4s' }}>

                        <div style={{ position: 'relative', width: '100%', maxWidth: 'clamp(280px, 40vw, 420px)', margin: '0 auto' }}>

                            {/* Animated Frame */}
                            <div style={{
                                position: 'absolute', inset: -15,
                                border: '1px solid rgba(30,58,95,0.3)',
                                transform: `translate3d(${mouse.x * 0.15}px, ${mouse.y * 0.15}px, 0)`,
                                transition: 'transform 1.5s var(--ease)',
                                pointerEvents: 'none'
                            }} />

                            <div style={{
                                position: 'relative',
                                width: '100%', aspectRatio: '4/5',
                                overflow: 'hidden',
                                background: '#111',
                                transform: `translate3d(${mouse.x * 0.1}px, ${mouse.y * 0.1}px, 0)`,
                                transition: 'transform 1.2s var(--ease)',
                                borderRadius: '4px',
                            }}>
                                {/* Reveal Mask */}
                                <div style={{
                                    position: 'absolute', inset: -1, background: '#0a0a0a', zIndex: 10,
                                    animation: 'clipLeft 1.8s var(--ease) 0.5s forwards'
                                }} />

                                <img
                                    src="my-photo.png"
                                    alt="Vio Adytia Portrait"
                                    style={{
                                        width: '100%', height: '100%', objectFit: 'cover',
                                        filter: 'grayscale(0.1) contrast(1.1)',
                                        transform: `scale(1.2) translate3d(${mouse.x * -0.05}px, ${mouse.y * -0.05}px, 0)`,
                                        animation: 'scaleIn 1.8s var(--ease) 0.5s forwards',
                                        transition: 'transform 1.5s var(--ease)',
                                    }}
                                />
                            </div>

                            {/* Status Chip */}
                            <div style={{
                                position: 'absolute', top: '15%', right: 'clamp(0%, -2vw, -10%)',
                                background: '#1e3a5f',
                                padding: '10px 18px',
                                transform: `translate3d(${mouse.x * -0.1}px, ${mouse.y * -0.1}px, 0)`,
                                transition: 'transform 1.8s var(--ease)',
                                zIndex: 15,
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
                            }}>
                                <span style={{ fontSize: 8, color: '#fff', letterSpacing: '0.2em', fontWeight: 800 }}>V.A / 2026</span>
                            </div>

                            {/* Location tag */}
                            <div style={{
                                position: 'absolute', bottom: -32, right: 0,
                                display: 'flex', alignItems: 'center', gap: 12,
                                transform: `translate3d(${mouse.x * 0.1}px, ${mouse.y * 0.1}px, 0)`,
                                transition: 'transform 1s var(--ease)',
                            }}>
                                <div style={{ width: 5, height: 5, background: '#1e3a5f', borderRadius: '50%' }} />
                                <span style={{ fontSize: 8, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)' }}>BOGOR, IDN</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Editorial Footer */}
                <div className="flex flex-col sm:flex-row" style={{
                    justifyContent: 'space-between', alignItems: 'flex-end',
                    padding: 'clamp(24px, 4vh, 48px) 0', borderTop: '1px solid rgba(255,255,255,0.03)',
                    opacity: loaded ? 1 : 0, transition: 'all 1s var(--ease) 0.8s',
                    gap: 'clamp(16px, 3vh, 32px)'
                }}>
                    <div className="flex flex-col sm:flex-row" style={{ display: 'flex', gap: 'clamp(24px, 5vw, 60px)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.4em', marginBottom: 6 }}>TECH STACK</span>
                            <span style={{ fontSize: 9, color: '#fff', letterSpacing: '0.15em' }}>REACT / NEXT.JS / THREE.JS</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.4em', marginBottom: 6 }}>AVAILABILITY</span>
                            <span style={{ fontSize: 9, color: '#fff', letterSpacing: '0.15em' }}>OPEN FOR PROJECTS</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.4em', marginBottom: 6 }}>SCROLL</span>
                        <div style={{ height: 40, width: 1, background: 'linear-gradient(to bottom, #1e3a5f, transparent)', margin: '8px 0 0 auto' }} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes clipLeft {
                    from { clip-path: inset(0 0 0 0); }
                    to { clip-path: inset(0 100% 0 0); }
                }
                @keyframes blobMorph {
                    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                    50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
                    75% { border-radius: 60% 40% 60% 30% / 70% 30% 50% 60%; }
                }
                @keyframes scaleIn {
                    from { transform: scale(1.2); }
                    to { transform: scale(1.1); }
                }
            `}</style>
        </section>

        {/* CV Lightbox - Outside section to overlay navbar */}
        {showCvModal && (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 99999,
                background: 'rgba(0,0,0,0.92)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                padding: 'clamp(16px, 4vw, 40px)'
            }} onClick={() => setShowCvModal(false)}>
                {/* Close button */}
                <button type="button" onClick={(e) => { e.stopPropagation(); setShowCvModal(false); }}
                    style={{
                        position: 'absolute', top: 20, right: 20, zIndex: 10,
                        background: 'rgba(255,255,255,0.1)', border: 'none',
                        color: '#fff', fontSize: 20, width: 40, height: 40,
                        borderRadius: '50%', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(10px)',
                        transition: 'background 0.3s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    ✕
                </button>

                {/* CV Image */}
                <div onClick={(e) => e.stopPropagation()} style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '100%', overflow: 'auto'
                }}>
                    <img src="/Vio_CV.png" style={{
                        maxWidth: '100%',
                        maxHeight: 'clamp(400px, 70vh, 800px)',
                        width: 'clamp(300px, 90vw, 700px)',
                        objectFit: 'contain',
                        borderRadius: 8,
                        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                    }} />
                </div>

                {/* Download button */}
                <a href="/Vio_CV.png" download
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        marginTop: 20,
                        display: 'flex', alignItems: 'center', gap: 10,
                        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)',
                        color: '#fff', textDecoration: 'none',
                        padding: '12px 28px', borderRadius: 999,
                        fontSize: 12, fontWeight: 700,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 20px rgba(30, 58, 95, 0.4)'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(30, 58, 95, 0.6)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(30, 58, 95, 0.4)'; }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CV
                </a>
            </div>
        )}
    </>
    );
}
