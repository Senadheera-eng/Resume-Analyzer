// src/components/ResumeAnalyzer.jsx
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Loader2, Award, TrendingUp, Sparkles, Target, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ResumeAnalyzer.css';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
            {/* Animated background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="inline-block mb-4"
                        >
                            <div className="bg-gradient-to-r from-purple-400 to-pink-600 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                                <Sparkles size={32} className="text-white" />
                            </div>
                        </motion.div>
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent mb-3">
                            AI Resume Analyzer
                        </h1>
                        <p className="text-xl text-gray-300 font-light">Transform your resume with intelligent AI-powered analysis</p>
                    </div>

                    {/* Main Card */}
                    <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 md:p-10 shadow-2xl">
                        {/* Input Section */}
                        <div className="space-y-6">
                            {/* File Upload */}
                            <motion.div
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                className={`relative
                                    ${dragActive ? 'border-purple-400 bg-purple-500/20 scale-105' : 'border-gray-600/50 bg-gray-900/40'}
                                    border-2 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300`}
                            >
                                <label htmlFor="file-upload" className="cursor-pointer block">
                                    <motion.div
                                        animate={{ scale: dragActive ? 1.1 : 1 }}
                                        className="mb-4"
                                    >
                                        <Upload size={48} className="mx-auto text-purple-400 mb-4" />
                                    </motion.div>
                                    <h3 className="text-white text-lg font-semibold mb-2">
                                        {file ? "✓ Resume Selected" : "Upload Your Resume"}
                                    </h3>
                                    {file ? (
                                        <p className="text-purple-300 font-medium">{file.name}</p>
                                    ) : (
                                        <p className="text-gray-400">Drag & drop your PDF or click to browse</p>
                                    )}
                                    <input 
                                        id="file-upload" 
                                        type="file" 
                                        accept=".pdf" 
                                        onChange={handleFileChange} 
                                        className="hidden" 
                                    />
                                </label>
                            </motion.div>

                            {/* Job Description */}
                            <div>
                                <label className="block text-white font-semibold mb-3 text-lg">Job Description</label>
                                <textarea 
                                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 resize-none"
                                    rows="6"
                                    placeholder="Paste the job description to compare with your resume..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>

                            {/* Analyze Button */}
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAnalyze} 
                                disabled={loading || !file || !jobDescription}
                                className={`w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                                    ${loading || !file || !jobDescription
                                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/50'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 size={22} className="animate-spin" /> Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Target size={22} /> Analyze Match
                                    </>
                                )}
                            </motion.button>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-xl flex items-start gap-3"
                                    >
                                        <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Results Section */}
                    <AnimatePresence>
                        {result && (
                            <motion.div 
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 space-y-6"
                            >
                                {/* Score Card */}
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="backdrop-blur-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/50 rounded-2xl p-8 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 opacity-30">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                                    </div>
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
                                                <TrendingUp className="text-purple-400" /> Match Analysis
                                            </h2>
                                            <p className="text-gray-300">Resume alignment with job requirements</p>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className={`relative w-32 h-32 rounded-full flex items-center justify-center font-bold text-4xl border-4 ${
                                                result.score >= 70 ? 'border-green-400 text-green-400' : 'border-yellow-400 text-yellow-400'
                                            }`}
                                        >
                                            {result.score}%
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Summary Box */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="backdrop-blur-xl bg-blue-500/10 border border-blue-400/50 rounded-xl p-6"
                                >
                                    <div className="flex gap-4">
                                        <Zap size={24} className="text-blue-400 flex-shrink-0" />
                                        <div>
                                            <h3 className="text-white font-bold mb-2">Executive Summary</h3>
                                            <p className="text-gray-300 leading-relaxed">{result.matchSummary}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Strengths & Weaknesses Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Strengths */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="backdrop-blur-xl bg-green-500/10 border border-green-400/50 rounded-xl p-6"
                                    >
                                        <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                                            <CheckCircle size={24} /> Strengths
                                        </h3>
                                        {result.strengths && result.strengths.length > 0 ? (
                                            <ul className="space-y-3">
                                                {result.strengths.map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + index * 0.1 }}
                                                        className="flex gap-3 text-gray-200"
                                                    >
                                                        <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-1" />
                                                        <span>{item}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-400 italic">No specific strengths detected.</p>
                                        )}
                                    </motion.div>

                                    {/* Weaknesses */}
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="backdrop-blur-xl bg-red-500/10 border border-red-400/50 rounded-xl p-6"
                                    >
                                        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                            <AlertTriangle size={24} /> Areas to Improve
                                        </h3>
                                        {result.weaknesses && result.weaknesses.length > 0 ? (
                                            <ul className="space-y-3">
                                                {result.weaknesses.map((item, index) => (
                                                    <motion.li
                                                        key={index}
                                                        initial={{ opacity: 0, x: 10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.5 + index * 0.1 }}
                                                        className="flex gap-3 text-gray-200"
                                                    >
                                                        <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-1" />
                                                        <span>{item}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-400 italic">Excellent match! No major areas to improve.</p>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default ResumeAnalyzer;