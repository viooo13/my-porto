import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiArrowRight, HiArrowUp } from 'react-icons/hi';
import { useState } from 'react';

export default function Footer() {
    const year = new Date().getFullYear();
    
    // Topographic lines generated as SVG to precisely match the wavy lines on the dark background of the image
    // These paths are designed to loop perfectly (start and end at same Y, using smooth T curves)
    const topographicSVG = `data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' preserveAspectRatio='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,50 Q250,150 500,50 T1000,50' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M0,120 Q250,220 500,120 T1000,120' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M0,200 Q250,300 500,200 T1000,200' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M0,10 Q250,110 500,10 T1000,10' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E`;

    return (
        <div style={{ position: 'relative', marginTop: '-80px', zIndex: 10 }}>
            <style>
                {`
                @keyframes footerWaves {
                    0% { background-position: 0 0; }
                    100% { background-position: -100vw 0; }
                }
                `}
            </style>
            <footer
                style={{
                    position: 'relative',
                    backgroundColor: '#172554', // A true navy blue
                    borderRadius: '80px 80px 0 0', // Curved only at the top, attaching to the bottom
                    padding: '80px 6vw 40px 6vw',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                    backgroundImage: `url("${topographicSVG}")`,
                    backgroundSize: '100vw 100%',
                    backgroundRepeat: 'repeat-x',
                    animation: 'footerWaves 25s linear infinite',
                    fontFamily: 'var(--font-display)',
                }}
            >
                {/* ── OVERLAPPING LOGO ── */}
                <div style={{
                    position: 'absolute',
                    top: '-60px', // Exact half-in half-out positioning
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '120px',
                    height: '120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 20
                }}>
                    <img src="/logo.webp" alt="Logo" style={{ 
                        width: '100%', 
                        height: '100%',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))'
                    }} />
                </div>

                {/* ── MAIN TITLE REMOVED ── */}

                {/* ── BOTTOM GRID (2x2 on Mobile, Flex Row on Desktop) ── */}
                <div className="w-full grid grid-cols-2 lg:flex lg:flex-row lg:justify-between items-start gap-y-12 gap-x-6 lg:gap-8 relative z-10 mt-8">
                    
                    {/* 1: CONTACT (Top Left on mobile) */}
                    <div className="w-full">
                        <h4 style={{ fontSize: '18px', color: '#fff', fontWeight: 500, marginBottom: '20px' }}>Contact</h4>
                        <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.6, margin: 0 }}>
                            Bogor, Indonesia<br/>
                            Worldwide<br/>
                            +62 821 4649 5055<br/>
                            <a href="mailto:vioadytia30@gmail.com" className="hover:text-white transition-colors block mt-1" style={{ color: '#d1d5db', textDecoration: 'none', wordBreak: 'break-all' }}>vioadytia30@gmail.com</a>
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                            <div style={{ 
                                padding: '4px 8px', backgroundColor: 'var(--blue-light)', 
                                borderRadius: '12px', fontSize: '11px', color: '#fff', fontWeight: 600
                            }}>
                                100%
                            </div>
                            <span style={{ fontSize: '11px', color: '#d1d5db' }}>Available</span>
                        </div>
                    </div>

                    {/* 2: SOCIALS (Top Right on mobile) */}
                    <div className="w-full flex flex-col items-start lg:mt-11">
                        <a href="#" className="hover:text-white transition-colors py-2" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Facebook <HiArrowUp style={{ transform: 'rotate(45deg)' }} size={12} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors py-2" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Instagram <HiArrowUp style={{ transform: 'rotate(45deg)' }} size={12} />
                        </a>
                        <a href="#" className="hover:text-white transition-colors py-2" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            LinkedIn <HiArrowUp style={{ transform: 'rotate(45deg)' }} size={12} />
                        </a>
                    </div>

                    {/* 3: QUICK LINKS (Bottom Left on mobile) */}
                    <div className="w-full">
                        <h4 style={{ fontSize: '18px', color: '#fff', fontWeight: 500, marginBottom: '20px' }}>Quick Links</h4>
                        <div className="flex flex-col gap-3">
                            <a href="#hero" className="hover:text-white transition-colors" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Home</a>
                            <a href="#projects" className="hover:text-white transition-colors" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Work</a>
                            <a href="#about" className="hover:text-white transition-colors" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>About</a>
                            <a href="#certificates" className="hover:text-white transition-colors" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Certificates</a>
                            <a href="#skills" className="hover:text-white transition-colors" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Skills</a>
                            <a href="#contact" className="hover:text-white transition-colors" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Contact</a>
                        </div>
                    </div>

                    {/* 4: CTA BUTTONS (Bottom Right on mobile) */}
                    <div className="w-full flex flex-col gap-4 items-start lg:items-end lg:mt-10">
                        <a href="mailto:vioadytia30@gmail.com" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            padding: '10px 10px 10px 16px', borderRadius: '999px',
                            backgroundColor: 'var(--blue-light)',
                            color: '#fff', fontSize: '13px', fontWeight: 500,
                            textDecoration: 'none', transition: 'transform 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
                            Email Me
                            <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <HiArrowRight size={12} color="#fff" />
                            </span>
                        </a>
                        
                        <a href="https://wa.me/6282146495055" target="_blank" rel="noopener noreferrer" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            padding: '10px 10px 10px 16px', borderRadius: '999px',
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            color: '#fff', fontSize: '13px', fontWeight: 500,
                            textDecoration: 'none', transition: 'transform 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
                            WhatsApp
                            <span style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <HiArrowRight size={12} color="#fff" />
                            </span>
                        </a>
                    </div>
                </div>

                {/* ── VERY BOTTOM RIGHT PILL ── */}
                <div className="w-full mt-16 flex justify-center lg:justify-end relative z-10">
                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 px-6 py-3 rounded-full" style={{ backgroundColor: '#fdfae5' }}>
                        <a href="#" style={{ fontSize: '12px', color: '#000', textDecoration: 'none', fontWeight: 500, padding: '4px 8px' }}>Cookies policy</a>
                        <a href="#" style={{ fontSize: '12px', color: '#000', textDecoration: 'none', fontWeight: 500, padding: '4px 8px' }}>Privacy policy</a>
                        <span style={{ fontSize: '12px', color: '#000', fontWeight: 600, padding: '4px 8px', padding : '4px 8px'}}>©{year}</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
