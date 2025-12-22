// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON in the body (Job Description)

// Routes
app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});