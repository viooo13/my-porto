import { useState, useRef, useEffect, useCallback } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaMusic, FaTimes, FaVolumeUp, FaVolumeDown, FaVolumeMute } from 'react-icons/fa';
import { MdOutlineLyrics, MdLyrics } from 'react-icons/md';
import { bundledLyrics } from '../data/lyricsData';

const tracks = [
    { id: 1, title: '33x', artist: 'Perunggu', src: '/music/33x.mp3' },
    { id: 2, title: 'Thinking Bout You', artist: 'Ariana Grande', src: '/music/Thinking Bout You.mp3' },
    { id: 3, title: 'Sweet Scars', artist: 'Weird Genius', src: '/music/Sweet Scar feat Prince Husein.mp3' },
    { id: 4, title: 'Forever', artist: 'Gryffin', src: '/music/Forever feat Elley Duhé.mp3' },
    { id: 5, title: 'Ini Abadi', artist: 'Perunggu', src: '/music/Ini Abadi.mp3' },
    { id: 6, title: 'Best Part', artist: 'Daniel Caesar', src: '/music/Best Part feat HER.mp3' },
    { id: 7, title: 'Dont Look Back in Anger', artist: 'Oasis', src: '/music/Dont Look Back in Anger Remastered.mp3' },
    { id: 8, title: 'Gemilang', artist: 'Perunggu', src: '/music/Gemilang.mp3' },
    { id: 9, title: 'Stand by Me', artist: 'Oasis', src: '/music/Stand by Me.mp3' },
    { id: 10, title: 'Wonderwall Remastered', artist: 'Oasis', src: '/music/Wonderwall Remastered.mp3' },
    { id: 11, title: 'Who Knows', artist: 'Daniel Caesar', src: '/music/Who Knows.mp3' },
    { id: 12, title: 'Secukupnya', artist: 'Hindia', src: '/music/Hindia - Secukupnya (Official Lyric Commentary Video).mp3' },
    { id: 13, title: 'Bertaut', artist: 'Nadin Amizah', src: '/music/Nadin Amizah - Bertaut (Official Music Video).mp3' },
    { id: 14, title: 'Teh Hijau', artist: 'TULUS', src: '/music/TULUS - Teh Hijau (Official Lyric Video).mp3' },
    { id: 15, title: 'Sesi Potret', artist: 'eńau feat. Ari Lesmana', src: '/music/eńau feat. Ari Lesmana - Sesi Potret (Official Music Video).mp3' },
];

const ICON_SIZE = 58;
const PADDING = 20;

function parseLrc(lrc) {
    if (!lrc || typeof lrc !== 'string') return [];
    const result = [];
    const lines = lrc.split(/\r?\n/);
    const timeRegex = /\[(\d{1,3}):(\d{2})(?:\.(\d{1,3}))?\]/g;

    for (const rawLine of lines) {
        const matches = [...rawLine.matchAll(timeRegex)];
        if (matches.length === 0) continue;
        const text = rawLine.replace(timeRegex, '').trim();
        if (!text) continue;
        for (const m of matches) {
            const mins = parseInt(m[1], 10);
            const secs = parseInt(m[2], 10);
            const frac = m[3] ? parseInt(m[3].padEnd(3, '0'), 10) / 1000 : 0;
            result.push({ time: mins * 60 + secs + frac, text });
        }
    }
    result.sort((a, b) => a.time - b.time);
    return result;
}

function normalizeQueryTitle(title) {
    return title
        .replace(/\s*Remastered\s*/i, '')
        .replace(/^Sweet Scars$/i, 'Sweet Scar')
        .replace(/^Dont\b/i, "Don't")
        .trim();
}

function normalizeQueryArtist(artist) {
    return artist
        .split(/\s+feat\./i)[0]
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

async function fetchTrackLyrics(track, audioDuration) {
    if (bundledLyrics[track.id]) {
        return bundledLyrics[track.id];
    }

    const cleanTitle = normalizeQueryTitle(track.title);
    const cleanArtist = normalizeQueryArtist(track.artist);

    const tryFetchJson = async (url) => {
        for (let attempt = 0; attempt < 2; attempt++) {
            const res = await fetch(url);
            if (res.ok) return res.json();
            await new Promise(r => setTimeout(r, 450));
        }
        return [];
    };

    try {
        const searchUrl = `https://lrclib.net/api/search?track_name=${encodeURIComponent(cleanTitle)}&artist_name=${encodeURIComponent(cleanArtist)}`;
        let data = await tryFetchJson(searchUrl);

        if (!Array.isArray(data) || data.length === 0) {
            const fallbackUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(`${cleanTitle} ${cleanArtist}`)}`;
            data = await tryFetchJson(fallbackUrl);
        }

        if (!Array.isArray(data) || data.length === 0) {
            return { status: 'empty', synced: false, lines: [] };
        }

        const parsedSynced = data
            .filter(item => item && item.syncedLyrics)
            .map(item => ({ item, lines: parseLrc(item.syncedLyrics) }))
            .filter(entry => entry.lines.length > 0);

        if (parsedSynced.length > 0) {
            const maxLines = Math.max(...parsedSynced.map(entry => entry.lines.length));
            const completePool = parsedSynced.filter(entry => entry.lines.length >= Math.ceil(maxLines * 0.75));
            const pool = completePool.length > 0 ? completePool : parsedSynced;

            let best = pool[0];
            if (audioDuration > 0) {
                best = pool.reduce((prev, curr) => {
                    const prevDiff = Math.abs((prev.item.duration || 0) - audioDuration);
                    const currDiff = Math.abs((curr.item.duration || 0) - audioDuration);
                    if (Math.abs(currDiff - prevDiff) <= 2) {
                        return curr.lines.length > prev.lines.length ? curr : prev;
                    }
                    return currDiff < prevDiff ? curr : prev;
                }, pool[0]);
            }

            return { status: 'loaded', synced: true, lines: best.lines };
        }

        const plainCandidates = data
            .filter(item => item && item.plainLyrics)
            .map(item => item.plainLyrics.split(/\r?\n/).map(t => t.trim()).filter(Boolean))
            .filter(lines => lines.length > 0);

        if (plainCandidates.length > 0) {
            const fullestPlain = plainCandidates.reduce(
                (prev, curr) => (curr.length > prev.length ? curr : prev),
                plainCandidates[0]
            );
            return {
                status: 'loaded',
                synced: false,
                lines: fullestPlain.map((text, idx) => ({ time: idx, text })),
            };
        }

        return { status: 'empty', synced: false, lines: [] };
    } catch {
        return { status: 'error', synced: false, lines: [] };
    }
}

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [isDraggingVolume, setIsDraggingVolume] = useState(false);
    const [showHint, setShowHint] = useState(true);
    const [showLyrics, setShowLyrics] = useState(false);
    const [lyricsMap, setLyricsMap] = useState({});

    // Drag state — position is stored as {left, top} in px from viewport edges
    const [viewport, setViewport] = useState(() => ({
        w: typeof document !== 'undefined' ? document.documentElement.clientWidth : 1440,
        h: typeof window !== 'undefined' ? window.innerHeight : 900,
    }));
    const [position, setPosition] = useState(() => {
        const w = typeof document !== 'undefined' ? document.documentElement.clientWidth : 1440;
        const h = typeof window !== 'undefined' ? window.innerHeight : 900;
        const isMobile = w <= 768;
        return {
            left: Math.max(PADDING, w - ICON_SIZE - (isMobile ? 20 : 28)),
            top: isMobile ? Math.max(PADDING, h - ICON_SIZE - 24) : Math.max(90, h - 250),
        };
    });
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef({ x: 0, y: 0 });
    const posStart = useRef({ left: 0, top: 0 });
    const hasDragged = useRef(false);

    // Track viewport size and re-clamp position on resize/orientation change
    useEffect(() => {
        const onResize = () => {
            const w = document.documentElement.clientWidth;
            const h = window.innerHeight;
            setViewport({ w, h });
            setPosition(prev => ({
                left: Math.max(PADDING, Math.min(w - ICON_SIZE - PADDING, prev.left)),
                top: Math.max(PADDING, Math.min(h - ICON_SIZE - PADDING, prev.top)),
            }));
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const audioRef = useRef(null);
    const audioCtxRef = useRef(null);
    const gainNodeRef = useRef(null);
    const containerRef = useRef(null);
    const volumeBarRef = useRef(null);
    const lyricsContainerRef = useRef(null);
    const activeLineRef = useRef(null);
    const currentTrack = tracks[currentTrackIndex];

    const applyVolumeToAudio = useCallback((vol, muted) => {
        const effective = muted ? 0 : Math.max(0, Math.min(1, vol));
        const taperedGain = effective * effective;

        if (gainNodeRef.current && audioCtxRef.current) {
            gainNodeRef.current.gain.setValueAtTime(taperedGain, audioCtxRef.current.currentTime);
            if (audioRef.current) {
                try { audioRef.current.volume = 1; } catch { /* read-only on iOS */ }
                audioRef.current.muted = effective === 0;
            }
        } else if (audioRef.current) {
            try { audioRef.current.volume = taperedGain; } catch { /* read-only on iOS */ }
            audioRef.current.muted = effective === 0;
        }
    }, []);

    const ensureAudioGraph = useCallback((overrideVol, overrideMuted) => {
        if (!audioRef.current) return;
        try {
            if (typeof navigator !== 'undefined' && navigator.audioSession) {
                navigator.audioSession.type = 'playback';
            }
            if (!audioCtxRef.current) {
                const AudioCtx = window.AudioContext || window.webkitAudioContext;
                if (AudioCtx) {
                    const ctx = new AudioCtx();
                    const source = ctx.createMediaElementSource(audioRef.current);
                    const gain = ctx.createGain();
                    const effective = overrideMuted ? 0 : Math.max(0, Math.min(1, overrideVol));
                    gain.gain.value = effective * effective;
                    source.connect(gain);
                    gain.connect(ctx.destination);
                    audioCtxRef.current = ctx;
                    gainNodeRef.current = gain;
                    try { audioRef.current.volume = 1; } catch { /* read-only on iOS */ }
                }
            }
            if (
                audioCtxRef.current &&
                audioCtxRef.current.state !== 'running' &&
                audioCtxRef.current.state !== 'closed'
            ) {
                audioCtxRef.current.resume().catch(() => {});
            }
        } catch {
            // Fallback to native HTMLAudioElement volume if Web Audio API is unavailable
        }
    }, []);

    useEffect(() => {
        return () => {
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
                audioCtxRef.current.close().catch(() => {});
            }
        };
    }, []);

    const handleDragStart = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        dragStart.current = { x: clientX, y: clientY };
        posStart.current = { left: position.left, top: position.top };
        hasDragged.current = false;
        setIsDragging(true);
    };

    useEffect(() => {
        if (!isDragging) return;

        const onMove = (e) => {
            e.preventDefault();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const dx = clientX - dragStart.current.x;
            const dy = clientY - dragStart.current.y;

            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                hasDragged.current = true;
            }

            const w = document.documentElement.clientWidth;
            const h = window.innerHeight;
            const clampedLeft = Math.max(PADDING, Math.min(w - ICON_SIZE - PADDING, posStart.current.left + dx));
            const clampedTop = Math.max(PADDING, Math.min(h - ICON_SIZE - PADDING, posStart.current.top + dy));

            if (containerRef.current) {
                containerRef.current.style.left = `${clampedLeft}px`;
                containerRef.current.style.top = `${clampedTop}px`;
            }
        };

        const onEnd = () => {
            if (containerRef.current) {
                setPosition(prev => ({
                    left: parseInt(containerRef.current.style.left, 10) || prev.left,
                    top: parseInt(containerRef.current.style.top, 10) || prev.top,
                }));
            }
            setIsDragging(false);
            setTimeout(() => { hasDragged.current = false; }, 50);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('touchend', onEnd);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onEnd);
            window.removeEventListener('touchmove', onMove);
            window.removeEventListener('touchend', onEnd);
        };
    }, [isDragging]);

    useEffect(() => {
        applyVolumeToAudio(volume, isMuted);
    }, [volume, isMuted, applyVolumeToAudio]);

    useEffect(() => {
        if (!isDraggingVolume) return;

        const updateFromEvent = (e) => {
            if (!volumeBarRef.current) return;
            if (e.cancelable) e.preventDefault();
            const touch = e.touches?.[0] || e.changedTouches?.[0];
            const clientX = touch ? touch.clientX : e.clientX;
            const rect = volumeBarRef.current.getBoundingClientRect();
            const nextVol = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            applyVolumeToAudio(nextVol, nextVol === 0);
            setVolume(nextVol);
            setIsMuted(nextVol === 0);
        };

        const stopVolumeDrag = () => setIsDraggingVolume(false);

        window.addEventListener('mousemove', updateFromEvent);
        window.addEventListener('mouseup', stopVolumeDrag);
        window.addEventListener('touchmove', updateFromEvent, { passive: false });
        window.addEventListener('touchend', stopVolumeDrag);
        window.addEventListener('touchcancel', stopVolumeDrag);
        return () => {
            window.removeEventListener('mousemove', updateFromEvent);
            window.removeEventListener('mouseup', stopVolumeDrag);
            window.removeEventListener('touchmove', updateFromEvent);
            window.removeEventListener('touchend', stopVolumeDrag);
            window.removeEventListener('touchcancel', stopVolumeDrag);
        };
    }, [isDraggingVolume, applyVolumeToAudio]);

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
        setIsPlaying(false);
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
            applyVolumeToAudio(volume, isMuted);
        }
    };

    const changeTrack = (idx) => {
        ensureAudioGraph(volume, isMuted);
        setCurrentTrackIndex(idx);
        setIsPlaying(true);
        setProgress(0);
        setCurrentTime(0);
    };

    const handleNext = () => changeTrack((currentTrackIndex + 1) % tracks.length);
    const handlePrev = () => changeTrack((currentTrackIndex - 1 + tracks.length) % tracks.length);
    const togglePlay = () => {
        ensureAudioGraph(volume, isMuted);
        setIsPlaying(prev => !prev);
    };
    const toggleMute = (e) => {
        e.stopPropagation();
        if (isMuted || volume === 0) {
            const restored = volume === 0 ? 0.5 : volume;
            ensureAudioGraph(restored, false);
            applyVolumeToAudio(restored, false);
            setVolume(restored);
            setIsMuted(false);
        } else {
            ensureAudioGraph(volume, true);
            applyVolumeToAudio(volume, true);
            setIsMuted(true);
        }
    };

    const handleVolumeBarDown = (e) => {
        e.stopPropagation();
        if (e.cancelable) e.preventDefault();
        if (!volumeBarRef.current) return;
        const touch = e.touches?.[0] || e.changedTouches?.[0];
        const clientX = touch ? touch.clientX : e.clientX;
        const rect = volumeBarRef.current.getBoundingClientRect();
        const nextVol = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        ensureAudioGraph(nextVol, nextVol === 0);
        applyVolumeToAudio(nextVol, nextVol === 0);
        setVolume(nextVol);
        setIsMuted(nextVol === 0);
        setIsDraggingVolume(true);
    };

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

    const isMobile = viewport.w <= 768;
    const isRightHalf = position.left > viewport.w / 2;
    const isBottomHalf = position.top > viewport.h / 2;
    const EXPANDED_WIDTH = Math.min(320, viewport.w - PADDING * 2);
    const EXPANDED_HEIGHT = showLyrics
        ? Math.min(308, viewport.h - PADDING * 2)
        : 132;
    const isExpanded = isOpen || isHovered;
    const effectiveVolume = isMuted ? 0 : volume;
    const currentLyrics = bundledLyrics[currentTrack.id] || lyricsMap[currentTrack.id];

    const activeLyricIndex = (() => {
        if (!currentLyrics || currentLyrics.status !== 'loaded' || !currentLyrics.synced) return -1;
        const lines = currentLyrics.lines;
        let idx = -1;
        const t = currentTime + 0.15;
        for (let i = 0; i < lines.length; i++) {
            if (t >= lines[i].time) idx = i;
            else break;
        }
        return idx;
    })();

    useEffect(() => {
        if (!showLyrics) return;
        if (bundledLyrics[currentTrack.id] || lyricsMap[currentTrack.id]) return;

        let cancelled = false;
        (async () => {
            const entry = await fetchTrackLyrics(currentTrack, audioRef.current?.duration || 0);
            if (!cancelled) {
                setLyricsMap(prev => ({ ...prev, [currentTrack.id]: entry }));
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [showLyrics, currentTrack, lyricsMap]);

    useEffect(() => {
        if (!showLyrics || !isExpanded) return;

        const scrollActiveLine = (behavior = 'smooth') => {
            const container = lyricsContainerRef.current;
            if (!container) return;

            if (activeLyricIndex < 0) {
                container.scrollTo({ top: 0, behavior });
                return;
            }

            const activeEl = activeLineRef.current;
            if (!activeEl) return;

            const targetTop = activeEl.offsetTop - container.clientHeight / 2 + activeEl.offsetHeight / 2;
            container.scrollTo({
                top: Math.max(0, targetTop),
                behavior,
            });
        };

        scrollActiveLine('smooth');
        const settleTimer = setTimeout(() => scrollActiveLine('smooth'), 420);
        return () => clearTimeout(settleTimer);
    }, [activeLyricIndex, showLyrics, isExpanded, currentTrack.id]);

    const handleLyricLineClick = (line) => {
        if (!currentLyrics?.synced || !audioRef.current) return;
        ensureAudioGraph(volume, isMuted);
        audioRef.current.currentTime = line.time;
        setCurrentTime(line.time);
        const dur = audioRef.current.duration || duration || 1;
        setProgress((line.time / dur) * 100);
        if (!isPlaying) setIsPlaying(true);
    };

    const retryFetchLyrics = () => {
        setLyricsMap(prev => {
            const next = { ...prev };
            delete next[currentTrack.id];
            return next;
        });
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={currentTrack.src}
                preload="metadata"
                onPlay={() => {
                    if (
                        audioCtxRef.current &&
                        audioCtxRef.current.state !== 'running' &&
                        audioCtxRef.current.state !== 'closed'
                    ) {
                        audioCtxRef.current.resume().catch(() => {});
                    }
                }}
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
                }}
            >
                {/* ── Unclipped Soundwave Ripples ── */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        opacity: isExpanded ? 0 : 1,
                        transition: 'opacity 0.25s ease',
                    }}
                >
                    {(isPlaying ? [0, 1, 2] : [0, 1]).map((i) => (
                        <div
                            key={`${isPlaying ? 'play' : 'idle'}-${i}`}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: ICON_SIZE,
                                height: ICON_SIZE,
                                borderRadius: '50%',
                                border: '1.5px solid #4a90d9',
                                animation: isPlaying
                                    ? `speakerRipple 1.8s ease-out infinite ${i * 0.55}s`
                                    : `musicIdleRipple 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite ${i * 1.4}s`,
                            }}
                        />
                    ))}
                </div>

                {/* ── Floating Callout Pill ("PLAY MUSIC" / "NOW PLAYING") ── */}
                {showHint && !isExpanded && (
                    <div
                        data-hover
                        onClick={(e) => {
                            e.stopPropagation();
                            if (hasDragged.current) return;
                            ensureAudioGraph(volume, isMuted);
                            if (!isPlaying) setIsPlaying(true);
                            setIsOpen(true);
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: isRightHalf ? ICON_SIZE + 12 : 'auto',
                            left: isRightHalf ? 'auto' : ICON_SIZE + 12,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '8px 12px',
                            borderRadius: 999,
                            background: '#172554',
                            border: '1px solid #2a2a2e',
                            boxShadow: 'none',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            userSelect: 'none',
                            animation: isRightHalf
                                ? 'musicHintFloatLeft 2.6s ease-in-out infinite'
                                : 'musicHintFloatRight 2.6s ease-in-out infinite',
                        }}
                    >
                        {/* Mini Play / Equalizer Indicator */}
                        <div
                            style={{
                                width: 26,
                                height: 26,
                                borderRadius: '50%',
                                border: '1px solid #9ca3af',
                                background: '#172554',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                color: '#fff',
                            }}
                        >
                            {isPlaying ? (
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 11 }}>
                                    {[0, 1, 2].map(i => (
                                        <span
                                            key={i}
                                            style={{
                                                width: 2,
                                                borderRadius: 1,
                                                background: '#fff',
                                                animation: `eqBounceSmall ${0.35 + i * 0.12}s ease-in-out infinite alternate`,
                                            }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <FaPlay size={9} style={{ marginLeft: 1.5 }} />
                            )}
                        </div>

                        {/* Text Stack */}
                        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                            <span
                                style={{
                                    fontSize: 9.5,
                                    fontWeight: 700,
                                    letterSpacing: '0.14em',
                                    textTransform: 'uppercase',
                                    color: '#ffff',
                                    fontFamily: '"Inter Display", "Inter", sans-serif',
                                }}
                            >
                                {isPlaying ? 'NOW PLAYING' : 'PLAY MUSIC'}
                            </span>
                            <span
                                style={{
                                    fontSize: 11.5,
                                    fontWeight: 600,
                                    color: '#ffffff',
                                    fontFamily: '"Inter", sans-serif',
                                    maxWidth: isMobile ? 120 : 155,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    marginTop: 1,
                                }}
                            >
                                {currentTrack.title} • {currentTrack.artist}
                            </span>
                        </div>

                        {/* Subtle Dismiss Pill Button */}
                        <button
                            type="button"
                            aria-label="Hide music hint"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowHint(false);
                            }}
                            style={{
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                border: 'none',
                                background: '#26262a',
                                color: '#a1a1aa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                                marginLeft: 2,
                                cursor: 'pointer',
                                flexShrink: 0,
                                transition: 'background 0.2s, color 0.2s',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = '#3f3f46';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = '#172554';
                                e.currentTarget.style.color = '#a1a1aa';
                            }}
                        >
                            <FaTimes size={9} />
                        </button>
                    </div>
                )}

                {/* ── Main Morphing Orb / Expanded Card ── */}
                <div
                    data-hover
                    onMouseEnter={() => !isMobile && setIsHovered(true)}
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
                        background: isExpanded ? '#161618' : '#172554',
                        borderRadius: isExpanded ? 18 : ICON_SIZE / 2,
                        border: isExpanded ? '1px solid #2a2a2e' : 'none',
                        boxShadow: 'none',
                        overflow: 'hidden',
                        transition: 'width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-radius 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease',
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
                            color: '#fff',
                            opacity: isExpanded ? 0 : 1,
                            pointerEvents: isExpanded ? 'none' : 'auto',
                            transition: 'opacity 0.2s',
                        }}
                    >
                        {isPlaying ? (
                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 18 }}>
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} style={{
                                        width: 3, borderRadius: 2, background: '#ffffff',
                                        animation: `eqBounce ${0.38 + i * 0.1}s ease-in-out infinite alternate`,
                                    }} />
                                ))}
                            </div>
                        ) : (
                            <FaMusic
                                size={20}
                                color="#ffffff"
                                style={{
                                    animation: 'musicNoteTilt 2.4s ease-in-out infinite',
                                }}
                            />
                        )}
                        {/* Drag indicator dots */}
                        <div style={{ position: 'absolute', bottom: 7, display: 'flex', gap: 3, opacity: 0.75 }}>
                            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#fff' }} />
                            <div style={{ width: 3, height: 3, borderRadius: '50%', background: '#fff' }} />
                        </div>
                    </div>

                    {/* Expanding Content (Card Layout) */}
                    <div style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        display: 'flex', flexDirection: 'column',
                        padding: '13px 16px', boxSizing: 'border-box',
                        opacity: isExpanded ? 1 : 0,
                        transition: 'opacity 0.3s',
                        transitionDelay: isExpanded ? '0.12s' : '0s',
                        pointerEvents: isExpanded ? 'auto' : 'none',
                    }}>
                        {/* Top: Text + EQ + Close */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingRight: 12 }}>
                                <span style={{
                                    color: '#fff', fontSize: 15, fontWeight: 700,
                                    fontFamily: '"Inter", sans-serif',
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                    {currentTrack.title}
                                </span>
                                <span style={{
                                    color: '#9ca3af', fontSize: 12.5,
                                    fontFamily: '"Inter", sans-serif', marginTop: 2,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                                }}>
                                    {currentTrack.artist}
                                </span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                                {/* Equalizer bars */}
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 16 }}>
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} style={{
                                            width: 3.5, borderRadius: 2, background: '#ffffff',
                                            animation: isPlaying ? `eqBounce ${0.35 + i * 0.1}s ease-in-out infinite alternate` : 'none',
                                            height: isPlaying ? '16px' : '4px',
                                        }} />
                                    ))}
                                </div>

                                {/* Close card button */}
                                <button
                                    type="button"
                                    aria-label="Minimize music player"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                        setIsHovered(false);
                                    }}
                                    onMouseDown={e => e.stopPropagation()}
                                    onTouchStart={e => e.stopPropagation()}
                                    style={{
                                        width: 22, height: 22, borderRadius: '50%',
                                        border: 'none', background: '#172554',
                                        color: '#a1a1aa', cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        padding: 0, transition: 'background 0.2s, color 0.2s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = '#3f3f46';
                                        e.currentTarget.style.color = '#ffffff';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = '#172554';
                                        e.currentTarget.style.color = '#a1a1aa';
                                    }}
                                >
                                    <FaTimes size={10} />
                                </button>
                            </div>
                        </div>

                        {/* Expandable Lyrics Drawer */}
                        {showLyrics && (
                            <div
                                ref={lyricsContainerRef}
                                data-lenis-prevent
                                className="lyrics-scroll"
                                onClick={e => e.stopPropagation()}
                                onMouseDown={e => e.stopPropagation()}
                                onTouchStart={e => e.stopPropagation()}
                                onWheel={e => e.stopPropagation()}
                                style={{
                                    flex: 1,
                                    minHeight: 0,
                                    marginTop: 10,
                                    marginBottom: 2,
                                    background: '#111113',
                                    border: '1px solid #242428',
                                    borderRadius: 10,
                                    overflowY: 'auto',
                                    position: 'relative',
                                    padding: currentLyrics?.status === 'loaded' ? '52px 12px' : '12px',
                                    display: currentLyrics?.status === 'loaded' ? 'block' : 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {!currentLyrics ? (
                                    <span style={{ color: '#9ca3af', fontSize: 12, fontFamily: '"Inter", sans-serif' }}>
                                        Memuat lirik...
                                    </span>
                                ) : currentLyrics.status === 'error' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                                        <span style={{ color: '#9ca3af', fontSize: 12, fontFamily: '"Inter", sans-serif', textAlign: 'center' }}>
                                            Gagal memuat lirik
                                        </span>
                                        <button
                                            type="button"
                                            onClick={retryFetchLyrics}
                                            style={{
                                                border: 'none',
                                                background: '#172554',
                                                color: '#ffffff',
                                                fontSize: 11,
                                                fontWeight: 600,
                                                padding: '5px 12px',
                                                borderRadius: 999,
                                                cursor: 'pointer',
                                                fontFamily: '"Inter", sans-serif',
                                            }}
                                        >
                                            Coba lagi
                                        </button>
                                    </div>
                                ) : currentLyrics.status === 'empty' ? (
                                    <span style={{ color: '#9ca3af', fontSize: 12, fontFamily: '"Inter", sans-serif', textAlign: 'center' }}>
                                        Lirik belum tersedia untuk lagu ini
                                    </span>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {currentLyrics.synced && activeLyricIndex === -1 && (
                                            <div
                                                style={{
                                                    color: '#ffffff',
                                                    fontSize: 13,
                                                    fontWeight: 700,
                                                    letterSpacing: '0.2em',
                                                    fontFamily: '"Inter", sans-serif',
                                                }}
                                            >
                                                ♪ • • •
                                            </div>
                                        )}
                                        {currentLyrics.lines.map((line, idx) => {
                                            const isActiveLine = currentLyrics.synced && idx === activeLyricIndex;
                                            return (
                                                <div
                                                    key={`${idx}-${line.time}`}
                                                    ref={isActiveLine ? activeLineRef : null}
                                                    onClick={() => handleLyricLineClick(line)}
                                                    style={{
                                                        color: !currentLyrics.synced
                                                            ? '#d4d4d8'
                                                            : isActiveLine
                                                                ? '#ffffff'
                                                                : '#6b7280',
                                                        fontSize: isActiveLine ? 13.5 : 12.5,
                                                        fontWeight: isActiveLine ? 700 : 500,
                                                        lineHeight: 1.45,
                                                        fontFamily: '"Inter", sans-serif',
                                                        cursor: currentLyrics.synced ? 'pointer' : 'default',
                                                        transition: 'color 0.25s ease, font-size 0.2s ease',
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (currentLyrics.synced && !isActiveLine) {
                                                            e.currentTarget.style.color = '#d4d4d8';
                                                        }
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (currentLyrics.synced && !isActiveLine) {
                                                            e.currentTarget.style.color = '#6b7280';
                                                        }
                                                    }}
                                                >
                                                    {line.text}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Middle: Progress Bar with Timer */}
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
                            <div onClick={(e) => { e.stopPropagation(); handleSeek(e); }} onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()} style={{
                                height: 4, background: '#464646', borderRadius: 2, cursor: 'pointer', position: 'relative'
                            }}>
                                <div style={{ width: `${progress}%`, height: '100%', background: '#172554', borderRadius: 2, transition: 'width 0.1s linear' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: '#9ca3af', fontFamily: '"Inter", sans-serif' }}>
                                <span>{fmt(currentTime)}</span>
                                <span>{fmt(duration)}</span>
                            </div>
                        </div>

                        {/* Bottom: Controls */}
                        <div
                            style={{ marginTop: showLyrics ? 8 : 'auto', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                            onClick={e => e.stopPropagation()}
                            onMouseDown={e => e.stopPropagation()}
                            onTouchStart={e => e.stopPropagation()}
                        >
                            {/* Left: Lyrics Toggle Button */}
                            <button
                                type="button"
                                aria-label="Toggle lyrics"
                                title={showLyrics ? 'Sembunyikan lirik' : 'Tampilkan lirik'}
                                onClick={() => {
                                    setShowLyrics(prev => !prev);
                                    setIsOpen(true);
                                }}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: showLyrics ? '#172554' : 'transparent',
                                    color: showLyrics ? '#ffffff' : '#9ca3af',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 0,
                                    transition: 'background 0.2s, color 0.2s',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.color = showLyrics ? '#ffffff' : '#9ca3af';
                                }}
                            >
                                {showLyrics ? <MdLyrics size={16} /> : <MdOutlineLyrics size={16} />}
                            </button>

                            <FaStepBackward
                                onClick={handlePrev}
                                style={{ cursor: 'pointer', color: '#d4d4d8', fontSize: 15, marginRight: 20, transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#d4d4d8'}
                            />

                            <div
                                onClick={togglePlay}
                                style={{
                                    width: 36, height: 36, borderRadius: '50%',
                                    background: '#172554',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', color: '#fff', fontSize: 13,
                                    transition: 'transform 0.15s',
                                    marginTop: -5,
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: 2.5 }} />}
                            </div>

                            <FaStepForward
                                onClick={handleNext}
                                style={{ cursor: 'pointer', color: '#d4d4d8', fontSize: 15, marginLeft: 20, transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                onMouseLeave={e => e.currentTarget.style.color = '#d4d4d8'}
                            />

                            {/* Right: Speaker Icon + Volume Bar */}
                            <div
                                style={{
                                    position: 'absolute', right: 0,
                                    display: 'flex', alignItems: 'center', gap: 7,
                                    userSelect: 'none',
                                }}
                            >
                                <div
                                    onClick={toggleMute}
                                    title={effectiveVolume === 0 ? 'Unmute' : 'Mute'}
                                    style={{
                                        color: '#9ca3af', fontSize: 14, cursor: 'pointer',
                                        transition: 'color 0.2s',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                    onMouseLeave={e => e.currentTarget.style.color = '#9ca3af'}
                                >
                                    {effectiveVolume === 0 ? <FaVolumeMute /> : effectiveVolume < 0.5 ? <FaVolumeDown /> : <FaVolumeUp />}
                                </div>

                                <div
                                    ref={volumeBarRef}
                                    onMouseDown={handleVolumeBarDown}
                                    onTouchStart={handleVolumeBarDown}
                                    style={{
                                        width: 50, height: 24,
                                        display: 'flex', alignItems: 'center',
                                        cursor: 'pointer', position: 'relative',
                                        touchAction: 'none',
                                    }}
                                >
                                    <div style={{ width: '100%', height: 4, background: '#464646', borderRadius: 2, position: 'relative' }}>
                                        <div
                                            style={{
                                                width: `${effectiveVolume * 100}%`,
                                                height: '100%',
                                                background: '#ffffff',
                                                borderRadius: 2,
                                            }}
                                        />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: `${effectiveVolume * 100}%`,
                                                transform: 'translate(-50%, -50%)',
                                                width: 8, height: 8,
                                                borderRadius: '50%',
                                                background: '#ffffff',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .lyrics-scroll::-webkit-scrollbar {
                    width: 3px;
                }
                .lyrics-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }
                .lyrics-scroll::-webkit-scrollbar-thumb {
                    background: #2a2a2e;
                    border-radius: 2px;
                }
                @keyframes eqBounce {
                    0% { height: 4px; }
                    100% { height: 16px; }
                }
                @keyframes eqBounceSmall {
                    0% { height: 3px; }
                    100% { height: 11px; }
                }
                @keyframes musicIdleRipple {
                    0% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.65;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1.75);
                        opacity: 0;
                    }
                }
                @keyframes speakerRipple {
                    0% {
                        transform: translate(-50%, -50%) scale(0.95);
                        opacity: 0.75;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1.95);
                        opacity: 0;
                    }
                }
                @keyframes musicNoteTilt {
                    0%, 100% { transform: rotate(-6deg) scale(1); }
                    50% { transform: rotate(8deg) scale(1.08); }
                }
                @keyframes musicHintFloatLeft {
                    0%, 100% { transform: translate(0, -50%); }
                    50% { transform: translate(-4px, -50%); }
                }
                @keyframes musicHintFloatRight {
                    0%, 100% { transform: translate(0, -50%); }
                    50% { transform: translate(4px, -50%); }
                }
            `}</style>
        </>
    );
}
