import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page default-layout-page fade-in container">
            <div className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title-serif">Kausthub Satluri</h1>
                    <p className="hero-subtitle">
                        Computer science student at Carnegie Mellon.
                        I build self-hosted tools, developer utilities,
                        and projects in quantitative finance.
                    </p>
                </div>
                <div className="hero-image">
                    <img
                        src="/portrait.jpg"
                        alt="Kausthub Satluri"
                        className="hero-portrait"
                    />
                </div>
            </div>

            <div className="featured-projects-section">
                <h2 className="section-title">Featured Projects</h2>
                <div className="projects-grid">
                    {projectsData.map((project) => (
                        <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>
                            <span className="view-project">View Project</span>
                        </Link>
                    ))}
                </div>
                <div className="more-projects">
                    <Link to="/projects">More Projects &gt;</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
