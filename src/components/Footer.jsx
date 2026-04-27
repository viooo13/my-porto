import { HiArrowUpRight } from 'react-icons/hi2';
import { FaLinkedin, FaGithub, FaBehance, FaTwitter } from 'react-icons/fa';

const socials = [
    { icon: FaLinkedin, label: 'LinkedIn' },
    { icon: FaGithub,   label: 'GitHub' },
    { icon: FaBehance,  label: 'Behance' },
    { icon: FaTwitter,  label: 'Twitter' },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: '#0a0a0a', padding: 'clamp(60px, 10vw, 120px) 0 0', position: 'relative', overflow: 'hidden' }}>
            {/* Ambient glows */}
            <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
                {/* Big Personal Brand heading */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(60px, 10vw, 120px)' }}>
                    <div style={{ 
                        fontFamily: 'Plus Jakarta Sans, sans-serif', 
                        fontWeight: 900, 
                        fontSize: 'clamp(64px, 18vw, 260px)', 
                        lineHeight: 0.8,
                        color: '#fff',
                        letterSpacing: '-0.05em',
                        textTransform: 'uppercase',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        userSelect: 'none',
                        transition: 'transform 0.8s var(--ease)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02) translateY(-10px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                    >
                        <span style={{ position: 'relative', zIndex: 2 }}>VIO</span>
                        <span style={{ 
                            color: 'transparent', 
                            WebkitTextStroke: '1px rgba(255,255,255,0.1)', 
                            marginTop: '-0.1em',
                            transition: 'all 0.6s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.WebkitTextStroke = '1px #1e3a5f'}
                        onMouseLeave={e => e.currentTarget.style.WebkitTextStroke = '1px rgba(255,255,255,0.1)'}
                        >ADYTIA</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 40 }}>
                        <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>[ FRONTEND DEVELOPER ]</p>
                        <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>[ BOGOR, INDONESIA ]</p>
                    </div>
                </div>



                {/* Footer grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12" style={{ paddingTop: 40, gap: 'clamp(24px, 4vw, 48px)' }}>
                    {/* Col 1 — Location */}
                    <div>
                        <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Location</p>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>Bogor, Indonesia<br />Available Worldwide</p>
                        <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16, marginTop: 32 }}>Office Hours</p>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>Mon — Fri: 09:00 — 18:00<br />WIB (GMT+7)</p>
                    </div>

                    {/* Col 2 — Navigation */}
                    <div>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-white/20 mb-4">Navigation</p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {['Home', 'Work', 'About', 'Skills', 'Contact'].map(n => (
                                <a key={n} href={`#${n.toLowerCase() === 'home' ? 'hero' : n.toLowerCase() === 'work' ? 'projects' : n.toLowerCase()}`} data-hover style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.3s, transform 0.3s', display: 'inline-block', width: 'fit-content' }}
                                onMouseEnter={e => { e.currentTarget.style.color = '#1e3a5f'; e.currentTarget.style.transform = 'translateX(8px)'; }}
                                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                                    {n}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Col 3 — Social + CTA */}
                    <div>
                        <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 16 }}>Social</p>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
                            {socials.map(s => (
                                <a key={s.label} href="#" aria-label={s.label} data-hover style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = '#1e3a5f'; e.currentTarget.style.transform = 'scale(1.12) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 0 18px rgba(30,58,95,0.3)'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <s.icon size={15} />
                                </a>
                            ))}
                        </div>
                        <a href="#contact" data-hover style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '14px 28px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.background = 'rgba(30,58,95,0.1)'; e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(30,58,95,0.15)'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            Work with me <HiArrowUpRight />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'clamp(40px, 6vw, 60px)', padding: 'clamp(16px, 3vw, 20px) clamp(20px, 5vw, 40px)' }}>
                <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
                        © {year} Vio Adytia. All rights reserved.
                    </p>
                    <p style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>
                        Crafted with precision & passion
                    </p>
                </div>
            </div>
        </footer>
    );
}
