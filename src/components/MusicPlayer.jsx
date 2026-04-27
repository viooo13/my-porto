import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaMusic } from 'react-icons/fa';

const tracks = [
    { id: 1, title: '33x', artist: 'Perunggu', src: '/music/33x.mp3' },
    { id: 2, title: 'Thinking Bout You', artist: 'Ariana Grande', src: '/music/Thinking Bout You.mp3' },
    { id: 3, title: 'Sweet Scars', artist: 'Weird Genius', src: '/music/Sweet Scar feat Prince Husein.mp3' },
    { id: 4, title: 'Forever', artist: 'Gryffin', src: '/music/Forever feat Elley Duhé.mp3' },
    { id: 5, title: 'Ini Abadi', artist: 'Perunggu', src: '/music/Ini Abadi.mp3' },
    { id: 6, title: 'Best Part', artist: 'Daniel Caesar', src: '/music/Best Part feat HER.mp3' },
    { id: 7, title: 'Dont Look Back in Anger', artist: 'Oasis', src: '/music/Dont Look Back in Anger.mp3' },
    { id: 8, title: 'Gemilang', artist: 'Perunggu', src: '/music/Gemilang.mp3' },
    { id: 9, title: 'Stand by Me', artist: 'Oasis', src: '/music/Stand by Me.mp3' },
    { id: 10, title: 'Wonderwall Remastered', artist: 'Oasis', src: '/music/Wonderwall Remastered.mp3' },
];

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isIconHovered, setIsIconHovered] = useState(false);

    // Drag state — position is stored as {left, top} in px from viewport edges
    const [initialized, setInitialized] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const posStart = useRef({ left: 0, top: 0 });
    const [viewport, setViewport] = useState({ w: window.innerWidth, h: window.innerHeight });
    const PADDING = 20;

    // Set initial position to bottom-right on mount
    useEffect(() => {
        const w = document.documentElement.clientWidth;
        const h = window.innerHeight; // innerHeight is usually better for mobile to avoid address bar issues, but clientWidth is safer for scrollbars
        setPosition({ left: w - 48 - PADDING, top: h - 48 - PADDING });
        setViewport({ w, h });
        setInitialized(true);
    }, []);

    // Re-clamp base position when viewport changes (always based on 56x56 icon size)
    useEffect(() => {
        if (!initialized) return;
        setPosition(prev => ({
            left: Math.max(PADDING, Math.min(viewport.w - 56 - PADDING, prev.left)),
            top: Math.max(PADDING, Math.min(viewport.h - 56 - PADDING, prev.top)),
        }));
    }, [viewport.w, viewport.h, initialized]);

    // Track viewport size and re-clamp position on resize/orientation change
    useEffect(() => {
        const onResize = () => setViewport({ w: document.documentElement.clientWidth, h: window.innerHeight });
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const audioRef = useRef(null);
    const cardRef = useRef(null);
    const containerRef = useRef(null);
    const currentTrack = tracks[currentTrackIndex];

    // Drag handlers
    const hasDragged = useRef(false);

    const handleDragStart = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        dragStart.current = { x: clientX, y: clientY };
        posStart.current = { left: position.left, top: position.top };
        hasDragged.current = false;
        setIsDragging(true);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const dx = clientX - dragStart.current.x;
        const dy = clientY - dragStart.current.y;

        // Mark as dragged if moved more than 5px
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasDragged.current = true;
        }

        const rawLeft = posStart.current.left + dx;
        const rawTop = posStart.current.top + dy;

        const clampedLeft = Math.max(PADDING, Math.min(viewport.w - 56 - PADDING, rawLeft));
        const clampedTop = Math.max(PADDING, Math.min(viewport.h - 56 - PADDING, rawTop));

        if (containerRef.current) {
            containerRef.current.style.left = `${clampedLeft}px`;
            containerRef.current.style.top = `${clampedTop}px`;
        }
    };

    const handleDragEnd = () => {
        if (containerRef.current) {
            setPosition({
                left: parseInt(containerRef.current.style.left, 10) || position.left,
                top: parseInt(containerRef.current.style.top, 10) || position.top
            });
        }
        setIsDragging(false);
        // Clear hasDragged after a short delay
        setTimeout(() => { hasDragged.current = false; }, 50);
    };

    const handleClick = (e) => {
        if (hasDragged.current) {
            e.stopPropagation();
            return;
        }
        setIsOpen(true);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchmove', handleDragMove, { passive: false });
            window.addEventListener('touchend', handleDragEnd);
        }
        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
        else audioRef.current.pause();
    }, [isPlaying, currentTrackIndex]);

    useEffect(() => {
        const handleOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
                setIsHovered(false);
            }
        };
        if (isOpen || isHovered) {
            document.addEventListener('mousedown', handleOutside);
            document.addEventListener('touchstart', handleOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutside);
            document.removeEventListener('touchstart', handleOutside);
        };
    }, [isOpen, isHovered]);

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const c = audioRef.current.currentTime;
        const t = audioRef.current.duration || 1;
        setCurrentTime(c);
        setProgress((c / t) * 100);
    };

    const handleError = () => {
        setError('Audio tidak dapat diputar');
        setIsPlaying(false);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            setError(null);
        }
    };

    const changeTrack = (idx) => {
        setCurrentTrackIndex(idx);
        setIsPlaying(true);
        setError(null);
        setProgress(0);
        setCurrentTime(0);
    };

    const handleNext = () => changeTrack((currentTrackIndex + 1) % tracks.length);
    const handlePrev = () => changeTrack((currentTrackIndex - 1 + tracks.length) % tracks.length);
    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleSeek = (e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const p = (e.clientX - r.left) / r.width;
        if (audioRef.current) audioRef.current.currentTime = p * audioRef.current.duration;
    };

    const fmt = (t) => {
        if (!t || isNaN(t)) return '0:00';
        const m = Math.floor(t / 60), s = Math.floor(t % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const isRightHalf = position.left > viewport.w / 2;
    const isBottomHalf = position.top > viewport.h / 2;
    const ICON_SIZE = 56;
    const EXPANDED_WIDTH = 320;
    const EXPANDED_HEIGHT = 125;
    const isExpanded = isOpen || isHovered;

    return (
        <>
            <audio
                ref={audioRef}
                src={currentTrack.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleNext}
                onError={handleError}
            />
            <div
                ref={containerRef}
                style={{
                    position: 'fixed',
                    left: position.left,
                    top: position.top,
                    width: ICON_SIZE,
                    height: ICON_SIZE,
                    zIndex: 1000,
                    visibility: initialized ? 'visible' : 'hidden',
                }}
            >
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => !isOpen && setIsHovered(false)}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                    onClick={(e) => {
                        if (hasDragged.current) {
                            e.stopPropagation();
                            return;
                        }
                        setIsOpen(!isOpen);
                    }}
                    style={{
                        position: 'absolute',
                        top: isBottomHalf ? 'auto' : 0,
                        bottom: isBottomHalf ? 0 : 'auto',
                        left: isRightHalf ? 'auto' : 0,
                        right: isRightHalf ? 0 : 'auto',
                        height: isExpanded ? EXPANDED_HEIGHT : ICON_SIZE,
                        width: isExpanded ? EXPANDED_WIDTH : ICON_SIZE,
                        background: 'rgba(28,28,30,0.95)',
                        backdropFilter: 'blur(24px)',
                        borderRadius: isExpanded ? 16 : ICON_SIZE / 2,
                        boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                >
                    {/* The Anchor Icon (Only visible when closed) */}
                    <div
                        style={{
                            position: 'absolute',
                            top: isBottomHalf ? 'auto' : 0,
                            bottom: isBottomHalf ? 0 : 'auto',
                            left: isRightHalf ? 'auto' : 0,
                            right: isRightHalf ? 0 : 'auto',
                            width: ICON_SIZE,
                            height: ICON_SIZE,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(6,83,166,0.3)',
                            color: '#4a90d9',
                            opacity: isExpanded ? 0 : 1,
                            transition: 'opacity 0.2s',
                            animation: 'musicPulse 2s ease-in-out infinite',
                        }}
                        onMouseEnter={() => setIsIconHovered(true)}
                        onMouseLeave={() => setIsIconHovered(false)}
                    >
                        {/* Hover Tooltip - positioned to LEFT since icon is at right edge */}
                        {isIconHovered && !isExpanded && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                right: ICON_SIZE + 12,
                                transform: 'translateY(-50%)',
                                background: 'rgba(6,83,166,0.95)',
                                color: '#fff',
                                padding: '8px 16px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                letterSpacing: '0.1em',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(74,144,217,0.5)',
                                boxShadow: '0 4px 20px rgba(6,83,166,0.4)',
                                zIndex: 1000,
                                animation: 'tooltipFade 0.2s ease forwards',
                            }}>
                                MUSIC
                                <span style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '100%',
                                    transform: 'translateY(-50%)',
                                    width: 0, height: 0,
                                    borderTop: '6px solid transparent',
                                    borderBottom: '6px solid transparent',
                                    borderLeft: '6px solid rgba(6,83,166,0.95)',
                                }} />
                            </div>
                        )}
                        {isPlaying ? (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 16 }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} style={{
                                        width: 3, borderRadius: 1.5, background: '#4a90d9',
                                        animation: `eqBounce ${0.4 + i * 0.1}s ease-in-out infinite alternate`,
                                    }} />
                                ))}
                            </div>
                        ) : (
                            <FaMusic size={18} />
                        )}
                        {/* Drag indicator dots */}
                        <div style={{ position: 'absolute', bottom: 8, display: 'flex', gap: 3, opacity: 0.6 }}>
                            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#fff' }} />
                            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#fff' }} />
                        </div>
                    </div>

                    {/* Expanding Content (Card Layout) */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', flexDirection: 'column',
                        padding: '12px 16px', boxSizing: 'border-box',
                        opacity: isExpanded ? 1 : 0,
                        transition: 'opacity 0.3s',
                        transitionDelay: isExpanded ? '0.15s' : '0s',
                        pointerEvents: isExpanded ? 'auto' : 'none',
                    }}>
                        {/* Top: Text + EQ */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingRight: 16 }}>
                                <span style={{
                                    color: '#fff', fontSize: 16, fontWeight: 700,
                                    fontFamily: '"Inter", sans-serif',
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                    {currentTrack.title}
                                </span>
                                <span style={{
                                    color: 'rgba(255,255,255,0.5)', fontSize: 13,
                                    fontFamily: '"Inter", sans-serif', marginTop: 2,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                    {currentTrack.artist}
                                </span>
                            </div>

                            {/* Equalizer bars */}
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 16, marginTop: 4 }}>
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} style={{
                                        width: 4, borderRadius: 2, background: '#4a90d9',
                                        animation: isPlaying ? `eqBounce ${0.35 + i * 0.1}s ease-in-out infinite alternate` : 'none',
                                        height: isPlaying ? '16px' : '4px',
                                    }} />
                                ))}
                            </div>
                        </div>

                        {/* Middle: Progress Bar with Timer */}
                        <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column' }}>
                            <div onClick={handleSeek} onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()} style={{
                                height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, cursor: 'pointer', position: 'relative'
                            }}>
                                <div style={{ width: `${progress}%`, height: '100%', background: '#4a90d9', borderRadius: 2, transition: 'width 0.1s linear' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: '"Inter", sans-serif' }}>
                                <span>{fmt(currentTime)}</span>
                                <span>{fmt(duration)}</span>
                            </div>
                        </div>

                        {/* Bottom: Controls */}
                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }} onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
                            {/* Volume Icon */}
                            <div style={{ position: 'absolute', left: 0, color: 'rgba(255,255,255,0.5)', fontSize: 16, cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"></path><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"></path></svg>
                            </div>

                            <FaStepBackward
                                onClick={handlePrev}
                                style={{ cursor: 'pointer', color: '#ccc', fontSize: 16, marginRight: 24, transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                            />

                            <div
                                onClick={togglePlay}
                                style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: '#0653a6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: '#fff', fontSize: 14,
                                    boxShadow: '0 4px 14px rgba(6,83,166,0.3)',
                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                    marginTop: -7,
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.06)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(6,83,166,0.5)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(6,83,166,0.3)';
                                }}
                            >
                                {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: 3 }} />}
                            </div>

                            <FaStepForward
                                onClick={handleNext}
                                style={{ cursor: 'pointer', color: '#ccc', fontSize: 18, marginLeft: 24, transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#ccc'}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes eqBounce {
                    0% { height: 4px; }
                    100% { height: 16px; }
                }
                @keyframes musicPulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(74,144,217,0.6); }
                    50% { box-shadow: 0 0 0 16px rgba(74,144,217,0); }
                }
                @keyframes tooltipFade {
                    from { opacity: 0; transform: translateY(-50%) translateX(-4px); }
                    to { opacity: 1; transform: translateY(-50%) translateX(0); }
                }
            `}</style>
        </>
    );
}
