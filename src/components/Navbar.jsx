import { useState, useEffect, useRef } from 'react';

const links = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'CERTS', href: '#certificates' },
    { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [dragOffset, setDragOffset] = useState(0);

    const isDragging = useRef(false);
    const touchStartY = useRef(0);
    const touchStartTime = useRef(0);

    // Active section tracking
    useEffect(() => {
        const sectionElements = links.map(l => document.getElementById(l.href.substring(1))).filter(Boolean);
        if (sectionElements.length === 0) return;

        const observer = new IntersectionObserver(
            () => {
                let bestId = 'hero';
                const threshold = window.innerHeight * 0.3;
                for (const el of sectionElements) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= threshold && rect.bottom >= threshold) {
                        bestId = el.id;
                    }
                }
                setActiveSection(bestId);
            },
            { rootMargin: '0px', threshold: Array.from({ length: 11 }, (_, i) => i * 0.1) }
        );
        sectionElements.forEach(el => observer.observe(el));
        
        const handleScroll = () => {
            // Active section logic
            let bestId = 'hero';
            const threshold = window.innerHeight * 0.3;
            for (const el of sectionElements) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= threshold && rect.bottom > threshold) {
                    bestId = el.id;
                }
            }
            setActiveSection(bestId);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape') setOpen(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, []);

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
            }
        }
    }, [open]);

    return (
        <>
            <nav style={{
                position: 'fixed', 
                top: 0, left: 0, right: 0, 
                zIndex: 500,
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '16px 40px',
                background: 'transparent',
                color: '#fff',
                fontFamily: '"Inter Display", "Inter", sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.05em',
            }}>
                {/* Left Side (Name) */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                    <a href="#hero" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
                        VIO ADYTIA
                    </a>
                </div>

                {/* Center (Links) */}
                <div className="hide-mobile" style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    {links.map((l, index) => {
                        const isActive = activeSection === l.href.substring(1);
                        return (
                            <span key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <a href={l.href} data-hover style={{
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none',
                                    transition: 'color 0.3s',
                                    fontWeight: isActive ? 700 : 500
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = isActive ? '#fff' : 'rgba(255,255,255,0.5)'}
                                >
                                    {l.name}
                                </a>
                                {index < links.length - 1 && <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 4px', fontWeight: 400 }}>/</span>}
                            </span>
                        );
                    })}
                </div>

                {/* Right Side (Email) */}
                <div className="hide-mobile" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <a href="mailto:hey@vioadytia.com" data-hover style={{ textDecoration: 'none', color: 'inherit', fontWeight: '600' }}>
                        HEY@VIOADYTIA.COM
                    </a>
                </div>

                {/* Hamburger (Mobile) */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                    data-hover
                    className="hide-desktop"
                    style={{
                        display: 'flex',
                        width: 32, height: 32,
                        alignItems: 'center', justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        flexDirection: 'column',
                        gap: 5,
                        cursor: 'pointer',
                        zIndex: 510,
                        padding: 0,
                    }}
                >
                    <span style={{
                        width: 20, height: 1.5, background: '#fff', display: 'block',
                        transition: 'transform 0.3s, opacity 0.3s',
                        transform: open ? 'translateY(6.5px) rotate(45deg)' : 'translateY(0)',
                    }} />
                    <span style={{
                        width: 20, height: 1.5, background: '#fff', display: 'block',
                        transition: 'opacity 0.3s',
                        opacity: open ? 0 : 1,
                    }} />
                    <span style={{
                        width: 20, height: 1.5, background: '#fff', display: 'block',
                        transition: 'transform 0.3s',
                        transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'translateY(0)',
                    }} />
                </button>
            </nav>

            {/* Mobile Backdrop & Menu */}
            <div className="hide-desktop" onClick={() => setOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 490,
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(10px)',
                opacity: open ? Math.max(0, 1 - dragOffset / 300) : 0,
                transition: dragOffset === 0 ? 'opacity 0.3s' : 'none',
                pointerEvents: open ? 'auto' : 'none',
            }} />

            <div
                className="hide-desktop"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100dvh', zIndex: 495,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    transition: dragOffset === 0 ? 'opacity 0.4s, transform 0.4s' : 'none',
                    opacity: open ? 1 : 0,
                    transform: open ? `translateY(${dragOffset}px)` : 'translateY(20px)',
                    pointerEvents: open ? 'auto' : 'none',
                }}
            >
                <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                    {links.map((l) => {
                        const isActive = activeSection === l.href.substring(1);
                        return (
                            <a key={l.name} href={l.href}
                                onClick={() => { setOpen(false); setActiveSection(l.href.substring(1)); }}
                                style={{
                                    fontSize: '24px', fontWeight: 600,
                                    letterSpacing: '0.1em',
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none',
                                    fontFamily: '"Inter Display", "Inter", sans-serif',
                                }}
                            >
                                {l.name}
                            </a>
                        );
                    })}
                    
                    <a href="mailto:hey@vioadytia.com" style={{
                        marginTop: 40,
                        fontSize: '14px',
                        color: '#fff',
                        textDecoration: 'none',
                        fontFamily: '"Inter Display", "Inter", sans-serif',
                        letterSpacing: '0.05em',
                        fontWeight: 600
                    }}>
                        HEY@VIOADYTIA.COM
                    </a>
                </nav>
            </div>
            
            <style>{`
                @media (max-width: 768px) {
                    nav {
                        padding: 16px 20px !important;
                    }
                }
            `}</style>
        </>
    );
}