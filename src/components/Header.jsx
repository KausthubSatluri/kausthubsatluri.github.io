import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLayout } from '../context/LayoutContext';
import './Header.css';

const Header = () => {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const { layout, setLayout } = useLayout();
    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="logo">KS</Link>
                <nav className="nav">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
                    <div className="selectors">
                        <select 
                            className="theme-selector" 
                            value={theme} 
                            onChange={(e) => setTheme(e.target.value)}
                        >
                            <option value="dark">Dark Theme</option>
                            <option value="light">Light Theme</option>
                            <option value="earthy">Earthy Theme</option>
                        </select>
                        <select 
                            className="theme-selector layout-selector" 
                            value={layout} 
                            onChange={(e) => setLayout(e.target.value)}
                        >
                            <option value="default">Default Layout</option>
                            <option value="bento">Bento Box</option>
                            <option value="sidebar">Sidebar Split</option>
                            <option value="horizontal">Horizontal Scroll</option>
                        </select>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
