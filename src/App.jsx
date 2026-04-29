import { useEffect, useState, useRef, useCallback } from 'react';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import SmoothScroll from './components/SmoothScroll.jsx';
import Hero from './pages/hero/Hero.jsx';
import About from './pages/about/About.jsx';
import Skills from './pages/skills/Skills.jsx';
import Project from './pages/project/Project.jsx';
import Certificates from './pages/certificates/Certificates.jsx';
import Contact from './pages/contact/Contact.jsx';

/* ── Custom Cursor ── */
function Cursor() {
    const dot = useRef(null);
    const aimRef = useRef(null);
    const bracketsRef = useRef(null);
    const activeTarget = useRef(null);

    useEffect(() => {
        const updateBrackets = () => {
            if (activeTarget.current && bracketsRef.current) {
                const rect = activeTarget.current.getBoundingClientRect();
                const pad = 4;
                bracketsRef.current.style.width = `${rect.width + pad * 2}px`;
                bracketsRef.current.style.height = `${rect.height + pad * 2}px`;
                bracketsRef.current.style.left = `${rect.left + rect.width / 2}px`;
                bracketsRef.current.style.top = `${rect.top + rect.height / 2}px`;
            }
        };

        const move = (e) => {
            if (dot.current) {
                dot.current.style.left = `${e.clientX}px`;
                dot.current.style.top = `${e.clientY}px`;
            }
            if (aimRef.current) {
                aimRef.current.style.left = `${e.clientX}px`;
                aimRef.current.style.top = `${e.clientY}px`;
            }
        };

        const over = (e) => {
            const t = e.target.closest('a, button, [data-hover], input, textarea');
            if (t && bracketsRef.current) {
                activeTarget.current = t;
                bracketsRef.current.style.transform = 'translate(-50%, -50%)';
                bracketsRef.current.style.opacity = '1';
                if (aimRef.current) aimRef.current.style.opacity = '0';
                updateBrackets();
            }
        };

        const out = (e) => {
            const t = e.target.closest('a, button, [data-hover], input, textarea');
            if (t && bracketsRef.current) {
                const related = e.relatedTarget;
                if (!related || !related.closest('a, button, [data-hover], input, textarea')) {
                    activeTarget.current = null;
                    bracketsRef.current.style.opacity = '0';
                    if (aimRef.current) aimRef.current.style.opacity = '1';
                }
            }
        };

        window.addEventListener('mousemove', move);
        document.addEventListener('mouseover', over);
        document.addEventListener('mouseout', out);
        window.addEventListener('scroll', updateBrackets, { passive: true });
        return () => {
            window.removeEventListener('mousemove', move);
            document.removeEventListener('mouseover', over);
            document.removeEventListener('mouseout', out);
            window.removeEventListener('scroll', updateBrackets);
        };
    }, []);

    return (
        <>
            <div
                ref={aimRef}
                className="cursor-aim"
                style={{
                    position: 'fixed',
                    zIndex: 99997,
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                    transition: 'opacity 0.1s ease',
                }}
            >
                <div className="aim-rotate">
                    <div className="aim-corner tl" />
                    <div className="aim-corner tr" />
                    <div className="aim-corner bl" />
                    <div className="aim-corner br" />
                </div>
            </div>
            <div
                ref={dot}
                className="cursor-dot"
                style={{
                    position: 'fixed',
                    zIndex: 99999,
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <div
                ref={bracketsRef}
                className="cursor-brackets"
                style={{
                    position: 'fixed',
                    zIndex: 99998,
                    pointerEvents: 'none',
                    opacity: 0,
                    transition: 'opacity 0.1s ease',
                }}
            >
                <div className="cursor-corner tl" />
                <div className="cursor-corner tr" />
                <div className="cursor-corner bl" />
                <div className="cursor-corner br" />
            </div>
        </>
    );
}

/* ── Scroll Progress ── */
function ScrollProgress() {
    const [w, setW] = useState(0);
    useEffect(() => {
        const fn = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            setW(h > 0 ? (window.scrollY / h) * 100 : 0);
        };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);
    return <div className="scroll-progress" style={{ width: `${w}%` }} />;
}

/* ── Scroll reveal observer hook ── */
export function useReveal(threshold = 0.1) {
    const observe = useCallback((node) => {
        if (!node) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); } },
            { threshold }
        );
        // observe all .reveal / .reveal-left / .reveal-right / .reveal-scale children
        node.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, [threshold]);
    return observe;
}

/* ── App ── */
export default function App() {
    const [done, setDone] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [showLoader, setShow] = useState(true);

    const handleComplete = useCallback(() => {
        setExiting(true);
        // Wait for exit animation to finish before removing loader
        setTimeout(() => {
            setDone(true);
            setShow(false);
        }, 1200);
    }, []);

    return (
        <SmoothScroll>
            <div style={{ minHeight: '100vh' }}>
                {showLoader && <Loader isExiting={exiting} onComplete={handleComplete} />}
                {done && <Cursor />}
                {done && <ScrollProgress />}
                {done && (
                    <div style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0.15s forwards' }}>
                        <Navbar />
                        <main>
                            <Hero />
                            <About />
                            <Skills />
                            <Project />
                            <Certificates />
                            <Contact />
                        </main>
                        <Footer />
                    </div>
                )}
                {done && <MusicPlayer />}
            </div>
        </SmoothScroll>
    );
}