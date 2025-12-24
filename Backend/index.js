import 'dotenv/config'; // <--- CHANGE THIS: Load .env immediately
import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple request logger to help debug route 404s
app.use((req, res, next) => {
    console.log('HTTP', req.method, req.path);
    next();
});

// Routes
app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});