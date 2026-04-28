import React from 'react';

export function StyledWord({ text, color, animDelay, style = {} }) {
    if (!text) return null;
    const first = text[0];
    const rest = text.slice(1).toUpperCase();
    return (
        <span style={{
            display: 'inline-block',
            ...(animDelay !== undefined ? { animation: `slideUp 1s var(--ease) ${animDelay}s both` } : {}),
            ...style,
        }}>
            <span style={{ fontFamily: '"Cinzel Decorative", serif', color }}>{first}</span>
            <span style={{ fontFamily: '"Poppins", sans-serif', color, fontSize: '0.72em', fontWeight: 700, letterSpacing: '-0.025em' }}>{rest}</span>
        </span>
    );
}

export function StyledHeading({ text, color }) {
    const words = text.split(' ');
    return words.map((word, i) => (
        <React.Fragment key={i}>
            <StyledWord text={word} color={color} />
            {i < words.length - 1 && '\u00A0'}
        </React.Fragment>
    ));
}
