import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { projectsData } from '../../data/projectsData';
import { HiArrowLeft, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { StyledWord } from '../../components/StyledWord';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const found = projectsData.find(p => p.id === id || p.id === `0${id}` || parseInt(p.id) === parseInt(id));
        if (found) setProject(found);
    }, [id]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    if (!project) {
        return (
            <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#fff', fontSize: 20 }}>Project not found.</p>
                <button onClick={() => navigate('/')} style={{ color: '#4a90d9', marginLeft: 20 }}>Back to Home</button>
            </div>
        );
    }

    return (
        <section style={{ background: '#0a0a0a', minHeight: '100vh', padding: '120px 40px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {/* Back Button */}
                <button 
                    onClick={() => navigate('/#projects')}
                    data-hover
                    style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        color: 'rgba(255,255,255,0.6)', background: 'transparent', 
                        border: 'none', cursor: 'none', marginBottom: 60,
                        fontSize: 14, fontFamily: 'Plus Jakarta Sans, sans-serif',
                        textTransform: 'uppercase', letterSpacing: '0.1em'
                    }}
                >
                    <HiArrowLeft size={20} /> Back to Projects
                </button>

                <h1 style={{ 
                    fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, 
                    fontSize: 'clamp(48px, 6vw, 96px)', lineHeight: 0.95, 
                    color: '#fff', marginBottom: 40, letterSpacing: '-0.02em',
                    textTransform: 'uppercase'
                }}>
                    <StyledWord text={project.title.split('\n')[0]} color="#fff" />
                    {project.title.split('\n')[1] && (
                        <>
                            <br />
                            <StyledWord text={project.title.split('\n')[1]} color="#1e3a5f" />
                        </>
                    )}
                </h1>

                <p style={{ fontSize: 18, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 40, fontWeight: 300 }}>
                    {project.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 80 }}>
                    {project.tags.map(t => (
                        <span key={t} style={{
                            fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '8px 20px', border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.5)', borderRadius: 4
                        }}>{t}</span>
                    ))}
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 80 }} />

                {/* Detail Description */}
                <div style={{ marginBottom: 80 }}>
                    <h2 style={{ fontSize: 24, color: '#fff', marginBottom: 24, fontWeight: 600 }}>Project Details</h2>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                        {project.details}
                    </p>
                </div>

                {/* Image Carousel */}
                <div style={{ position: 'relative', width: '100%', marginBottom: 60 }}>
                    <div style={{ 
                        width: '100%', aspectRatio: '16/9', background: '#111', 
                        border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden', position: 'relative'
                    }}>
                        {/* Images */}
                        {project.images.map((img, idx) => (
                            <div 
                                key={idx} 
                                style={{
                                    position: 'absolute', inset: 0,
                                    opacity: currentImageIndex === idx ? 1 : 0,
                                    transition: 'opacity 0.5s ease-in-out',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: '#1a1a1a'
                                }}
                            >
                                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 20 }}>Project Image {idx + 1}</span>
                                {/* Remove the span above and use <img src={img} alt={`Slide ${idx+1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> when you have real images */}
                            </div>
                        ))}

                        {/* Navigation Controls */}
                        <button 
                            onClick={prevImage}
                            data-hover
                            style={{
                                position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
                                width: 48, height: 48, borderRadius: '50%',
                                background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'none', zIndex: 10
                            }}
                        >
                            <HiChevronLeft size={24} />
                        </button>

                        <button 
                            onClick={nextImage}
                            data-hover
                            style={{
                                position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
                                width: 48, height: 48, borderRadius: '50%',
                                background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'none', zIndex: 10
                            }}
                        >
                            <HiChevronRight size={24} />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
                        {project.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                data-hover
                                style={{
                                    width: currentImageIndex === idx ? 24 : 8,
                                    height: 8,
                                    borderRadius: 4,
                                    background: currentImageIndex === idx ? '#4a90d9' : 'rgba(255,255,255,0.2)',
                                    border: 'none', cursor: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
