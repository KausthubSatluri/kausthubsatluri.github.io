import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [showClue, setShowClue] = useState(false);

    return (
        <footer className="footer">
            <div className="container footer-container">
                <p>&copy; {new Date().getFullYear()} Kausthub Satluri. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <span className="music-clue-wrapper">
                        <button
                            className="music-clue-icon"
                            onClick={() => setShowClue(!showClue)}
                            aria-label="Hint"
                        >
                            ♪
                        </button>
                        {showClue && (
                            <div className="clue-popup card-glass">
                                <p>The answer is in the music.</p>
                            </div>
                        )}
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
