// src/components/ResumeAnalyzer.jsx
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Loader2, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResumeAnalyzer.css';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = async () => {
        if (!file || !jobDescription) {
            alert("Please upload a resume and enter a job description.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);

        try {
            const response = await fetch('http://localhost:5000/api/resume/analyze', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.details || "Analysis failed");
            }

            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
            >
                <div className="header">
                    <h1 className="title">AI Resume Analyzer</h1>
                    <p className="subtitle">Optimize your resume for ATS with Gemini 2.0 AI</p>
                </div>

                {/* Input Section */}
                <div className="upload-section">
                    <label htmlFor="file-upload" className="upload-zone">
                        <Upload size={48} color="#4f46e5" style={{ marginBottom: '15px' }} />
                        <h3 style={{ margin: 0 }}>
                            {file ? "File Selected" : "Click to Upload Resume (PDF)"}
                        </h3>
                        {file && <p className="file-info">{file.name}</p>}
                        <input 
                            id="file-upload" 
                            type="file" 
                            accept=".pdf" 
                            onChange={handleFileChange} 
                            style={{ display: 'none' }} 
                        />
                    </label>

                    <div className="input-group">
                        <label className="label">Job Description</label>
                        <textarea 
                            className="textarea"
                            rows="5"
                            placeholder="Paste the job description here to compare..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />
                    </div>

                    <button 
                        className="analyze-btn"
                        onClick={handleAnalyze} 
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner"></div> Analyzing...
                            </>
                        ) : (
                            <>
                                <Award size={20} /> Analyze Match
                            </>
                        )}
                    </button>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: '#ef4444', marginTop: '15px', textAlign: 'center', background: '#fee2e2', padding: '10px', borderRadius: '8px' }}
                        >
                            ⚠️ Error: {error}
                        </motion.div>
                    )}
                </div>
            </motion.div>

            {/* Results Section */}
            <AnimatePresence>
                {result && (
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="results-container"
                    >
                        <div className="score-banner">
                            <div>
                                <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Match Analysis</h2>
                                <p style={{ margin: '5px 0 0 0', opacity: 0.8 }}>Based on keywords & skills</p>
                            </div>
                            <div className="score-circle" style={{ 
                                borderColor: result.score >= 70 ? '#10b981' : '#f59e0b',
                                color: result.score >= 70 ? 'white' : 'white'
                            }}>
                                {result.score}%
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '25px' }}>
                            <div className="summary-box">
                                <strong>📝 Executive Summary:</strong> {result.matchSummary}
                            </div>

                            <div className="grid-cols">
                                {/* Strengths Column */}
                                <div className="card-column">
                                    <div className="column-header text-success">
                                        <CheckCircle size={24} /> Strengths
                                    </div>
                                    {result.strengths && result.strengths.length > 0 ? (
                                        <ul>
                                            {result.strengths.map((item, index) => (
                                                <li key={index} className="list-item">
                                                    <CheckCircle size={16} color="#10b981" style={{minWidth: '16px', marginTop: '4px'}} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{color: '#6b7280', fontStyle: 'italic'}}>No specific strengths detected.</p>
                                    )}
                                </div>

                                {/* Weaknesses Column */}
                                <div className="card-column">
                                    <div className="column-header text-danger">
                                        <AlertTriangle size={24} /> Missing / Weakness
                                    </div>
                                    {result.weaknesses && result.weaknesses.length > 0 ? (
                                        <ul>
                                            {result.weaknesses.map((item, index) => (
                                                <li key={index} className="list-item">
                                                    <AlertTriangle size={16} color="#ef4444" style={{minWidth: '16px', marginTop: '4px'}} />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p style={{color: '#6b7280', fontStyle: 'italic'}}>Great match! No major weaknesses found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResumeAnalyzer;