import React from 'react';
import AgeTicker from './AgeTicker';
import ProjectCount from './ProjectCount';
import MusicCard from './MusicCard';
import './StatsGrid.css';
import projectsData from '../data/projects.json';

const StatsGrid = () => {
    // User's birthdate
    const birthDate = '2005-02-02T22:25:00';
    const projectCount = projectsData.length;

    return (
        <div className="stats-grid fade-in">
            <div className="stats-item item-age">
                <AgeTicker birthDate={birthDate} />
            </div>
            <div className="stats-item item-projects">
                <ProjectCount count={projectCount} />
            </div>
            <div className="stats-item item-music">
                <MusicCard />
            </div>
        </div>
    );
};

export default StatsGrid;
