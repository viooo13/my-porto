import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { certificatesData as certs } from '../../data/certificatesData';
import { StyledWord } from '../../components/StyledWord';
import { AnimatedNumber } from '../../components/AnimatedNumber';

export default function Certificates() {
    const ref = useRef(null);
    const textRef = useRef(null);
    const [vis, setVis] = useState(false);
    const [hov, setHov] = useState(null);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);



    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            document.documentElement.style.setProperty('--scroll-y', `${scrolled}px`);
            
            // Scroll listener tidak lagi digunakan untuk overlay, digantikan oleh CSS transition
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Prevent scroll when modal is open
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [selectedCert]);

    const a = (d = 0) => ({
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
    });

    return (
        <section id="certificates" ref={ref} style={{ background: '#0a0a0a', position: 'relative', overflow: 'hidden', scrollMarginTop: 80, zIndex: 1 }}>
            
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
                        fontSize: 'clamp(80px, 20vw, 350px)',
                        margin: 0, lineHeight: 1,
                        color: 'rgba(255,255,255,0.15)',
                        textShadow: '0 0 40px rgba(255,255,255,0.1)',
                        position: 'relative', zIndex: 1
                    }}>
                        Certificates
                    </h2>
                </div>
            </div>

            {/* Content Container */}
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(100px, 15vh, 160px) 0', overflow: 'hidden' }}>
            {/* Ambient Ambient */}
            <div style={{ position: 'absolute', top: '15%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>

                <h2 style={{ ...a(50), fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400, fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.95, color: '#fff', marginBottom: 80, letterSpacing: '-0.02em' }}>
                    <StyledWord text="Certifi" color="#fff" /><StyledWord text="cates" color="#1e3a5f" />
                </h2>

                {/* Compact Grid - supports many certificates */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ marginBottom: 80 }}>
                    {certs.map((cert, i) => (
                        <article key={cert.id} data-hover style={{
                            ...a(100 + i * 80),
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: 8,
                            padding: 'clamp(16px, 3vw, 24px)',
                            background: 'rgba(255,255,255,0.01)',
                            transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                            cursor: 'pointer',
                        }}
                            onMouseEnter={() => setHov(i)}
                            onMouseLeave={() => setHov(null)}
                            onClick={() => setSelectedCert(cert)}
                        >
                            {/* Image */}
                            <div style={{
                                position: 'relative', aspectRatio: '16/10', overflow: 'hidden',
                                borderRadius: 4, marginBottom: 16,
                            }}>
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    style={{
                                        width: '100%', height: '100%', objectFit: 'cover',
                                        filter: hov === i ? 'grayscale(0)' : 'grayscale(1)',
                                        opacity: hov === i ? 1 : 0.7,
                                        transform: `scale(${hov === i ? 1.05 : 1})`,
                                        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                                    }}
                                />

                                {/* Hover overlay */}
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    opacity: hov === i ? 1 : 0,
                                    transition: 'opacity 0.3s ease',
                                    background: 'rgba(30,58,95,0.15)',
                                    pointerEvents: 'none',
                                }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: '50%',
                                        background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transform: hov === i ? 'scale(1)' : 'scale(0.5)',
                                        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 14, color: hov === i ? '#1e3a5f' : 'rgba(255,255,255,0.2)', transition: 'color 0.3s' }}>{cert.id}</span>
                                                                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>{cert.year}</span>
                            </div>

                            <h3 style={{
                                fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700,
                                fontSize: 'clamp(16px, 1.5vw, 20px)', lineHeight: 1.3,
                                color: '#fff', marginBottom: 8, letterSpacing: '-0.01em',
                                whiteSpace: 'pre-line',
                                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                                transform: hov === i ? 'translateX(4px)' : 'translateX(0)',
                            }}>
                                {cert.title}
                            </h3>

                            <p style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.4)', marginBottom: 12, fontWeight: 300 }}>{cert.issuer}</p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                {cert.tags.slice(0, 3).map(tag => (
                                    <span key={tag} style={{
                                        fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                                        padding: '3px 8px', border: '1px solid rgba(255,255,255,0.06)',
                                        borderRadius: 4,
                                        color: 'rgba(255,255,255,0.35)',
                                    }}>{tag}</span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div style={{ ...a(600), marginTop: 80, textAlign: 'center' }}>
                    <p style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 32 }}>Continuing to expand knowledge every day</p>
                    <a href="#contact" data-hover style={{
                        fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 11,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: '#fff', padding: '16px 36px',
                        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
                        transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(30,58,95,0.1)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
                    >
                        GET IN TOUCH ↗
                    </a>
                </div>
            </div>
            </div>

            {/* LIGHTBOX MODAL */}
            {typeof document !== 'undefined' && createPortal(
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    background: 'rgba(10,10,10,0.95)',
                    backdropFilter: 'blur(20px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 40,
                    opacity: selectedCert ? 1 : 0,
                    pointerEvents: selectedCert ? 'auto' : 'none',
                    transition: 'opacity 0.5s ease',
                }}
                    onClick={() => setSelectedCert(null)}
                >
                    {/* Close Button */}
                    <button
                        aria-label="Close"
                        onClick={() => setSelectedCert(null)}
                        style={{
                            position: 'absolute', top: 40, right: 40,
                            background: 'none', border: 'none', color: '#fff',
                            cursor: 'none', padding: 10, zIndex: 1010
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    <div style={{
                        maxWidth: 1000, width: '100%',
                        transform: selectedCert ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(40px)',
                        transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                         onClick={(e) => e.stopPropagation()}
                    >
                        {selectedCert && (
                            <>
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 4, boxShadow: '0 40px 100px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                                />
                                <div style={{ marginTop: 24, textAlign: 'center' }}>
                                    <h4 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 32, color: '#fff', marginBottom: 8 }}>{selectedCert.title.replace('\n', ' ')}</h4>
                                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{selectedCert.issuer} — {selectedCert.year}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
}
