import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLayout } from '../context/LayoutContext';
import './Layout.css';

const Layout = ({ children }) => {
    const { layout } = useLayout();
    
    return (
        <div className={`layout ${layout === 'default' ? 'has-texture' : ''}`}>
            {layout === 'default' && (
                <div 
                    className="top-texture-bg" 
                    style={{ backgroundImage: `url('/texture.png')` }}
                />
            )}
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
