const express = require('express');
const multer = require('multer');
const { analyzeResume } = require('../controllers/resumeController');

const router = express.Router();

// Configure Multer to hold file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST endpoint: /api/resume/analyze
// 'resume' is the key name user must use when uploading the file
router.post('/analyze', upload.single('resume'), analyzeResume);

module.exports = router;