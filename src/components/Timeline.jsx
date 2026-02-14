import React, { useState, useEffect } from 'react';
import timelineData from '../data/timeline.json';
import './Timeline.css';

const Timeline = () => {
    const [showHiddenEntry, setShowHiddenEntry] = useState(false);

    useEffect(() => {
        const checkUnlock = () => {
            const unlocked = localStorage.getItem('timelineUnlocked');
            if (unlocked === 'true') {
                setShowHiddenEntry(true);
            }
        };

        checkUnlock();

        // Listen for storage changes (in case unlock happens on same page)
        window.addEventListener('storage', checkUnlock);
        return () => window.removeEventListener('storage', checkUnlock);
    }, []);

    const displayTimeline = showHiddenEntry
        ? timelineData
        : timelineData.filter(item => !item.hidden);

    return (
        <section className="timeline-section container">
            <h2 className="section-title">The Journey</h2>
            <div className="timeline-container">
                <div className="timeline-line"></div>
                {displayTimeline.map((item, index) => (
                    <div
                        key={index}
                        className={`timeline-item fade-in-scroll${item.hidden ? ' timeline-hidden-entry' : ''}`}
                    >
                        <div className="timeline-marker"></div>
                        <div className="timeline-content card-glass">
                            <span className="timeline-year">{item.year}</span>
                            <h3 className="timeline-title">{item.title}</h3>
                            <p className="timeline-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Timeline;
