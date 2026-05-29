import React from 'react';
import './TechStack.css';

const TechStack = () => {
    const technologies = [
        "React", "Node.js", "Python", "TypeScript", 
        "AWS", "Docker", "Figma", "TailwindCSS"
    ];

    return (
        <div className="tech-stack-widget">
            <h3 className="widget-title">Tech Stack</h3>
            <div className="tech-pills">
                {technologies.map((tech, index) => (
                    <span key={index} className="tech-pill">{tech}</span>
                ))}
            </div>
        </div>
    );
};

export default TechStack;
