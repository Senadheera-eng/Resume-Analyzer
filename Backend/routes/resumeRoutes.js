import express from 'express';
import multer from 'multer';
import { analyzeResume, healthCheck } from '../controllers/resumeController.js'; // Note .js

const router = express.Router();

// Configure Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/analyze', upload.single('resume'), analyzeResume);
router.get('/health', healthCheck);

export default router; 