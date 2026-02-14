import React, { useState, useEffect } from 'react';
import './ProjectCount.css';

const ProjectCount = ({ count }) => {
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = count;
        if (start === end) return;

        const totalDuration = 2000;
        const incrementTime = totalDuration / end;

        const timer = setInterval(() => {
            start += 1;
            setDisplayCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [count]);

    return (
        <div className="project-count card-glass">
            <div className="count-label">Projects Shipped</div>
            <div className="count-number">{displayCount}</div>
            <div className="count-sub">and counting...</div>
        </div>
    );
};

export default ProjectCount;
