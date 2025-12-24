import 'dotenv/config'; // <--- THIS MUST BE LINE 1 (No "import express" before it!)
import express from 'express';
import cors from 'cors';
import resumeRoutes from './routes/resumeRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});