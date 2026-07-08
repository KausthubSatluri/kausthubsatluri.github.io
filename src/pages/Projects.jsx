import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './Projects.css';

const Projects = () => {
    return (
        <div className="projects-page container fade-in">
            <header className="projects-header">
                <h1 className="page-title">Projects</h1>
                <p className="page-subtitle">Things I've built, with notes on how they work.</p>
            </header>

            <div className="projects-grid">
                {projectsData.map((project) => (
                    <article key={project.id} className="project-card">
                        <Link
                            to={`/projects/${project.id}`}
                            className="card-link-wrapper"
                        >
                            {project.images && project.images.length > 0 && (
                                <div className="card-thumb">
                                    <img src={project.images[0].src} alt={project.title} loading="lazy" />
                                </div>
                            )}
                            <div className="card-content">
                                <h2 className="project-title">{project.title}</h2>
                                <p className="project-desc">{project.description}</p>
                                <div className="tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                        {project.link !== '#' && (
                            <a
                                href={project.link}
                                className="project-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Source &rarr;
                            </a>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Projects;
