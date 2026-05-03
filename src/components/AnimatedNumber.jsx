import React, { useEffect, useRef, useState } from 'react';

// Animated counter hook
export const useCounter = (target, duration = 1000, start = 0) => {
    const [count, setCount] = useState(start);
    const [isAnimating, setIsAnimating] = useState(false);
    const frameRef = useRef();

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            setCount(current);

            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setCount(target);
                setIsAnimating(false);
            }
        };

        frameRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, []);

    return { count, startAnimation };
};

// Animated number component
export const AnimatedNumber = ({ value, pad = 2, trigger, duration = 1200 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const hasAnimated = useRef(false);
    const frameRef = useRef();

    useEffect(() => {
        if (trigger && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                // Use Math.round to handle smaller numbers more gracefully
                const current = Math.round(value * easeOut);

                setDisplayValue(current);

                if (progress < 1) {
                    frameRef.current = requestAnimationFrame(animate);
                } else {
                    setDisplayValue(value);
                }
            };

            frameRef.current = requestAnimationFrame(animate);
        }

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [trigger, value]);

    return <span>{String(displayValue).padStart(pad, '0')}</span>;
};
