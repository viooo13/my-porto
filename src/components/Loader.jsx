import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── overlay exit ── */
const overlayVariants = {
    visible: { y: '0%' },
    exit: {
        y: '-100%',
        transition: {
            duration: 1.0,
            ease: [0.76, 0, 0.24, 1],
        },
    },
};

export default function Loader({ onComplete, isExiting = false }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete?.();
        }, 3200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isExiting && (
                <motion.div
                    key="loader-overlay"
                    variants={overlayVariants}
                    initial="visible"
                    exit="exit"
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 99999,
                        background: '#0a0a0a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {/* Subtle glow */}
                    <div
                        style={{
                            position: 'absolute',
                            width: '500px',
                            height: '500px',
                            
                            pointerEvents: 'none',
                        }}
                    />

                    {/* Photo loader */}
                    <div style={{ overflow: 'hidden', padding: '10px 20px' }}>
                        <motion.img
                            src="/logo.png"
                            alt="Loading"
                            initial={{ y: '110%', opacity: 0 }}
                            animate={{ y: '0%', opacity: 1 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.3,
                            }}
                            style={{
                                width: 'clamp(150px, 30vw, 300px)',
                                height: 'auto',
                                display: 'block',
                                objectFit: 'contain',
                            }}
                        />
                    </div>

                    {/* Progress bar */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: 'rgba(255,255,255,0.03)',
                            overflow: 'hidden',
                        }}
                    >
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: 3.0,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                background:
                                    'linear-gradient(90deg, #1e3a5f, #2a5a8f)',
                                transformOrigin: 'left',
                            }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
