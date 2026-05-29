import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">KS</Link>
                <nav className="nav">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
                    <select 
                        className="theme-selector" 
                        value={theme} 
                        onChange={(e) => setTheme(e.target.value)}
                    >
                        <option value="dark">Dark</option>
                        <option value="light">Light</option>
                        <option value="earthy">Earthy</option>
                    </select>
                </nav>
            </div>
        </header>
    );
};

export default Header;
