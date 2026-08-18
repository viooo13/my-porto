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
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
                display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',
                padding: '32px 48px',
                pointerEvents: 'none',
            }}>


                {/* Right Side (Links) */}
                <div className="hide-mobile" style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    {links.map((l) => {
                        const isActive = activeSection === l.href.substring(1);
                        return (
                            <a key={l.name} href={l.href} data-hover style={{
                                fontFamily: '"Cinzel Decorative", serif',
                                fontSize: '13px',
                                fontWeight: isActive ? 700 : 400,
                                letterSpacing: '0.15em',
                                color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                                textDecoration: 'none',
                                transition: 'color 0.3s, transform 0.3s',
                                transform: isActive ? 'translateX(0)' : 'translateX(0)',
                            }}
                            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                            onMouseLeave={e => e.currentTarget.style.color = isActive ? '#fff' : 'rgba(255,255,255,0.4)'}
                            >
                                {l.name}
                            </a>
                        );
                    })}
                </div>

                {/* Hamburger (Mobile) */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                    data-hover
                    className="hide-desktop"
                    style={{
                        pointerEvents: 'auto',
                        display: 'flex',
                        width: 40, height: 40,
                        alignItems: 'center', justifyContent: 'center',
                        background: 'transparent',
                        border: 'none',
                        flexDirection: 'column',
                        gap: 6,
                        cursor: 'pointer',
                        zIndex: 510,
                    }}
                >
                    <span style={{
                        width: 24, height: 2, background: '#fff', display: 'block',
                        transition: 'transform 0.3s, opacity 0.3s',
                        transform: open ? 'translateY(8px) rotate(45deg)' : 'translateY(0)',
                    }} />
                    <span style={{
                        width: 24, height: 2, background: '#fff', display: 'block',
                        transition: 'opacity 0.3s',
                        opacity: open ? 0 : 1,
                    }} />
                    <span style={{
                        width: 24, height: 2, background: '#fff', display: 'block',
                        transition: 'transform 0.3s',
                        transform: open ? 'translateY(-8px) rotate(-45deg)' : 'translateY(0)',
                    }} />
                </button>
            </nav>

            {/* Mobile Backdrop & Menu */}
            <div className="hide-desktop" onClick={() => setOpen(false)} style={{
                position: 'fixed', inset: 0, zIndex: 490,
                background: 'rgba(0,0,0,0.8)',
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
                                    letterSpacing: '0.15em',
                                    color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                                    textDecoration: 'none',
                                    fontFamily: '"Cinzel Decorative", serif',
                                }}
                            >
                                {l.name}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </>
    );
}