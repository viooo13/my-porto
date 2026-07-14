import { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaImage } from 'react-icons/fa';
import { StyledWord } from '../../components/StyledWord';

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
    const [loaded, setLoaded] = useState(false);
    const [showCvModal, setShowCvModal] = useState(false);
    const [isPhotoHovered, setIsPhotoHovered] = useState(false);
    
    useEffect(() => {
        setLoaded(true);
        let isHovering = false;
        
        const onMouse = (e) => {
            const { clientX } = e;
            const centerX = window.innerWidth / 2;
            const xPercentage = ((clientX - centerX) / centerX) * 40;
            const currentHover = Math.abs(xPercentage) < 8;
            
            // Only trigger re-render if the state actually changes!
            if (currentHover !== isHovering) {
                isHovering = currentHover;
                setIsPhotoHovered(currentHover);
            }
        };
        
        window.addEventListener('mousemove', onMouse, { passive: true });
        return () => window.removeEventListener('mousemove', onMouse);
    }, []);

    return (
        <>
            <section id="hero" style={{
                position: 'sticky',
                top: 0,
                height: '100dvh',
                minHeight: '600px',
                display: 'flex',
                flexDirection: 'column',
                background: '#030305',
                overflow: 'hidden',
                width: '100%',
                zIndex: 0,
            }}>

                {/* ── Background Elements ── */}
                
                {/* Dynamic Mouse Glow */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    width: '80vw', height: '80vw',
                    background: 'radial-gradient(circle, rgba(74, 144, 217, 0.15) 0%, transparent 60%)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    filter: 'blur(80px)',
                    zIndex: 0, pointerEvents: 'none'
                }} />

                {/* Subtle Grid */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '100px 100px',
                    transform: 'translate3d(0, 0, 0)',
                }} />

                {/* Massive Typography Background */}
                <div style={{
                    position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', pointerEvents: 'none',
                    width: '100vw', overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex', whiteSpace: 'nowrap', width: 'max-content',
                    }}>
                        <div className="marquee-left" style={{ display: 'flex', width: 'max-content' }}>
                            <div style={{ display: 'flex', gap: '8vw', paddingRight: '8vw', flexShrink: 0 }}>
                                {[...Array(4)].map((_, i) => (
                                    <h1 key={i} style={{
                                        fontFamily: '"Inter Display", "Inter", sans-serif', fontWeight: 900,
                                        fontSize: 'clamp(100px, 22vw, 400px)', lineHeight: 0.8,
                                        color: 'rgba(255, 255, 255, 0.05)',
                                        margin: 0, letterSpacing: '-0.02em'
                                    }}>FRONTEND</h1>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '8vw', paddingRight: '8vw', flexShrink: 0 }}>
                                {[...Array(4)].map((_, i) => (
                                    <h1 key={i} style={{
                                        fontFamily: '"Inter Display", "Inter", sans-serif', fontWeight: 900,
                                        fontSize: 'clamp(100px, 22vw, 400px)', lineHeight: 0.8,
                                        color: 'rgba(255, 255, 255, 0.05)',
                                        margin: 0, letterSpacing: '-0.02em'
                                    }}>FRONTEND</h1>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div style={{
                        display: 'flex', whiteSpace: 'nowrap', width: 'max-content',
                    }}>
                        <div className="marquee-right" style={{ display: 'flex', width: 'max-content' }}>
                            <div style={{ display: 'flex', gap: '8vw', paddingRight: '8vw', flexShrink: 0 }}>
                                {[...Array(4)].map((_, i) => (
                                    <h1 key={i} style={{
                                        fontFamily: '"Inter Display", "Inter", sans-serif', fontWeight: 900,
                                        fontSize: 'clamp(100px, 22vw, 400px)', lineHeight: 0.8,
                                        color: 'rgba(74, 144, 217, 0.07)',
                                        margin: 0, letterSpacing: '-0.02em'
                                    }}>DEVELOPER</h1>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '8vw', paddingRight: '8vw', flexShrink: 0 }}>
                                {[...Array(4)].map((_, i) => (
                                    <h1 key={i} style={{
                                        fontFamily: '"Inter Display", "Inter", sans-serif', fontWeight: 900,
                                        fontSize: 'clamp(100px, 22vw, 400px)', lineHeight: 0.8,
                                        color: 'rgba(74, 144, 217, 0.07)',
                                        margin: 0, letterSpacing: '-0.02em'
                                    }}>DEVELOPER</h1>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Center Character (The Illustration) ── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 2, height: '100dvh', width: '100%',
                    display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                    pointerEvents: 'none'
                }}>
                    <img src="/my-photo-bordered.png" alt="Vio Adytia Illustration" width="1792" height="2394" style={{
                        height: '195dvh', width: 'auto', objectFit: 'contain',
                        filter: `${isPhotoHovered ? 'grayscale(0%)' : 'grayscale(100%)'} drop-shadow(0 0 40px rgba(74, 144, 217, 0.25))`,
                        pointerEvents: 'none',
                        transform: 'translateY(97dvh) translateZ(0)',
                        willChange: 'filter, transform',
                        transition: 'filter 0.5s ease',
                    }} 
                    />
                </div>

                {/* ── Foreground UI Layer ── */}
                <div style={{
                    position: 'relative', zIndex: 3, width: '100%', height: '100%',
                    padding: 'clamp(80px, 12vh, 120px) 6vw clamp(40px, 6vh, 60px) 6vw',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    pointerEvents: 'none'
                }}>
                    
                    {/* Top Header */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                        opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
                        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
                    }}>
                        <div style={{ pointerEvents: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                                <div style={{ height: 1, width: 40, background: '#4a90d9' }} />
                                <p style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
                                    letterSpacing: '0.4em', color: '#4a90d9', margin: 0
                                }}>PORTFOLIO 2026</p>
                            </div>
                            <h2 style={{
                                fontFamily: '"Inter Display", "Inter", sans-serif', fontWeight: 800,
                                fontSize: 'clamp(40px, 6vw, 80px)', color: '#fff', margin: 0,
                                lineHeight: 1, letterSpacing: '-0.02em',
                                display: 'flex', flexWrap: 'wrap', gap: '16px'
                            }}>
                                <div style={{ overflow: 'hidden' }}><StyledWord text="VIO" color="#fff" animDelay={0.1} /></div>
                                <div style={{ overflow: 'hidden' }}><StyledWord text="ADYTIA" color="#4a90d9" animDelay={0.2} /></div>
                            </h2>
                        </div>

                        <div className="hide-mobile" style={{ textAlign: 'right', pointerEvents: 'auto', marginTop: 10 }}>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.2em', margin: '0 0 8px 0' }}>CURRENTLY BASED IN</p>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#fff', fontWeight: 600, letterSpacing: '0.2em', margin: 0 }}>BOGOR, IDN</p>
                        </div>
                    </div>

                    {/* Bottom Details */}
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                        opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(-20px)',
                        transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
                    }}>
                        
                        {/* Info Text */}
                        <div style={{
                            maxWidth: '480px',
                            pointerEvents: 'auto'
                        }}>
                            <p style={{
                                fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 300,
                                color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, margin: '0 0 32px 0'
                            }}>
                                Building <span style={{ color: '#fff', fontWeight: 500 }}>immersive digital solutions</span> where precision code meets premium editorial design. Exploring the limits of modern web technologies to create unforgettable experiences.
                            </p>
                            
                           
                        </div>

                        {/* Social Links */}
                        <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 16, pointerEvents: 'auto' }}>
                            {[
                                { name: 'Github', icon: FaGithub, link: '#' },
                                { name: 'LinkedIn', icon: FaLinkedin, link: '#' },
                            ].map((item, i) => (
                                <a key={i} href={item.link} aria-label={item.name} style={{
                                    width: 50, height: 50, borderRadius: '50%',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'rgba(255,255,255,0.5)', textDecoration: 'none',
                                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                    background: 'rgba(255,255,255,0.02)',
                                    backdropFilter: 'blur(10px)'
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.background = '#4a90d9';
                                    e.currentTarget.style.borderColor = '#4a90d9';
                                    e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                                }}>
                                    <item.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                .marquee-left {
                    animation: marqueeLeft 50s linear infinite;
                    will-change: transform;
                }
                .marquee-right {
                    animation: marqueeRight 50s linear infinite;
                    will-change: transform;
                }
                @keyframes marqueeLeft {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
                @keyframes marqueeRight {
                    0% { transform: translate3d(-50%, 0, 0); }
                    100% { transform: translate3d(0, 0, 0); }
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes clipLeft {
                    from { clip-path: inset(0 0 0 0); }
                    to { clip-path: inset(0 100% 0 0); }
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
