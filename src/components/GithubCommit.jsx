import React from 'react';
import './GithubCommit.css';

const GithubCommit = () => {
    return (
        <div className="github-commit-widget">
            <div className="github-header">
                <h3 className="widget-title">Latest Commit</h3>
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="github-icon">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
            </div>
            
            <div className="commit-info">
                <div className="commit-avatar">KS</div>
                <div className="commit-details">
                    <p className="commit-message">feat: Add Multi-Layout Architecture</p>
                    <p className="commit-repo">kausthubsatluri.github.io</p>
                </div>
            </div>
            
            <div className="commit-stats">
                <div className="stat">
                    <span className="stat-value">6</span>
                    <span className="stat-label">Files changed</span>
                </div>
                <div className="stat">
                    <span className="stat-value">+201</span>
                    <span className="stat-label">Additions</span>
                </div>
            </div>
            <p className="commit-time">Pushed 2 minutes ago</p>
        </div>
    );
};

export default GithubCommit;
