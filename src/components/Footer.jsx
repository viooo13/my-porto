import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';

const links = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const socials = [
    { icon: FaGithub, label: 'GitHub', href: '#' },
    { icon: FaLinkedin, label: 'LinkedIn', href: '#' },
    { icon: FaInstagram, label: 'Instagram', href: '#' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/6282146495055' },
];

export default function Footer() {
    const year = new Date().getFullYear();

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer style={{
            background: '#080808',
            position: 'relative',
            overflow: 'hidden',
        }}>

            {/* ── Main Footer Content ── */}
            <div style={{
                maxWidth: 1440, margin: '0 auto',
                padding: 'clamp(60px, 10vh, 100px) 6vw clamp(40px, 6vh, 60px)',
            }}>

                {/* Top Row: Brand + Back to Top */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    marginBottom: 'clamp(60px, 8vh, 100px)',
                    flexWrap: 'wrap', gap: 32,
                }}>
                    {/* Logo */}
                    <a href="#hero" style={{ display: 'block', flexShrink: 0 }}>
                        <img
                            src="/logo.png"
                            alt="Vio Adytia"
                            style={{
                                width: 'clamp(40px, 5vw, 52px)',
                                height: 'auto',
                                display: 'block',
                            }}
                        />
                    </a>

                    {/* Back to Top */}
                    <button
                        onClick={scrollTop}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.08)',
                            padding: '12px 20px',
                            color: 'rgba(255,255,255,0.4)',
                            fontSize: 10, fontWeight: 700,
                            letterSpacing: '0.25em', textTransform: 'uppercase',
                            cursor: 'pointer',
                            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.borderColor = '#1e3a5f';
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                            e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        BACK TO TOP
                        <HiArrowUp size={14} />
                    </button>
                </div>

                {/* Middle: 4-Column Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8"
                    style={{ marginBottom: 'clamp(50px, 8vh, 80px)' }}
                >
                    {/* Col 1: Navigation */}
                    <div>
                        <p style={{
                            fontSize: 10, letterSpacing: '0.3em', fontWeight: 700,
                            color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase',
                            marginBottom: 20,
                        }}>Navigation</p>
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {links.map(link => (
                                <a key={link.label} href={link.href} style={{
                                    fontSize: 14, color: 'rgba(255,255,255,0.4)',
                                    textDecoration: 'none', fontWeight: 400,
                                    transition: 'all 0.3s ease',
                                    display: 'inline-block', width: 'fit-content',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.transform = 'translateX(6px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                                >{link.label}</a>
                            ))}
                        </nav>
                    </div>

                    {/* Col 2: Contact */}
                    <div>
                        <p style={{
                            fontSize: 10, letterSpacing: '0.3em', fontWeight: 700,
                            color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase',
                            marginBottom: 20,
                        }}>Contact</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <a href="mailto:vioadytia30@gmail.com" style={{
                                fontSize: 14, color: 'rgba(255,255,255,0.4)',
                                textDecoration: 'none', transition: 'color 0.3s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                            >vioadytia30@gmail.com</a>
                            <a href="https://wa.me/6282146495055" style={{
                                fontSize: 14, color: 'rgba(255,255,255,0.4)',
                                textDecoration: 'none', transition: 'color 0.3s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                            >+62 821 4649 5055</a>
                        </div>
                    </div>

                    {/* Col 3: Location */}
                    <div>
                        <p style={{
                            fontSize: 10, letterSpacing: '0.3em', fontWeight: 700,
                            color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase',
                            marginBottom: 20,
                        }}>Location</p>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, margin: 0 }}>
                            Bogor, Indonesia<br />
                            <span style={{ color: 'rgba(255,255,255,0.2)' }}>Available Worldwide</span>
                        </p>
                    </div>

                    {/* Col 4: Socials */}
                    <div>
                        <p style={{
                            fontSize: 10, letterSpacing: '0.3em', fontWeight: 700,
                            color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase',
                            marginBottom: 20,
                        }}>Socials</p>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {socials.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    aria-label={s.label}
                                    style={{
                                        width: 40, height: 40, borderRadius: '50%',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'rgba(255,255,255,0.3)', textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.borderColor = '#1e3a5f';
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.background = '#1e3a5f';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    <s.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)' }} />

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    paddingTop: 'clamp(20px, 3vh, 28px)',
                    flexWrap: 'wrap', gap: 12,
                }}>
                    <p style={{
                        fontSize: 11, color: 'rgba(255,255,255,0.15)',
                        letterSpacing: '0.1em', margin: 0,
                    }}>
                        © {year} Vio Adytia
                    </p>
                    <p style={{
                        fontSize: 11, color: 'rgba(255,255,255,0.15)',
                        letterSpacing: '0.1em', margin: 0,
                    }}>
                        Designed & Built with precision
                    </p>
                </div>
            </div>
        </footer>
    );
}
