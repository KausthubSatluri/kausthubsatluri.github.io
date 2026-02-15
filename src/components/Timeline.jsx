import React from 'react';
import timelineData from '../data/timeline.json';
import './Timeline.css';

const Timeline = () => {
    return (
        <section className="timeline-section container">
            <h2 className="section-title">The Journey</h2>
            <div className="timeline-container">
                <div className="timeline-line"></div>
                {timelineData.map((item, index) => (
                    <div
                        key={index}
                        className="timeline-item fade-in-scroll"
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
