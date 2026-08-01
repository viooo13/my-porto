import { useEffect, useState, useRef } from 'react';
import { FaGithub, FaLinkedin, FaImage, FaBriefcase, FaFileAlt } from 'react-icons/fa';
import { StyledWord } from '../../components/StyledWord';


function HeroButton({ children, href, className, onClick }) {
    return (
        <a
            href={href || '#'}
            onClick={onClick}
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
    const [cylinderRadius, setCylinderRadius] = useState(250);
    const photoRef = useRef(null);

    // Compute cylinder radius based on viewport
    useEffect(() => {
        const updateRadius = () => {
            const vw = window.innerWidth;
            setCylinderRadius(Math.min(vw * 0.22, 300));
        };
        updateRadius();
        window.addEventListener('resize', updateRadius, { passive: true });
        return () => window.removeEventListener('resize', updateRadius);
    }, []);
    
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

    // Mobile scroll parallax: foto bergerak ke atas sedikit lalu freeze
    useEffect(() => {
        const photo = photoRef.current;
        if (!photo) return;

        // Nilai awal translateY untuk mobile ≤480px
        // (sesuai CSS: translateY(107dvh) scale(0.9))
        const getBaseTranslate = () => {
            const w = window.innerWidth;
            if (w <= 480) return 107;
            if (w <= 768) return 97;
            return null; // Desktop: tidak dihandle JS
        };

        // Seberapa jauh foto naik ke atas (dalam dvh) sebelum freeze
        const LIFT_AMOUNT = 8; // dvh — foto naik 8dvh lalu berhenti
        // Seberapa cepat foto mengikuti scroll sebelum freeze
        const SCROLL_SENSITIVITY = 0.06; // semakin besar, semakin cepat naik

        let frozenTranslate = null;
        let isFrozen = false;
        let rafId = null;

        const onScroll = () => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                rafId = null;
                const w = window.innerWidth;
                const base = getBaseTranslate();

                // Hanya jalankan di mobile
                if (base === null) return;

                const scrollY = window.scrollY;
                const vhUnit = window.innerHeight / 100;
                const scale = w <= 480 ? 0.9 : 1.25;

                // Hitung translateY: dari base, turun sesuai scroll
                // Makin scroll → makin kecil translateY → foto naik
                const moved = base - scrollY * SCROLL_SENSITIVITY;
                const minTranslate = base - LIFT_AMOUNT; // batas atas (freeze point)

                const finalTranslate = Math.max(moved, minTranslate);

                photo.style.transform = `translateY(${finalTranslate}dvh) translateZ(0) scale(${scale})`;
            });
        };

        const onResize = () => {
            // Reset saat resize agar CSS mengambil alih jika tidak mobile
            const base = getBaseTranslate();
            if (base === null && photo) {
                photo.style.transform = '';
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });
        // Trigger sekali agar posisi awal benar
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (rafId) cancelAnimationFrame(rafId);
        };
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
                background: '#0a0a0a',
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

                {/* ── Glowing Orbit Ring Line (Behind Photo) ── */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%) perspective(1200px) rotateX(85deg)',
                    zIndex: 1, pointerEvents: 'none',
                }}>
                    <div className="orbit-glow" style={{
                        width: cylinderRadius * 2,
                        height: cylinderRadius * 2,
                        borderRadius: '50%',
                        border: '1px solid rgba(74, 144, 217, 0.08)',
                        boxShadow: '0 0 30px 2px rgba(74, 144, 217, 0.06), inset 0 0 30px 2px rgba(74, 144, 217, 0.04)',
                        transform: 'translate(-50%, -50%)',
                    }} />
                </div>

                {/* ── Glowing Orbit Ring Line (In Front of Photo) ── */}
                <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%) perspective(1200px) rotateX(85deg)',
                    zIndex: 3, pointerEvents: 'none',
                    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                }}>
                    <div className="orbit-glow" style={{
                        width: cylinderRadius * 2,
                        height: cylinderRadius * 2,
                        borderRadius: '50%',
                        border: '1px solid rgba(74, 144, 217, 0.15)',
                        boxShadow: '0 0 40px 4px rgba(74, 144, 217, 0.1), inset 0 0 40px 4px rgba(74, 144, 217, 0.06)',
                        transform: 'translate(-50%, -50%)',
                    }} />
                </div>

                {/* ── 3D Typography Cylinder - Back Half (Behind Photo) ── */}
                {(() => {
                    const text = 'FULLSTACK DEVELOPER  FULLSTACK DEVELOPER  ';
                    const chars = text.split('');
                    const totalChars = chars.length;
                    return (
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            perspective: '1200px',
                            zIndex: 1, pointerEvents: 'none',
                            width: cylinderRadius * 2, height: cylinderRadius * 2,
                            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        }}>
                            <div className="cylinder-ring" style={{ position: 'absolute', top: '50%', left: '50%' }}>
                                {chars.map((char, i) => {
                                    const isDiamond = char === '✦';
                                    return (
                                        <span key={`b-${i}`} className="char-back" style={{
                                            transform: `rotateY(${i * (360 / totalChars)}deg) translateZ(${cylinderRadius}px) rotateY(180deg)`,
                                            fontSize: 'clamp(28px, 5.5vw, 72px)',
                                            color: isDiamond ? 'rgba(74, 144, 217, 0.06)' : 'rgba(255, 255, 255, 0.06)',
                                            WebkitTextStroke: isDiamond ? 'none' : '1px rgba(255, 255, 255, 0.08)',
                                            filter: 'blur(2px)',
                                        }}>
                                            {isDiamond ? (
                                                <img src="/logo.webp" alt="logo" style={{ height: '0.8em', opacity: 0.1, verticalAlign: 'middle' }} />
                                            ) : (
                                                char === ' ' ? '\u00A0' : char
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })()}

                {/* ── 3D Typography Cylinder - Front Half (In Front of Photo) ── */}
                {(() => {
                    const text = 'FULLSTACK DEVELOPER  FULLSTACK DEVELOPER  ';
                    const chars = text.split('');
                    const totalChars = chars.length;
                    return (
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            perspective: '1200px',
                            zIndex: 3, pointerEvents: 'none',
                            width: cylinderRadius * 2, height: cylinderRadius * 2,
                            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                        }}>
                            <div className="cylinder-ring" style={{ position: 'absolute', top: '50%', left: '50%' }}>
                                {chars.map((char, i) => {
                                    const isDiamond = char === '✦';
                                    return (
                                        <span key={`f-${i}`} className={`char-front ${isDiamond ? 'char-diamond' : ''}`} style={{
                                            transform: `rotateY(${i * (360 / totalChars)}deg) translateZ(${cylinderRadius}px)`,
                                            fontSize: 'clamp(28px, 5.5vw, 72px)',
                                            color: isDiamond ? 'rgba(74, 144, 217, 1)' : 'rgba(255, 255, 255, 0.95)',
                                            WebkitTextStroke: isDiamond ? 'none' : 'none',
                                            textShadow: 'none',
                                        }}>
                                            {isDiamond ? (
                                                <img src="/logo.webp" alt="logo" style={{ height: '0.8em', verticalAlign: 'middle', filter: 'drop-shadow(0 0 10px rgba(74, 144, 217, 0.8))' }} />
                                            ) : (
                                                char === ' ' ? '\u00A0' : char
                                            )}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })()}

                {/* ── Center Character (The Illustration) ── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 2, height: '100dvh', width: '100%',
                    display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                    pointerEvents: 'none'
                }}>
                    <img ref={photoRef} className="hero-photo" src="/my-photo-bordered.webp" alt="Vio Adytia Illustration" width="1792" height="2394" style={{
                        filter: `${isPhotoHovered ? 'grayscale(0%)' : 'grayscale(100%)'} drop-shadow(0 0 40px rgba(74, 144, 217, 0.25))`,
                        maxWidth: 'none',
                    }} 
                    />
                </div>

                {/* ── Gradient Overlay for Text Readability ── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40dvh',
                    background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 40%, transparent 100%)',
                    zIndex: 4, pointerEvents: 'none'
                }} />

                {/* ── Foreground UI Layer ── */}
                <div style={{
                    position: 'relative', zIndex: 5, width: '100%', height: '100%',
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
                            {/* Buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
                                {[
                                    { name: 'View Projects', icon: FaBriefcase, action: (e) => { e.preventDefault(); window.location.href = '#projects'; } },
                                    { name: 'View CV', icon: FaFileAlt, action: (e) => { e.preventDefault(); setShowCvModal(true); } }
                                ].map((item, i) => (
                                    <a key={i} href="#" onClick={item.action} aria-label={item.name} title={item.name} className="hero-action-btn">
                                        <item.icon size={20} />
                                        <span className="hero-action-text">{item.name}</span>
                                    </a>
                                ))}
                            </div>

                            <p style={{
                                fontFamily: 'Inter, sans-serif', fontSize: 'clamp(14px, 1.2vw, 16px)', fontWeight: 300,
                                color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, margin: 0,
                                textShadow: '0 2px 10px rgba(0,0,0,0.8)'
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
                .orbit-glow {
                    animation: orbitPulse 4s ease-in-out infinite;
                }
                @keyframes orbitPulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                .cylinder-ring {
                    position: relative;
                    transform-style: preserve-3d;
                    animation: spinY 30s linear infinite;
                    will-change: transform;
                }
                @keyframes spinY {
                    from { transform: rotateX(-8deg) rotateY(0deg); }
                    to { transform: rotateX(-8deg) rotateY(-360deg); }
                }
                .char-front,
                .char-back {
                    position: absolute;
                    top: 0; left: 0;
                    backface-visibility: hidden;
                    white-space: pre;
                    font-family: 'BBH Bogle', 'Inter Display', sans-serif;
                    font-weight: 400;
                }
                .char-diamond {
                    animation: diamondGlow 3s ease-in-out infinite;
                }
                @keyframes diamondGlow {
                    0%, 100% { filter: drop-shadow(0 0 6px rgba(74, 144, 217, 0.4)); }
                    50% { filter: drop-shadow(0 0 18px rgba(74, 144, 217, 0.9)); }
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes clipLeft {
                    from { clip-path: inset(0 0 0 0); }
                    to { clip-path: inset(0 100% 0 0); }
                }

                .hero-action-btn {
                    height: 50px;
                    border-radius: 25px;
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    color: rgba(255,255,255,0.5);
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    background: rgba(255,255,255,0.02);
                    backdrop-filter: blur(10px);
                    cursor: pointer;
                    padding: 0 24px;
                }
                .hero-action-btn:hover {
                    color: #fff;
                    background: #4a90d9;
                    border-color: #4a90d9;
                    transform: scale(1.05) translateY(-2px);
                }
                .hero-action-text {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.05em;
                    white-space: nowrap;
                }
                
                @media (max-width: 768px) {
                    .hero-action-text {
                        display: none;
                    }
                    .hero-action-btn {
                        width: 50px;
                        padding: 0;
                        border-radius: 50%;
                        justify-content: center;
                        gap: 0;
                    }
                    .hero-action-btn:hover {
                        transform: scale(1.1) rotate(10deg);
                    }
                }

                .hero-photo {
                    height: 195dvh;
                    width: auto;
                    object-fit: contain;
                    pointer-events: none;
                    transform: translateY(97dvh) translateZ(0) scale(1);
                    transform-origin: top center;
                    will-change: filter, transform;
                    transition: filter 0.5s ease, transform 0.5s ease;
                }
                
                @media (max-width: 1024px) {
                    .hero-photo {
                        transform: translateY(97dvh) translateZ(0) scale(1.1);
                    }
                }
                
                @media (max-width: 768px) {
                    .hero-photo {
                        transform: translateY(97dvh) translateZ(0) scale(1.25);
                        transition: filter 0.5s ease; /* transform dikontrol JS */
                    }
                }
                
                @media (max-width: 480px) {
                    .hero-photo {
                        transform: translateY(107dvh) translateZ(0) scale(0.9);
                        transition: filter 0.5s ease; /* transform dikontrol JS */
                    }
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
