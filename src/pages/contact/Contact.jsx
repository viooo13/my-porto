import { useEffect, useRef, useState } from 'react';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { StyledWord } from '../../components/StyledWord';

const info = [
    { icon: HiMail, title: 'Email', value: 'vioadytia30@gmail.com', link: 'mailto:vioadytia30@gmail.com' },
    { icon: HiPhone, title: 'Phone', value: '+62 821 4649 5055', link: 'tel:+6282146495055' },
    { icon: HiLocationMarker, title: 'Location', value: 'Bogor, Indonesia', link: '#' },
];
const socials = [
    { icon: FaLinkedin, label: 'LinkedIn' }, { icon: FaGithub, label: 'GitHub' },
    { icon: FaTwitter, label: 'Twitter' }, { icon: FaInstagram, label: 'Instagram' },
];

export default function Contact() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const a = (d = 0) => ({
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
    });

    const inp = {
        width: '100%', background: 'transparent', border: 'none',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '14px 0', color: '#fff', fontSize: 14,
        outline: 'none',
        transition: 'border-color 0.4s',
    };

    return (
        <section id="contact" ref={ref} style={{ background: '#0a0a0a', padding: 'clamp(100px, 15vh, 160px) 0', position: 'relative', overflow: 'hidden', scrollMarginTop: 80, zIndex: 1 }}>
            <div style={{ position: 'absolute', top: '30%', left: '25%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
                {/* Label */}
                <div style={{ ...a(0), display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>05</span>
                    <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>Contact</span>
                </div>

                <h2 style={{ ...a(50), fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.95, color: '#fff', marginBottom: 16, letterSpacing: '-0.02em' }}>
                    <StyledWord text="Let's" color="#fff" /><br /><StyledWord text="Talk" color="#1e3a5f" />
                </h2>
                <p style={{ ...a(100), fontSize: 15, color: 'rgba(255,255,255,0.5)', maxWidth: 480, lineHeight: 1.7, marginBottom: 80, fontWeight: 300 }}>
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </p>

                {/* Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left — info cards */}
                    <div className="lg:col-span-5" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {info.map((c, i) => (
                            <a key={c.title} href={c.link} data-hover style={{
                                ...a(150 + i * 80),
                                display: 'flex', alignItems: 'center', gap: 20, textDecoration: 'none',
                                padding: '24px 20px',
                                border: '1px solid rgba(255,255,255,0.05)',
                                background: 'rgba(255,255,255,0.015)',
                                transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${150 + i * 80}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${150 + i * 80}ms, border-color 0.4s, background 0.4s, box-shadow 0.4s`,
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(30,58,95,0.3)'; e.currentTarget.style.background = 'rgba(30,58,95,0.05)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(30,58,95,0.1)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.015)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ width: 52, height: 52, borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.3s, border-color 0.3s' }}>
                                    <c.icon size={20} color="rgba(255,255,255,0.45)" />
                                </div>
                                <div>
                                    <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>{c.title}</p>
                                    <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', transition: 'transform 0.3s', display: 'inline-block' }}
                                        onMouseEnter={e => e.currentTarget.style.transform = 'translateX(4px)'}
                                        onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                                    >{c.value}</p>
                                </div>
                            </a>
                        ))}

                        {/* Open for work card */}
                        <div style={{ ...a(450), padding: '28px 20px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)', position: 'relative', overflow: 'hidden', marginTop: 4 }}>
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.12) 0%, transparent 70%)', pointerEvents: 'none', animation: 'breathe 4s ease-in-out infinite' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1e3a5f', boxShadow: '0 0 10px rgba(30,58,95,0.5)', animation: 'pulse 2s ease infinite' }} />
                                <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff', letterSpacing: '0.02em' }}>Open for Opportunities</h3>
                            </div>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                                I'm available for freelance work and full-time positions. Let's build something great together.
                            </p>
                        </div>
                    </div>

                    {/* Right — form */}
                    <div className="lg:col-span-7" style={{ ...a(200), padding: '44px 36px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.015)' }}>
                        <h3 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 24, color: '#fff', marginBottom: 36, letterSpacing: '0.02em' }}>Send a Message</h3>
                        <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8, display: 'block' }}>Your Name</label>
                                    <input type="text" placeholder="Your Name" style={inp}
                                        onFocus={e => e.target.style.borderBottomColor = '#1e3a5f'}
                                        onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8, display: 'block' }}>Your Email</label>
                                    <input type="email" placeholder="YourName@example.com" style={inp}
                                        onFocus={e => e.target.style.borderBottomColor = '#1e3a5f'}
                                        onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8, display: 'block' }}>Subject</label>
                                <input type="text" placeholder="Project Discussion" style={inp}
                                    onFocus={e => e.target.style.borderBottomColor = '#1e3a5f'}
                                    onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8, display: 'block' }}>Message</label>
                                <textarea rows={4} placeholder="Tell me about your project..." style={{ ...inp, resize: 'none' }}
                                    onFocus={e => e.target.style.borderBottomColor = '#1e3a5f'}
                                    onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>
                            <button type="submit" className="btn-primary" data-hover style={{ width: '100%' }}>
                                Send Message <HiMail style={{ marginLeft: 10 }} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Social strip */}
                <div style={{ ...a(600), marginTop: 80, paddingTop: 36, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
                    <p style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Connect on social media</p>
                    <div style={{ display: 'flex', gap: 10 }}>
                        {socials.map((s, i) => (
                            <a key={s.label} href="#" aria-label={s.label} data-hover style={{
                                width: 44, height: 44, borderRadius: '50%',
                                border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
                                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                                animation: vis ? `scaleUp 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.8 + i * 0.08}s both` : 'none',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#1e3a5f'; e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(30,58,95,0.3)'; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <s.icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
