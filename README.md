# 🚀 AI Resume Analyzer

Transform your resume with intelligent AI-powered analysis. Get instant feedback on how well your resume matches job descriptions using advanced Gemini 2.0 AI technology.

![React](https://img.shields.io/badge/React-19.2-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-purple.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## ✨ Features

- **📊 Smart Resume Analysis** - AI-powered analysis of your resume against job descriptions
- **🎯 Match Score** - Get an instant compatibility score (0-100%)
- **💪 Strength Identification** - See what skills and experiences align with the job
- **🔧 Improvement Suggestions** - Get actionable feedback on what's missing
- **📈 Detailed Insights** - Executive summary of your fit for the position
- **🎨 Modern UI** - Beautiful, responsive interface with smooth animations
- **⚡ Real-time Analysis** - Fast processing with instant results
- **📱 Fully Responsive** - Works seamlessly on desktop and mobile devices

---

## 🛠️ Tech Stack

### Frontend

- **React 19.2** - Latest React with hooks and modern features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **PostCSS & Autoprefixer** - CSS optimization

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Google Gemini 2.0 API** - Advanced AI for resume analysis
- **PDF processing** - Resume file handling

---

## 📋 Project Structure

```
Resume-Analyzer/
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ResumeAnalyzer.jsx      # Main component
│   │   │   └── ResumeAnalyzer.css      # Component styles
│   │   ├── App.jsx                     # Root component
│   │   ├── App.css                     # Global styles
│   │   ├── index.css                   # Tailwind setup
│   │   └── main.jsx                    # Entry point
│   ├── public/                         # Static assets
│   ├── package.json                    # Dependencies
│   ├── tailwind.config.js              # Tailwind configuration
│   ├── vite.config.js                  # Vite configuration
│   └── index.html                      # HTML template
│
├── Backend/
│   ├── controllers/
│   │   └── resumeController.js         # Analysis logic
│   ├── routes/
│   │   └── resumeRoutes.js             # API routes
│   ├── index.js                        # Server entry point
│   ├── package.json                    # Dependencies
│   └── debug.js                        # Debugging utilities
│
└── README.md                           # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ and npm
- **Google Gemini 2.0 API Key** (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Resume-Analyzer
   ```

2. **Setup Backend**

   ```bash
   cd Backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   ```

### Configuration

1. **Backend Configuration**

   - Create a `.env` file in the `Backend/` directory
   - Add your Google Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

2. **Frontend Configuration**
   - The frontend is configured to connect to `http://localhost:5000`
   - Adjust the API endpoint in `src/components/ResumeAnalyzer.jsx` if needed

---

## 🎯 Usage

### Starting the Application

1. **Start the Backend Server**

   ```bash
   cd Backend
   npm run dev
   ```

   The server will run on `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The app will open at `http://localhost:5173`

### Using the Application

1. **Upload Resume**

   - Click the upload area or drag & drop your PDF resume
   - Supported format: PDF only

2. **Paste Job Description**

   - Copy and paste the job description you're applying for
   - Provide the full job description for better analysis

3. **Analyze**

   - Click the "Analyze Match" button
   - Wait for AI analysis (usually 2-5 seconds)

4. **Review Results**
   - View your match percentage
   - Check identified strengths
   - See areas for improvement
   - Read the executive summary

---

## 📊 API Endpoints

### POST `/api/resume/analyze`

Analyzes a resume against a job description.

**Request:**

```bash
curl -X POST http://localhost:5000/api/resume/analyze \
  -F "resume=@path/to/resume.pdf" \
  -F "jobDescription=<job-description-text>"
```

**Response:**

```json
{
  "score": 78,
  "matchSummary": "Your resume shows strong alignment with the job requirements...",
  "strengths": [
    "Strong JavaScript and React experience",
    "Proven track record with modern frameworks"
  ],
  "weaknesses": ["Limited DevOps experience", "No AWS certification mentioned"]
}
```

---

## 🎨 UI Features

### Design System

- **Modern Dark Theme** - Professional dark mode optimized for readability
- **Glassmorphism** - Frosted glass effect cards for modern aesthetic
- **Animated Gradients** - Smooth color transitions and animations
- **Responsive Grid** - Adapts perfectly to any screen size
- **Micro-interactions** - Smooth transitions and hover effects

### Components

- **Drag & Drop Upload** - Intuitive file upload with visual feedback
- **Animated Score Display** - Rotating circular progress indicator
- **Staggered Animations** - Smooth entrance for result items
- **Loading States** - Animated loader during analysis
- **Error Handling** - Clear, styled error messages

---

## 🔧 Development

### Available Scripts

**Frontend:**

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

**Backend:**

```bash
npm run dev        # Start with nodemon
npm start          # Start server
```

### Code Style

- ESLint configuration for code quality
- Prettier recommended for formatting
- Follows React best practices
- Modern JavaScript (ES6+)

---

## 🚀 Deployment

### Frontend Deployment

Build and deploy to services like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

```bash
cd Frontend
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment

Deploy to services like:

- Heroku
- Railway
- Render
- AWS EC2
- Google Cloud Run

---

## 📝 Configuration Files

### `tailwind.config.js`

Extended Tailwind theme with:

- Custom purple color scheme
- Blob animations
- Glassmorphism effects
- Custom shadows and gradients

### `vite.config.js`

Vite configuration for:

- React Fast Refresh
- Optimized builds
- Development server settings

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to backend"**

- Ensure backend is running on port 5000
- Check firewall settings
- Verify API endpoint in `ResumeAnalyzer.jsx`

**"PDF upload fails"**

- Ensure file is valid PDF
- Check file size (limit: 10MB recommended)
- Verify backend has PDF processing library

**"API Key error"**

- Confirm Google Gemini API key is valid
- Check `.env` file exists in Backend directory
- Restart backend after adding/changing key

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [Google Gemini API](https://ai.google.dev)
- [Framer Motion](https://www.framer.com/motion)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

Created with ❤️ for career growth and professional development.

---

## 🙏 Acknowledgments

- Google Gemini 2.0 API for AI capabilities
- React community for amazing tools and libraries
- Tailwind CSS for utility-first CSS framework
- Framer Motion for smooth animations

---

## 📞 Support

For support, questions, or feedback:

- Open an issue on GitHub
- Check existing documentation
- Review code comments

**Happy analyzing! 🎉**
