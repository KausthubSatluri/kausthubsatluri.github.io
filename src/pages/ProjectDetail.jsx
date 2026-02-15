import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './ProjectDetail.css';

const ProjectDetail = () => {
    const { id } = useParams();
    const project = projectsData.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                <h2>Project not found</h2>
                <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
            </div>
        );
    }

    return (
        <div className="project-detail-page fade-in">
            <div className="container">
                <Link to="/projects" className="back-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Back to Projects
                </Link>

                <header className="project-header">
                    <h1 className="project-title">{project.title}</h1>
                    <div className="project-tags">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                    <p className="project-description">{project.description}</p>
                </header>

                <div className="project-content">
                    <section className="detail-section">
                        <h2>The Thought Process</h2>
                        <p>{project.thoughtProcess || "Details coming soon..."}</p>
                    </section>

                    <section className="detail-section">
                        <h2>How It Works</h2>
                        <p>{project.howItWorks || "Details coming soon..."}</p>
                    </section>

                    {project.link !== '#' && (
                        <div className="project-actions">
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                View Source / Live Demo
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
