import { useEffect, useRef, useState } from 'react';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { AnimatedNumber } from '../../components/AnimatedNumber';

export default function Contact() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    const [time, setTime] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        const t = setInterval(() => {
            setTime(new Intl.DateTimeFormat('en-US', {
                timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false
            }).format(new Date()));
        }, 1000);
        return () => { obs.disconnect(); clearInterval(t); };
    }, []);

    const r = (d = 0) => ({
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${d}ms`,
    });

    const handleCopy = () => {
        navigator.clipboard.writeText('vioadytia30@gmail.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cards = [
        {
            icon: HiMail,
            iconColor: '#1e3a5f',
            title: 'Email',
            sub: 'vioadytia30@gmail.com',
            action: copied ? 'Copied!' : 'Copy Email',
            onClick: handleCopy,
            actionIcon: copied
                ? <span style={{ fontSize: 14 }}>✓</span>
                : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>,
        },
        {
            icon: FaLinkedin,
            iconColor: '#0A66C2',
            title: 'LinkedIn',
            sub: 'Professional Profile',
            action: 'Connect',
            href: '#',
            actionIcon: <span style={{ fontSize: 13 }}>↗</span>,
        },
        {
            icon: FaGithub,
            iconColor: '#fff',
            title: 'GitHub',
            sub: 'Code Repository',
            action: 'Follow',
            href: '#',
            actionIcon: <span style={{ fontSize: 13 }}>↗</span>,
        },
        {
            icon: HiLocationMarker,
            iconColor: '#1e3a5f',
            title: 'Location',
            sub: 'Bogor, Indonesia',
            action: `${time || '—'} WIB`,
            isStatic: true,
            actionIcon: <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.5)' }} />,
        },
    ];

    const cardStyle = {
        background: 'rgba(255,255,255,0.015)',
        padding: 'clamp(28px, 3vw, 36px)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 200,
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
    };

    return (
        <section id="contact" ref={ref} style={{
            background: '#0a0a0a', position: 'relative', overflow: 'hidden',
            scrollMarginTop: 80, zIndex: 1,
            padding: 'clamp(120px, 18vh, 220px) 0',
        }}>
            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 6vw' }}>

                {/* Section Label */}
                <div style={{ ...r(0), display: 'flex', alignItems: 'center', gap: 20, marginBottom: 'clamp(60px, 10vh, 100px)' }}>
                    <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}><AnimatedNumber value={5} pad={2} trigger={vis} /></span>
                    <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)' }}>CONTACT</span>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24" style={{ alignItems: 'start' }}>

                    {/* Left: Text Content */}
                    <div>
                        {/* Badge */}
                        <div style={{
                            ...r(50),
                            display: 'inline-flex', alignItems: 'center', gap: 10,
                            padding: '10px 20px',
                            borderRadius: 999, marginBottom: 40,
                            background: 'rgba(30,58,95,0.08)',
                        }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1e3a5f' }} />
                            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.6)' }}>LET'S CONNECT</span>
                        </div>

                        {/* Heading */}
                        <h2 style={{
                            ...r(100),
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                            fontSize: 'clamp(40px, 5.5vw, 76px)',
                            fontWeight: 800, lineHeight: 1.02,
                            letterSpacing: '-0.02em', margin: '0 0 32px',
                        }}>
                            <span style={{ color: '#fff', display: 'block' }}>Ready to start your</span>
                            <span style={{ color: '#1e3a5f', display: 'block' }}>next project?</span>
                        </h2>

                        {/* Description */}
                        <p style={{
                            ...r(200),
                            fontSize: 'clamp(15px, 1.2vw, 17px)',
                            color: 'rgba(255,255,255,0.4)',
                            lineHeight: 1.9, fontWeight: 300,
                            maxWidth: 460, marginBottom: 48,
                        }}>
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>

                        {/* CTA Button */}
                        <div style={r(300)}>
                            <a href="mailto:vioadytia30@gmail.com" style={{
                                display: 'inline-flex', alignItems: 'center', gap: 14,
                                padding: '18px 36px',
                                background: '#1e3a5f',
                                color: '#fff', fontSize: 12, fontWeight: 600,
                                letterSpacing: '0.15em',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                                borderRadius: '4px',
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = '#2a4a6f';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = '#1e3a5f';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                Write me an email
                                <HiMail size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Right: Contact Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cards.map((card, i) => (
                            <div key={card.title} style={{
                                ...r(200 + i * 100),
                                ...cardStyle,
                                cursor: card.onClick ? 'pointer' : card.href ? 'pointer' : 'default',
                            }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(30,58,95,0.1)';
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: 44, height: 44, borderRadius: 12,
                                    background: `${card.iconColor}15`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: 20,
                                }}>
                                    <card.icon size={20} color={card.iconColor} />
                                </div>

                                {/* Text */}
                                <div style={{ marginBottom: 20 }}>
                                    <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{card.title}</p>
                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', margin: 0 }}>{card.sub}</p>
                                </div>

                                {/* Action Button */}
                                {card.isStatic ? (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '10px 14px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: 6,
                                    }}>
                                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{card.action}</span>
                                        {card.actionIcon}
                                    </div>
                                ) : card.onClick ? (
                                    <button onClick={card.onClick} style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        width: '100%', padding: '10px 14px',
                                        background: copied ? 'rgba(74,222,128,0.08)' : 'rgba(255,255,255,0.03)',
                                        borderRadius: 6, cursor: 'pointer',
                                        color: copied ? '#4ade80' : 'rgba(255,255,255,0.4)',
                                        fontSize: 12, fontWeight: 500,
                                        border: 'none',
                                    }}>
                                        <span>{card.action}</span>
                                        {card.actionIcon}
                                    </button>
                                ) : (
                                    <a href={card.href} target="_blank" rel="noopener noreferrer" style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '10px 14px',
                                        background: 'rgba(255,255,255,0.03)',
                                        borderRadius: 6, textDecoration: 'none',
                                        color: 'rgba(255,255,255,0.4)',
                                        fontSize: 12, fontWeight: 500,
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                                    >
                                        <span>{card.action}</span>
                                        {card.actionIcon}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* WhatsApp CTA */}
                <div style={{
                    ...r(700),
                    marginTop: 'clamp(60px, 10vh, 100px)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    flexWrap: 'wrap', gap: 24,
                }}>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.3)', fontWeight: 300 }}>
                        Prefer a quick chat? Reach me on <a href="https://wa.me/6282146495055" target="_blank" rel="noopener noreferrer" style={{
                            color: '#1e3a5f', fontWeight: 600, textDecoration: 'none',
                        }}>WhatsApp</a>
                    </p>

                    <div style={{ display: 'flex', gap: 24 }}>
                        {['GITHUB', 'LINKEDIN', 'INSTAGRAM'].map(s => (
                            <a key={s} href="#" style={{
                                fontSize: 10, letterSpacing: '0.2em', fontWeight: 700,
                                color: 'rgba(255,255,255,0.2)', textDecoration: 'none',
                                transition: 'color 0.3s',
                            }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
                            >{s}</a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
