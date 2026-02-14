import React from 'react';
import { Link } from 'react-router-dom';
import StatsGrid from '../components/StatsGrid';
import Timeline from '../components/Timeline';
import '../components/Timeline.css';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero container">
                <div className="hero-content fade-in">
                    <h1 className="hero-title">
                        Hi, I'm <span className="highlight">Kausthub</span>.
                    </h1>
                    <p className="hero-subtitle">
                        I build digital experiences that blend <span className="text-white">aesthetics</span> with <span className="text-white">performance</span>.
                    </p>
                    <div className="hero-actions">
                        <Link to="/projects" className="btn btn-primary">View My Work</Link>
                    </div>

                    <StatsGrid />
                </div>
            </section>

            <Timeline />
        </div>
    );
};

export default Home;
