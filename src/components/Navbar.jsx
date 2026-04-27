import { useState, useEffect, useRef, useCallback } from 'react';
import { FaHome, FaUser, FaCode, FaBriefcase, FaCertificate, FaEnvelope } from 'react-icons/fa';

const links = [
    { name: 'Home', href: '#hero', icon: <FaHome /> },
    { name: 'About', href: '#about', icon: <FaUser /> },
    { name: 'Skills', href: '#skills', icon: <FaCode /> },
    { name: 'Work', href: '#projects', icon: <FaBriefcase /> },
    { name: 'Certs', href: '#certificates', icon: <FaCertificate /> },
    { name: 'Contact', href: '#contact', icon: <FaEnvelope /> },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [navHidden, setNavHidden] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    const prevScrollY = useRef(0);
    const isDragging = useRef(false);
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);
    const ticking = useRef(false);

    // ─── SCROLL HIDE/SHOW + ACTIVE SECTION (single listener) ─────────────
    const onScroll = useCallback(() => {
        if (open) return; // jangan proses saat menu mobile terbuka

        const y = window.scrollY;
        const prev = prevScrollY.current;
        const delta = y - prev;

        // Active section tracking
        const scrollPos = y + 120;
        for (const l of links) {
            const id = l.href.substring(1);
            const el = document.getElementById(id);
            if (el) {
                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    setActiveSection(id);
                    break;
                }
            }
        }

        // Navbar hide/show
        if (y <= 80) {
            // Selalu tampilkan di area paling atas
            setNavHidden(false);
            prevScrollY.current = y;
            return;
        }

        // Hanya proses jika ada pergerakan cukup (> 5px)
        if (Math.abs(delta) < 5) return;

        if (delta > 0) {
            // Scroll ke BAWAH → sembunyikan
            setNavHidden(true);
        } else {
            // Scroll ke ATAS → tampilkan
            setNavHidden(false);
        }

        prevScrollY.current = y;
    }, [open]);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    onScroll();
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        prevScrollY.current = window.scrollY;
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [onScroll]);

    // ─── ESCAPE KEY ──────────────────────────────────────────────────────
    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, []);

    // ─── DRAG-TO-DISMISS (mobile menu) ───────────────────────────────────
    useEffect(() => { if (!open) setDragOffset(0); }, [open]);

    const handleTouchStart = (e) => {
        isDragging.current = true;
        touchStartY.current = e.touches[0].clientY;
        touchStartTime.current = Date.now();
    };
    const handleTouchMove = (e) => {
        if (!isDragging.current) return;
        const deltaY = e.touches[0].clientY - touchStartY.current;
        if (deltaY > 0) { e.preventDefault(); setDragOffset(deltaY); }
    };
    const handleTouchEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;
        const elapsed = Date.now() - touchStartTime.current;
        const velocity = dragOffset / (elapsed + 1);
        if (dragOffset > 120 || (dragOffset > 40 && velocity > 0.5)) {
            setOpen(false); setDragOffset(0);
        } else {
            setDragOffset(0);
        }
    };

    // ─── LOCK BODY SCROLL saat mobile menu terbuka ───────────────────────
    useEffect(() => {
        if (open) {
            const scrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;
        } else {
            const top = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (top) {
                const y = -parseInt(top || '0');
                window.scrollTo(0, y);
                prevScrollY.current = y; // sync agar tidak langsung hide
            }
        }
    }, [open]);

    // ─── RENDER ──────────────────────────────────────────────────────────
    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
                height: 'clamp(60px, 10vw, 80px)',
                display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                paddingTop: 16,
                background: 'transparent',
                pointerEvents: 'none',
                transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                transform: navHidden ? 'translateY(calc(-100% - 24px))' : 'translateY(0)',
                willChange: 'transform',
            }}>
                {/* Floating nav container */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    gap: 16,
                    padding: '8px 12px 8px 16px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 999,
                    backdropFilter: 'blur(20px) saturate(150%)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                    pointerEvents: 'auto',
                }}>
                    {/* Logo */}
                    <a href="#hero" data-hover style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                        <img
                            src="/logo.png"
                            alt="Vio Adytia"
                            style={{
                                width: 40, height: 'auto', display: 'block',
                                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(8deg)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
                        />
                    </a>

                    {/* Desktop links */}
                    <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {links.map((l) => {
                            const isActive = activeSection === l.href.substring(1);
                            return (
                                <a key={l.name} href={l.href} data-hover style={{
                                    fontWeight: 400, fontSize: 11,
                                    letterSpacing: '0.08em', textTransform: 'uppercase',
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                                    padding: '8px 16px',
                                    borderRadius: 999,
                                    background: isActive ? 'rgba(74, 144, 217, 0.15)' : 'transparent',
                                }}
                                    onMouseEnter={e => {
                                        if (!isActive) {
                                            e.currentTarget.style.color = 'rgba(255,255,255,0.85)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = isActive ? '#fff' : 'rgba(255,255,255,0.55)';
                                        e.currentTarget.style.background = isActive ? 'rgba(74, 144, 217, 0.15)' : 'transparent';
                                    }}
                                >
                                    {l.name}
                                </a>
                            );
                        })}
                    </div>

                    {/* Status pill */}
                    <div className="hide-mobile" style={{
                        padding: '6px 12px',
                        background: 'rgba(74, 144, 217, 0.12)',
                        border: '1px solid rgba(74, 144, 217, 0.2)',
                        borderRadius: 999,
                        fontSize: 10, fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: '#4a90d9',
                    }}>
                        2026
                    </div>

                    {/* Hamburger — mobile only */}
                    <button
                        onClick={() => setOpen(!open)}
                        aria-label="Menu"
                        data-hover
                        className="hide-desktop"
                        style={{
                            display: 'flex',
                            width: 40, height: 40,
                            alignItems: 'center', justifyContent: 'center',
                            background: open
                                ? 'linear-gradient(135deg, rgba(220,50,50,0.8) 0%, rgba(180,40,40,0.6) 100%)'
                                : 'linear-gradient(135deg, rgba(30,58,95,0.6) 0%, rgba(45,90,135,0.4) 100%)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: 999,
                            flexDirection: 'column',
                            gap: 4,
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                            boxShadow: open
                                ? '0 4px 15px rgba(220,50,50,0.4)'
                                : '0 4px 15px rgba(30,58,95,0.3)',
                        }}
                    >
                        <span style={{
                            width: 20, height: 2.5, background: '#fff', display: 'block', borderRadius: 2,
                            transition: 'transform 0.25s ease, opacity 0.25s ease',
                            transform: open ? 'translateY(3px) rotate(45deg)' : 'translateY(0) rotate(0deg)',
                            opacity: open ? 0.9 : 1,
                        }} />
                        <span style={{
                            width: 20, height: 2.5, background: '#fff', display: 'block', borderRadius: 2,
                            transition: 'opacity 0.25s ease',
                            opacity: open ? 0 : 1,
                        }} />
                        <span style={{
                            width: 20, height: 2.5, background: '#fff', display: 'block', borderRadius: 2,
                            transition: 'transform 0.25s ease, opacity 0.25s ease',
                            transform: open ? 'translateY(-3px) rotate(-45deg)' : 'translateY(0) rotate(0deg)',
                            opacity: open ? 0.9 : 1,
                        }} />
                    </button>
                </div>
            </nav>

            {/* Backdrop */}
            <div className="hide-desktop" onClick={() => setOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 599,
                background: 'rgba(0,0,0,0.6)',
                opacity: open ? Math.max(0, 1 - dragOffset / 300) : 0,
                transition: dragOffset === 0 ? 'opacity 0.3s ease' : 'none',
                pointerEvents: open ? 'auto' : 'none',
            }} />

            {/* Mobile fullscreen menu */}
            <div
                className="hide-desktop"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh', zIndex: 9999,
                    background: '#000000',
                    backdropFilter: 'blur(30px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    transition: dragOffset === 0 ? 'opacity 0.4s ease, transform 0.4s ease' : 'none',
                    opacity: open ? 1 : 0,
                    transform: open ? `translateY(${dragOffset}px)` : 'translateY(20px)',
                    pointerEvents: open ? 'auto' : 'none',
                    overflow: 'hidden',
                }}
            >
                <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, zIndex: 10 }}>
                    {links.map((l, i) => {
                        const isActive = activeSection === l.href.substring(1);
                        return (
                            <a key={l.name} href={l.href}
                                onClick={() => { setOpen(false); setActiveSection(l.href.substring(1)); }}
                                style={{
                                    fontSize: 28, fontWeight: 400,
                                    letterSpacing: '0.18em',
                                    color: isActive ? '#4a90d9' : 'rgba(255,255,255,0.55)',
                                    textDecoration: 'none',
                                    fontFamily: '"Cinzel Decorative", serif',
                                    transition: `all 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
                                    textTransform: 'uppercase',
                                }}
                            >
                                {l.name}
                            </a>
                        );
                    })}
                </nav>

                {/* Close X button */}
                <button onClick={() => setOpen(false)} aria-label="Close"
                    style={{
                        position: 'absolute', top: 24, right: 24,
                        width: 44, height: 44,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(74, 144, 217, 0.1)',
                        border: '1px solid rgba(74, 144, 217, 0.2)',
                        borderRadius: 12,
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(74, 144, 217, 0.2)';
                        e.currentTarget.style.transform = 'rotate(90deg)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(74, 144, 217, 0.1)';
                        e.currentTarget.style.transform = 'rotate(0deg)';
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4a90d9" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>
        </>
    );
}