import { useEffect, useRef, useState } from 'react';

export default function About() {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { setVis(e.isIntersecting); }, { threshold: 0.08 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const a = (d = 0) => ({
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
    });

    const aLeft = (d = 0) => ({
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateX(0)' : 'translateX(-60px)',
        transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${d}ms`,
    });

    const stats = [
       
    ];

    const tags = ['FRONTEND SPECIALIST ', 'LARAVEL ENTHUSIAST', 'UI/UX FOCUSED', 'CLEAN CODE ADVOCATE'];

    return (
        <section id="about" ref={ref} style={{ background: '#0a0a0a', padding: '160px 0', overflow: 'hidden', position: 'relative', scrollMarginTop: 80 }}>
            {/* Ambient glow */}
            <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,58,95,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Floating dots */}
            {[...Array(4)].map((_, i) => (
                <div key={i} style={{
                    position: 'absolute', width: 3, height: 3, borderRadius: '50%',
                    background: 'rgba(30,58,95,0.3)',
                    right: `${10 + i * 8}%`, top: `${15 + i * 20}%`,
                    animation: `floatSlow ${4 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`, pointerEvents: 'none',
                }} />
            ))}

            <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>
                {/* Section label */}
                <div style={{ ...a(0), display: 'flex', alignItems: 'center', gap: 16, marginBottom: 80 }}>
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>01</span>
                    <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)' }} />
                    <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>About Me</span>
                </div>

                {/* Two columns */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    {/* Left — visual */}
                    <div className="lg:col-span-5" style={aLeft(100)}>
                        <div style={{
                            aspectRatio: '4/5', background: '#111',
                            border: '1px solid rgba(255,255,255,0.05)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Mask reveal overlay */}
                            <div style={{
                                position: 'absolute', inset: 0, background: '#0a0a0a', zIndex: 10,
                                transform: vis ? 'scaleX(0)' : 'scaleX(1)',
                                transformOrigin: 'right',
                                transition: 'transform 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.2s',
                            }} />
                            {/* Corner marks */}
                            {[['top','left'],['top','right'],['bottom','left'],['bottom','right']].map(([v,h]) => (
                                <div key={v+h} style={{
                                    position: 'absolute', [v]: 16, [h]: 16,
                                    width: 20, height: 20,
                                    borderTop: v==='top' ? '1px solid rgba(30,58,95,0.4)' : 'none',
                                    borderBottom: v==='bottom' ? '1px solid rgba(30,58,95,0.4)' : 'none',
                                    borderLeft: h==='left' ? '1px solid rgba(30,58,95,0.4)' : 'none',
                                    borderRight: h==='right' ? '1px solid rgba(30,58,95,0.4)' : 'none',
                                    animation: 'fadeIn 1s ease 0.8s both',
                                }} />
                            ))}
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 80, color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}>VA</span>
                                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}>Frontend Developer</span>
                            </div>
                            {/* Bottom accent line */}
                            <div style={{
                                position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                                background: 'linear-gradient(90deg, #1e3a5f, transparent)',
                                transformOrigin: 'left',
                                animation: vis ? 'expandWidth 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s both' : 'none',
                            }} />
                        </div>
                    </div>

                    {/* Right — content */}
                    <div className="lg:col-span-7" style={a(200)}>
                        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, color: '#fff', marginBottom: 24, letterSpacing: '-0.01em' }}>Crafting digital excellence through logic & aesthetics</h2>

                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, marginBottom: 40, maxWidth: 540 }}>
                            I’m a passionate Frontend Developer based in <span style={{ color: '#fff', fontWeight: 500 }}>Bogor, Indonesia</span>. With a strong foundation in the Laravel ecosystem, I specialize in building responsive, high-performance, and boldly styled web applications that bridge the gap between complex logic and seamless user experience.
                        </p>
                        <p style={{ ...a(350), fontSize: 15, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', marginBottom: 48, fontWeight: 300 }}>
                            I am a Software Engineering student at <span style={{ color: '#fff', fontWeight: 500 }}>SMKN 1 Ciomas</span> with a deep-rooted passion for bridging the gap between sophisticated design and robust functionality. While I specialize as a <span style={{ color: '#fff', fontWeight: 500 }}>Frontend Developer</span> dedicated to creating pixel-perfect, immersive interfaces, my experience in the <span style={{ color: '#fff', fontWeight: 500 }}>PHP Laravel</span>, ecosystem allows me to architect full-stack solutions with precision. From digitalizing local UMKM businesses to engineering seamless user experiences, I focus on writing clean, performant code that turns complex challenges into elegant digital realities.
                        </p>

                        {/* Tags with stagger animation */}
                        <div style={{ ...a(400), display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
                            {tags.map((t, i) => (
                                <span key={t} data-hover style={{
                                    fontFamily: 'Inter, sans-serif', fontSize: 10, fontWeight: 500,
                                    letterSpacing: '0.12em', textTransform: 'uppercase',
                                    padding: '8px 18px', border: '1px solid rgba(255,255,255,0.08)',
                                    color: 'rgba(255,255,255,0.4)',
                                    transition: 'border-color 0.3s, color 0.3s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.color = '#fff'; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* CTA */}
                        <div style={a(500)}>
                            <a href="#contact" data-hover style={{
                                fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: 11,
                                letterSpacing: '0.12em', textTransform: 'uppercase',
                                color: '#0a0a0a', background: '#fff',
                                padding: '14px 28px', textDecoration: 'none',
                                display: 'inline-flex', alignItems: 'center', gap: 10,
                                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#1e3a5f'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(30,58,95,0.3)'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a0a0a'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                LET'S BUILD THE FUTURE ↗
                            </a>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
}
