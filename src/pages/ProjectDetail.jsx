import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import projectsData from '../data/projects.json';
import './ProjectDetail.css';

const puzzleQuestions = [
    {
        id: 'q1',
        question: 'When was our first kiss? (MM-DD-YYYY)',
        answer: '10-12-2024'
    },
    {
        id: 'q2',
        question: 'What is my favorite K-pop song? (Song Name - Artist (case-sensitive, abbreviations will not work))',
        answer: 'Deja Vu - TOMORROW X TOGETHER'
    },
    {
        id: 'q3',
        question: 'What is the longest time we spent without seeing each other in person? (# of days)',
        answer: '135'
    },
    {
        id: 'q4',
        question: 'What is the date of our first polaroid? (MM-DD-YYYY)',
        answer: '03-08-2025'
    }
];

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projectsData.find(p => p.id === parseInt(id));

    // Edit mode state (Layer 7)
    const [showEditMode, setShowEditMode] = useState(false);
    const [editData, setEditData] = useState({ name: '', date: '' });
    const [editError, setEditError] = useState('');
    const [isUnlocked, setIsUnlocked] = useState(false);

    // Puzzle state (Layer 8)
    const [puzzleAnswers, setPuzzleAnswers] = useState({ q1: '', q2: '', q3: '', q4: '' });
    const [correctAnswers, setCorrectAnswers] = useState({ q1: false, q2: false, q3: false, q4: false });
    const [showFinalUrl, setShowFinalUrl] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Check if Project 6 is unlocked via password
    useEffect(() => {
        if (project?.requiresPassword && localStorage.getItem('project6Unlocked') !== 'true') {
            navigate(`/projects/${id}/password`);
        }
        // Check if edit was already completed
        if (localStorage.getItem('project6Edited') === 'true') {
            setIsUnlocked(true);
        }
    }, [project, id, navigate]);

    const handleEditSubmit = (e) => {
        e.preventDefault();

        const correctName = 'krishi chevendra';
        const correctDate = '12-22-2005';

        if (editData.name.trim().toLowerCase() === correctName &&
            editData.date.trim() === correctDate) {
            setIsUnlocked(true);
            localStorage.setItem('project6Edited', 'true');
            setEditError('');
        } else {
            setEditError('Invalid details. Try again.');
        }
    };

    const handlePuzzleAnswer = (questionId, userAnswer) => {
        const question = puzzleQuestions.find(q => q.id === questionId);

        // Q2 is case-sensitive per the instructions
        if (questionId === 'q2') {
            if (userAnswer.trim() === question.answer) {
                setCorrectAnswers(prev => ({ ...prev, [questionId]: true }));
            }
        } else {
            if (userAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
                setCorrectAnswers(prev => ({ ...prev, [questionId]: true }));
            }
        }
    };

    // Check if all puzzle questions are answered
    useEffect(() => {
        if (Object.values(correctAnswers).every(v => v)) {
            setShowFinalUrl(true);
        }
    }, [correctAnswers]);

    if (!project) {
        return (
            <div className="container" style={{ paddingTop: '8rem', textAlign: 'center' }}>
                <h2>Project not found</h2>
                <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
            </div>
        );
    }

    const isProject6 = project.id === 6;

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

                    {project.link !== '#' && !isProject6 && (
                        <div className="project-actions">
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                View Source / Live Demo
                            </a>
                        </div>
                    )}

                    {/* Layer 7: Edit Project Button & Form */}
                    {isProject6 && !showEditMode && !isUnlocked && (
                        <div className="project-actions">
                            <button onClick={() => setShowEditMode(true)} className="btn btn-primary">
                                Edit Project
                            </button>
                        </div>
                    )}

                    {isProject6 && showEditMode && !isUnlocked && (
                        <div className="edit-project-form card-glass fade-in">
                            <h2>Edit Project</h2>
                            <p className="edit-subtitle">Complete the project details below:</p>

                            <form onSubmit={handleEditSubmit}>
                                <div className="form-group">
                                    <label>Project Name</label>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        placeholder="Enter project name"
                                        className="form-input"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Date of Creation</label>
                                    <input
                                        type="text"
                                        value={editData.date}
                                        onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                                        placeholder="MM-DD-YYYY"
                                        className="form-input"
                                    />
                                </div>

                                {editError && <p className="error-message">{editError}</p>}

                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Layer 8: Puzzle Box */}
                    {isProject6 && isUnlocked && (
                        <div className="puzzle-box card-glass fade-in">
                            <h2 className="puzzle-title">ACCESS GRANTED</h2>
                            <div className="divider"></div>
                            <p className="puzzle-intro">Final validation required. Answer these to unlock the path:</p>

                            {puzzleQuestions.map((q, index) => (
                                <div key={q.id} className="puzzle-question">
                                    <label>{index + 1}. {q.question}</label>
                                    <div className="puzzle-input-wrapper">
                                        <input
                                            type="text"
                                            value={puzzleAnswers[q.id]}
                                            onChange={(e) => {
                                                setPuzzleAnswers({ ...puzzleAnswers, [q.id]: e.target.value });
                                                handlePuzzleAnswer(q.id, e.target.value);
                                            }}
                                            disabled={correctAnswers[q.id]}
                                            className={`form-input${correctAnswers[q.id] ? ' correct' : ''}`}
                                            placeholder="Your answer..."
                                        />
                                        {correctAnswers[q.id] && (
                                            <span className="checkmark">&#10003;</span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {showFinalUrl && (
                                <div className="final-url-reveal fade-in">
                                    <div className="divider"></div>
                                    <p className="final-url-text">All validations passed. Navigate to:</p>
                                    <Link to="/forever" className="btn btn-primary final-url-btn">
                                        Open
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
