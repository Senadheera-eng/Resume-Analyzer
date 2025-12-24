// src/components/ResumeAnalyzer.jsx
import React, { useState } from 'react';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
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
            // Ensure this port matches your backend (5000)
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
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🚀 Resume AI Analyzer</h2>
                
                <div style={styles.inputGroup}>
                    <label style={styles.label}>1. Upload Resume (PDF)</label>
                    <input type="file" accept=".pdf" onChange={handleFileChange} style={styles.input} />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>2. Job Description</label>
                    <textarea 
                        rows="5"
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        style={styles.textarea}
                    />
                </div>

                <button 
                    onClick={handleAnalyze} 
                    disabled={loading} 
                    style={loading ? styles.buttonDisabled : styles.button}
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>

                {error && <div style={styles.error}>❌ Error: {error}</div>}
            </div>

            {/* Results Section */}
            {result && (
                <div style={styles.resultCard}>
                    <div style={styles.scoreBadge}>Match Score: {result.score}%</div>
                    
                    <p style={styles.summary}><strong>Summary:</strong> {result.matchSummary}</p>
                    
                    <div style={styles.grid}>
                        <div style={styles.column}>
                            <h4 style={{color: 'green'}}>✅ Strengths</h4>
                            <ul>
                                {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                        </div>
                        <div style={styles.column}>
                            <h4 style={{color: 'red'}}>⚠️ Weaknesses</h4>
                            <ul>
                                {result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Simple inline styles
const styles = {
    container: { fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f4f4f9', minHeight: '100vh' },
    card: { backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    title: { textAlign: 'center', color: '#333' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#555' },
    input: { padding: '10px', width: '100%' },
    textarea: { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' },
    button: { width: '100%', padding: '12px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' },
    buttonDisabled: { width: '100%', padding: '12px', backgroundColor: '#ccc', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px' },
    error: { marginTop: '15px', padding: '10px', backgroundColor: '#ffe6e6', color: '#d63031', borderRadius: '5px', textAlign: 'center' },
    resultCard: { marginTop: '25px', backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    scoreBadge: { backgroundColor: '#28a745', color: 'white', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold', marginBottom: '15px' },
    summary: { lineHeight: '1.6', color: '#444' },
    grid: { display: 'flex', gap: '20px', marginTop: '20px', flexDirection: 'row' },
    column: { flex: 1, backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }
};

export default ResumeAnalyzer;