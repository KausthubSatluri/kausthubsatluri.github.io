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
        <header className={`header ${layout === 'default' ? 'header-default' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo">
                    {layout === 'default' ? 'KAUSTHUB' : 'KS'}
                </Link>
                <nav className="nav">
                    <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                    <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projects</Link>
                    {layout === 'default' && (
                        <>
                            <Link to="#" className="nav-link">About</Link>
                            <Link to="#" className="nav-link">Contact</Link>
                        </>
                    )}
                    
                    {layout !== 'default' && (
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
                    )}
                </nav>

                {layout === 'default' && (
                    <div className="header-right">
                        <div className="selectors" style={{marginRight: '1rem', display: 'inline-flex'}}>
                            <select 
                                className="theme-selector" 
                                value={theme} 
                                onChange={(e) => setTheme(e.target.value)}
                            >
                                <option value="dark">Dark</option>
                                <option value="earthy">Earthy</option>
                            </select>
                            <select 
                                className="theme-selector" 
                                value={layout} 
                                onChange={(e) => setLayout(e.target.value)}
                            >
                                <option value="default">Default</option>
                                <option value="bento">Bento</option>
                            </select>
                        </div>
                        <a href="#" className="cv-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            CV
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
