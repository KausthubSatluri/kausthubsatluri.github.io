import React from 'react';
import { Link } from 'react-router-dom';
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
    const birthDate = '2005-02-02T22:25:00';
    const projectCount = projectsData.length;

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
