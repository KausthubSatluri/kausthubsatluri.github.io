import React from 'react';
import { Link } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';
import Timeline from '../components/Timeline';
import AgeTicker from '../components/AgeTicker';
import ProjectCount from '../components/ProjectCount';
import MusicCard from '../components/MusicCard';
import TechStack from '../components/TechStack';
import GithubCommit from '../components/GithubCommit';
import projectsData from '../data/projects.json';
import '../components/Timeline.css';
import './Home.css';

const Home = () => {
    const { layout } = useLayout();
    const birthDate = '2005-02-02T22:25:00';
    const projectCount = projectsData.length;

    if (layout === 'default') {
        return (
            <div className="home-page default-layout-page fade-in container">
                <div className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title-serif">Kausthub Satluri</h1>
                        <p className="hero-subtitle">
                            A developer who builds digital experiences that blend<br />
                            aesthetics with performance — from self-hosted tooling<br />
                            to quantitative finance and everything in between.
                        </p>
                    </div>
                    <div className="hero-image">
                        <div className="hero-image-placeholder"></div>
                    </div>
                </div>

                <div className="featured-projects-section">
                    <h2 className="section-title">Featured Projects</h2>
                    <div className="projects-grid">
                        {projectsData.map((project) => (
                            <Link to={`/projects/${project.id}`} key={project.id} className="project-card">
                                <div className="project-image-placeholder"></div>
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
    }

    return (
        <div className="home-page fade-in">
            <div className="bento-item bento-intro">
                <h1 className="hero-title">
                    Hi, I'm <span className="highlight">Kausthub</span>.
                </h1>
                <p className="hero-subtitle">
                    I build digital experiences that blend <span className="text-white">aesthetics</span> with <span className="text-white">performance</span>.
                </p>
                <div className="hero-actions">
                    <Link to="/projects" className="btn btn-primary">View My Work</Link>
                </div>
            </div>

            <div className="bento-item bento-age">
                <AgeTicker birthDate={birthDate} />
            </div>

            <div className="bento-item bento-projects">
                <ProjectCount count={projectCount} />
            </div>

            <div className="bento-item bento-music">
                <MusicCard />
            </div>

            <div className="bento-item bento-tech">
                <TechStack />
            </div>

            <div className="bento-item bento-github">
                <GithubCommit />
            </div>

            <div className="bento-item bento-timeline">
                <Timeline />
            </div>
        </div>
    );
};

export default Home;
