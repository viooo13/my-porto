import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { HiArrowRight, HiArrowUp } from 'react-icons/hi';
import { useState } from 'react';

export default function Footer() {
    const year = new Date().getFullYear();
    
    // Topographic lines generated as SVG to precisely match the wavy lines on the dark background of the image
    const topographicSVG = `data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-100,50 Q200,150 400,80 T800,120 T1100,50' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M-100,120 Q150,220 350,150 T700,200 T1100,120' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M-100,200 Q250,300 450,220 T850,280 T1100,200' fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='1.5'/%3E%3Cpath d='M100,0 Q300,100 500,50 T900,100 T1000,0' fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E`;

    return (
        <div style={{ position: 'relative', marginTop: '-80px', zIndex: 10 }}>
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
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
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

                {/* ── BOTTOM GRID (Contact + Socials Left, Navigation Right) ── */}
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px',
                    position: 'relative',
                    zIndex: 10,
                    marginTop: '20px'
                }}>
                    
                    {/* LEFT GROUP: Contact and Socials side-by-side */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', flex: '1 1 0', minWidth: '300px' }}>
                        {/* LEFT: CONTACT */}
                        <div style={{ width: '200px' }}>
                            <h4 style={{ fontSize: '18px', color: '#fff', fontWeight: 500, marginBottom: '20px' }}>Contact</h4>
                            <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: 1.6, margin: 0 }}>
                                Bogor, Indonesia<br/>
                                Worldwide Available<br/>
                                +62 821 4649 5055<br/>
                                <a href="mailto:vioadytia30@gmail.com" style={{ color: '#d1d5db', textDecoration: 'none' }}>vioadytia30@gmail.com</a>
                            </p>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '24px' }}>
                                <div style={{ 
                                    padding: '4px 10px', backgroundColor: 'var(--blue-light)', 
                                    borderRadius: '12px', fontSize: '11px', color: '#fff', fontWeight: 600
                                }}>
                                    100%
                                </div>
                                <span style={{ fontSize: '12px', color: '#d1d5db' }}>Available for work</span>
                            </div>
                        </div>

                        {/* MIDDLE-LEFT: SOCIALS */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '42px', width: '120px' }}>
                            <a href="#" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                Facebook <HiArrowUp style={{ transform: 'rotate(45deg)' }} size={12} />
                            </a>
                            <a href="#" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                Instagram <HiArrowUp style={{ transform: 'rotate(45deg)' }} size={12} />
                            </a>
                            <a href="#" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                LinkedIn <HiArrowUp style={{ transform: 'rotate(45deg)' }} size={12} />
                            </a>
                        </div>
                    </div>

                    {/* CENTER CTA BUTTONS */}
                    <div style={{ flex: '0 0 auto', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '38px' }}>
                        <a href="mailto:vioadytia30@gmail.com" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            padding: '10px 10px 10px 20px', borderRadius: '999px',
                            backgroundColor: 'var(--blue-light)',
                            color: '#fff', fontSize: '14px', fontWeight: 500,
                            textDecoration: 'none', transition: 'transform 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
                            Start a conversation
                            <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <HiArrowRight size={14} color="#fff" />
                            </span>
                        </a>
                        
                        <a href="https://wa.me/6282146495055" target="_blank" rel="noopener noreferrer" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            padding: '10px 10px 10px 20px', borderRadius: '999px',
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            color: '#fff', fontSize: '14px', fontWeight: 500,
                            textDecoration: 'none', transition: 'transform 0.2s'
                        }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
                            WhatsApp
                            <span style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <HiArrowRight size={14} color="#fff" />
                            </span>
                        </a>
                    </div>

                    {/* RIGHT: QUICK LINKS (Snel naar) */}
                    <div style={{ flex: '1 1 0', minWidth: '250px', display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: '100%', maxWidth: '250px' }}>
                            <h4 style={{ fontSize: '18px', color: '#fff', fontWeight: 500, marginBottom: '20px' }}>Quick Links</h4>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '8px 20px'
                        }}>
                            <a href="#hero" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Home</a>
                            <a href="#projects" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Work</a>
                            <a href="#about" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>About</a>
                            <a href="#certificates" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Certificates</a>
                            <a href="#skills" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Skills</a>
                            <a href="#contact" style={{ fontSize: '14px', color: '#d1d5db', textDecoration: 'none' }}>Contact</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── VERY BOTTOM RIGHT PILL ── */}
                <div style={{
                    width: '100%',
                    marginTop: '60px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'relative',
                    zIndex: 10
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        padding: '10px 24px',
                        backgroundColor: '#fdfae5', // Exact pale cream color from image
                        borderRadius: '999px',
                    }}>
                        <a href="#" style={{ fontSize: '12px', color: '#000', textDecoration: 'none', fontWeight: 500 }}>Cookies policy</a>
                        <a href="#" style={{ fontSize: '12px', color: '#000', textDecoration: 'none', fontWeight: 500 }}>Privacy policy</a>
                        <span style={{ fontSize: '12px', color: '#000', fontWeight: 600 }}>©{year}</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
