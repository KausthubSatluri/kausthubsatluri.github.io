import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">KS</Link>
                <nav className="nav">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
                    {/* Future sections */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
