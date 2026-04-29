import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
    useEffect(() => {
        // Initialize Lenis with optimized settings for performance
        const lenis = new Lenis({
            lerp: 0.08, // 'lerp' (Linear Interpolation) is much lighter on the CPU than complex easing functions
            wheelMultiplier: 1,
            smoothTouch: false, // Strictly keep false so mobile uses its own highly-optimized native scrolling
            touchMultiplier: 2,
            syncTouch: false, // Prevent syncing touch to improve mobile performance
            syncTouchLerp: 0.08,
        });

        let rafId;

        // Request animation frame loop
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Cleanup on unmount (CRITICAL to prevent lag from multiple RAF loops during hot-reloads)
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
