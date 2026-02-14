import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectPassword.css';

const ProjectPassword = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [unlocked, setUnlocked] = useState(false);
    const navigate = useNavigate();

    const correctPassword = 'forever yours';

    useEffect(() => {
        // If already unlocked, redirect straight to project
        if (localStorage.getItem('project6Unlocked') === 'true') {
            navigate('/projects/6');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.trim().toLowerCase() === correctPassword) {
            localStorage.setItem('project6Unlocked', 'true');
            setUnlocked(true);
            setTimeout(() => {
                navigate('/projects/6');
            }, 800);
        } else {
            setError('Incorrect password. Try again.');
            setPassword('');
        }
    };

    return (
        <div className="password-page container fade-in">
            <div className={`password-container card-glass${unlocked ? ' unlocked' : ''}`}>
                <div className="password-lock-icon">
                    {unlocked ? (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                        </svg>
                    ) : (
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                    )}
                </div>
                <h2>Project Access Required</h2>
                <p className="password-hint">This project is currently locked.</p>

                <form onSubmit={handleSubmit} className="password-form">
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        placeholder="Enter password"
                        className="password-input"
                        autoFocus
                        disabled={unlocked}
                    />
                    {error && <p className="error-message">{error}</p>}
                    {unlocked && <p className="success-message">Access granted.</p>}
                    <button type="submit" className="btn btn-primary" disabled={unlocked}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectPassword;
