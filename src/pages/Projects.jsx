import React from 'react';
import { Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './Projects.css';

const Projects = () => {
    return (
        <div className="projects-page container fade-in">
            <header className="projects-header">
                <h1 className="page-title">Selected Works</h1>
                <p className="page-subtitle">A collection of things I've built and learned from.</p>
            </header>

            <div className="projects-grid">
                {projectsData.map((project) => (
                    <article key={project.id} className="project-card">
                        <Link
                            to={`/projects/${project.id}`}
                            className="card-link-wrapper"
                        >
                            <div className="card-content">
                                <h2 className="project-title">{project.title}</h2>
                                <p className="project-desc">{project.description}</p>
                                <div className="tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                {project.link !== '#' && (
                                    <object>
                                        <a
                                            href={project.link}
                                            className="project-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View Source &rarr;
                                        </a>
                                    </object>
                                )}
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Projects;
