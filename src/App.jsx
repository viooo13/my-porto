import { useEffect, useState, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Hero from './pages/hero/Hero.jsx';
import About from './pages/about/About.jsx';
import Skills from './pages/skills/Skills.jsx';
import Project from './pages/project/Project.jsx';
import ProjectDetails from './pages/project/ProjectDetails.jsx';
import Certificates from './pages/certificates/Certificates.jsx';
import Education from './pages/education/Education.jsx';
import Contact from './pages/contact/Contact.jsx';
import Lenis from 'lenis';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

/* ── Custom Cursor ── */
function Cursor() {
    const { pathname } = useLocation();
    const dot = useRef(null);
    const aimRef = useRef(null);
    const bracketsRef = useRef(null);
    const activeTarget = useRef(null);

    // Reset cursor hover state on route change
    useEffect(() => {
        activeTarget.current = null;
        if (bracketsRef.current) bracketsRef.current.style.opacity = '0';
        if (aimRef.current) aimRef.current.style.opacity = '1';
    }, [pathname]);

    useEffect(() => {
        let rafId;
        let isTicking = false;

        const updateBrackets = () => {
            if (activeTarget.current && bracketsRef.current) {
                rafId = requestAnimationFrame(() => {
                    if (!activeTarget.current) return;
                    const rect = activeTarget.current.getBoundingClientRect();
                    const pad = 4;
                    bracketsRef.current.style.width = `${rect.width + pad * 2}px`;
                    bracketsRef.current.style.height = `${rect.height + pad * 2}px`;
                    bracketsRef.current.style.left = `${rect.left + rect.width / 2}px`;
                    bracketsRef.current.style.top = `${rect.top + rect.height / 2}px`;
                });
            }
        };

        const move = (e) => {
            if (!isTicking) {
                window.requestAnimationFrame(() => {
                    if (dot.current) {
                        dot.current.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
                    }
                    if (aimRef.current) {
                        aimRef.current.style.transform = `translate3d(${e.clientX - 16}px, ${e.clientY - 16}px, 0)`;
                    }
                    isTicking = false;
                });
                isTicking = true;
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
            if (rafId) cancelAnimationFrame(rafId);
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
                    left: 0, top: 0,
                    transform: 'translate3d(-50%, -50%, 0)',
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
                    left: 0, top: 0,
                    transform: 'translate3d(-50%, -50%, 0)',
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

/* ── Smooth Scroll (Lenis) ── */
function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.5, // Controls the duration of the smooth scroll, giving it a 60fps feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
  return null;
}

/* ── Scroll Progress ── */
function ScrollProgress() {
    const barRef = useRef(null);
    useEffect(() => {
        let ticking = false;
        const fn = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    if (barRef.current) {
                        const h = document.documentElement.scrollHeight - window.innerHeight;
                        const progress = h > 0 ? (window.scrollY / h) * 100 : 0;
                        barRef.current.style.width = `${progress}%`;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);
    return <div ref={barRef} className="scroll-progress" style={{ width: '0%' }} />;
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

function Home() {
    return (
        <div style={{ opacity: 0, animation: 'fadeIn 0.8s ease 0.15s forwards' }}>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Education />
                <Skills />
                <Project />
                <Certificates />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

/* ── App ── */
export default function App() {
    return (
        <BrowserRouter>
            <SmoothScroll />
            <ScrollToTop />
            <div style={{ minHeight: '100vh' }}>
                <Cursor />
                <ScrollProgress />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                </Routes>
                <MusicPlayer />
            </div>
        </BrowserRouter>
    );
}