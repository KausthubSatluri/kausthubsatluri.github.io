import React, { useState, useEffect, useRef, useCallback } from 'react';
import './FinalMessage.css';

// TODO: Replace this with your actual message
const MESSAGE = `I want you forever. 

No, not the "forever" we speak of so easily when we profess our love before bed—I mean the forever that truly never ends. The forever that envelopes every sleeping and waking moment of every person's life. 

I want to watch the world end with you.

I want to watch humans discover time travel with you. I want to stand with you as we colonize galaxies, as we reap the benefits of the universe, as we destroy our world and create 20 others just like this. In the realm of the infinite, every single thing you can imagine will happen, and I want to experience all of it with you.

I don't just want forever, I want eternity with you.

But that's impossible. We have known this for millennia. There is no forever for us mortals who will eventually forget. Our bodies, our minds, and our souls as we know it cannot withstand the enormity of infinity. Even if we could survive, we couldn't live. We must settle for that which is temporary.

"Till death do us part."

This is the compromise humanity has come to. If, at some point, I will forget and my body will pass, then while it is alive, I will devote it all to you. 

But that doesn't sit right with me.

For when my breath becomes frail and I struggle to see straight,
And the doctor begins compressing my chest in a desperate effort to keep me alive;
In the moment closest to the part that separates us,
All I'll think about is you.
In an open flower field with a sharp breeze in the morning sun,
I'll dream of you laying on my chest, moving your head around gently.
I'll mistake the cold plastic of the CPAP mask
For the gentle warmth of your hand running along my cheek.
I'll hear the rhythmic beeping of the machines around me,
And mistake it for your gentle heartbeat.
And when you look up at me and smile at my face,
My heart will flutter for just a second,
Just enough to bring me back to life.

Of course. You bring me life. 

And when I am, eventually, buried within the earth,
And my ribcage becomes a home for the worms, maggots, and roots,
I will mistake their movements and vibrations for your laughter.
And when I finally decompose,
I'll bring life to the next generation of beings.
The life that you so graciously have given to me.

I may not live forever. I may not experience all there is to experience.

But the love I have for you and the life you give me? That will go on.

For eternity.`;

const READING_TIME_MINUTES = Math.ceil(MESSAGE.split(/\s+/).length / 200);

const FinalMessage = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [userScrolled, setUserScrolled] = useState(false);
    const containerRef = useRef(null);
    const anchorRef = useRef(null);
    const indexRef = useRef(0);
    const pausedRef = useRef(false);
    const timerRef = useRef(null);
    const scrollTimeoutRef = useRef(null);
    const isAutoScrolling = useRef(false);

    const getDelay = (char, nextChar, prevChar) => {
        let delay = 50;
        if (char === '\n') delay = 700;
        else if (char === '.' && nextChar !== '.') delay = 600;
        else if (char === '!' || char === '?') delay = 550;
        else if (char === '\u2026') delay = 800;
        else if (char === ',') delay = 300;
        else if (char === ';') delay = 350;
        else if (char === ':') delay = 300;
        else if (char === '\u2014' || char === '\u2013') delay = 450;
        else if (char === '\u201D' && (prevChar === '.' || prevChar === '!' || prevChar === '?')) delay = 400;
        else if (char === '\u201C') delay = 200;
        return delay;
    };

    const typeNextChar = useCallback(() => {
        if (pausedRef.current) return;

        if (indexRef.current >= MESSAGE.length) {
            setIsTyping(false);
            setIsComplete(true);
            return;
        }

        const char = MESSAGE[indexRef.current];
        indexRef.current++;
        setDisplayedText(MESSAGE.slice(0, indexRef.current));

        const nextChar = indexRef.current < MESSAGE.length ? MESSAGE[indexRef.current] : '';
        const prevChar = indexRef.current >= 2 ? MESSAGE[indexRef.current - 2] : '';
        const delay = getDelay(char, nextChar, prevChar);

        timerRef.current = setTimeout(typeNextChar, delay);
    }, []);

    // Start typing on mount
    useEffect(() => {
        const startDelay = setTimeout(() => {
            setIsTyping(true);
            typeNextChar();
        }, 1500);

        return () => {
            clearTimeout(startDelay);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [typeNextChar]);

    // Scroll the anchor (cursor area) into view when new text appears
    useEffect(() => {
        if (anchorRef.current && !userScrolled && (isTyping || isComplete)) {
            isAutoScrolling.current = true;
            anchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Reset auto-scroll flag after animation
            setTimeout(() => { isAutoScrolling.current = false; }, 300);
        }
    }, [displayedText, isTyping, userScrolled, isComplete]);

    // Detect user scroll — if they scroll away, pause auto-follow.
    // After 12 seconds of no user scroll, snap back.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            if (isAutoScrolling.current) return; // ignore our own scrolls

            setUserScrolled(true);

            // Reset the snap-back timer
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = setTimeout(() => {
                setUserScrolled(false);
            }, 12000);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    const handlePauseResume = () => {
        if (isPaused) {
            pausedRef.current = false;
            setIsPaused(false);
            setIsTyping(true);
            setUserScrolled(false);
            typeNextChar();
        } else {
            pausedRef.current = true;
            setIsPaused(true);
            setIsTyping(false);
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    };

    const handleReplay = () => {
        indexRef.current = 0;
        pausedRef.current = false;
        setDisplayedText('');
        setIsTyping(true);
        setIsPaused(false);
        setIsComplete(false);
        setUserScrolled(false);
        if (timerRef.current) clearTimeout(timerRef.current);
        setTimeout(typeNextChar, 500);
    };

    return (
        <div className="final-message-page">
            {/* Frosted overlay at top */}
            <div className="frost-overlay"></div>

            {/* Header floats on top of the frost */}
            <header className="message-header">
                <p className="reading-time">~{READING_TIME_MINUTES} min read</p>
                {!isComplete && (
                    <button onClick={handlePauseResume} className="pause-btn" aria-label={isPaused ? 'Resume' : 'Pause'}>
                        {isPaused ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        )}
                    </button>
                )}
            </header>

            <div className="message-container" ref={containerRef}>
                {/* Spacer pushes initial text to vertical center */}
                <div className="message-spacer"></div>

                <div className="message-text">
                    {displayedText}
                    {(isTyping || isPaused) && <span className={`cursor${isPaused ? ' paused' : ''}`}>|</span>}
                </div>

                {/* Invisible anchor that we scroll into view */}
                <div ref={anchorRef} className="scroll-anchor"></div>

                {/* Bottom spacer so the last line can sit at center */}
                <div className="message-spacer-bottom"></div>

                {isComplete && (
                    <div className="message-footer fade-in">
                        {/* TODO: Add poem image here */}
                        {/* <img src="/path-to-poem.jpg" alt="Poem" className="poem-image" /> */}
                        <button onClick={handleReplay} className="replay-btn">
                            Read Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FinalMessage;
