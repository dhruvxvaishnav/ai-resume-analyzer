# AI Resume Analyzer

![AI Resume Analyzer](public/images/resume-1.png)

A modern web application that provides AI-powered feedback on resumes, helping job seekers optimize their resumes for Applicant Tracking Systems (ATS) and improve their chances of landing interviews.

## 🚀 Features

### Core Functionality

- **AI-Powered Resume Analysis** - Get detailed feedback on resume content, structure, tone, and skills
- **ATS Compatibility Scoring** - Analyze how well your resume performs with Applicant Tracking Systems
- **PDF Processing** - Upload PDF resumes and automatically convert them to images for display
- **Multi-Category Feedback** - Receive targeted suggestions for:
  - Tone & Style
  - Content Quality
  - Document Structure
  - Skills Assessment

### User Experience

- **Secure Authentication** - User login/logout via Puter.js
- **Resume Management** - View history of analyzed resumes
- **Real-time Processing** - Live status updates during resume analysis
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Interactive Feedback** - Expandable sections with detailed suggestions

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend & Services

- **Puter.js** - Cloud platform providing:
  - Authentication
  - File storage
  - Key-value database
  - AI analysis capabilities
- **Zustand** - Lightweight state management
- **PDF.js** - PDF processing and rendering

### Development Tools

- **TypeScript** - Static type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📦 Installation

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage

### Getting Started

1. **Sign In** - Authenticate using Puter.js
2. **Upload Resume** - Choose a PDF file (max 20MB)
3. **Add Job Details** - Enter company name, job title, and description
4. **Get Analysis** - Wait for AI processing (30-60 seconds)
5. **Review Feedback** - Explore detailed suggestions and scores

### Understanding Your Scores

- **90-100** - Excellent (Strong)
- **70-89** - Good (Good Start)
- **Below 70** - Needs Improvement (Needs Work)

### Feedback Categories

- **ATS Score** - Compatibility with tracking systems
- **Tone & Style** - Professional language and consistency
- **Content** - Achievement descriptions and impact
- **Structure** - Organization and formatting
- **Skills** - Relevant technical and soft skills

## 📁 Project Structure

```
/
├── app/                    # Main application code
│   ├── components/         # Reusable React components
│   │   ├── Accordion.tsx   # Collapsible content sections
│   │   ├── ATS.tsx         # ATS score display
│   │   ├── Details.tsx     # Detailed feedback sections
│   │   ├── FileUploader.tsx# Drag-and-drop upload
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── ResumeCard.tsx  # Resume preview cards
│   │   ├── ScoreGauge.tsx  # Visual score displays
│   │   └── Summary.tsx     # Score overview
│   ├── lib/                # Utility functions
│   │   ├── puter.ts        # Puter.js integration
│   │   ├── pdf2img.ts      # PDF to image conversion
│   │   └── utils.ts        # General utilities
│   ├── routes/             # Page components
│   │   ├── home.tsx        # Dashboard/resume list
│   │   ├── upload.tsx      # Resume upload form
│   │   ├── resume.tsx      # Feedback display
│   │   ├── auth.tsx        # Authentication
│   │   └── wipe.tsx        # Data cleanup utility
│   ├── app.css             # Global styles
│   └── root.tsx            # App root component
├── constants/              # Configuration
│   └── index.ts            # AI prompts and data
├── types/                  # TypeScript definitions
│   └── index.d.ts          # Interface definitions
├── public/                 # Static assets
│   ├── images/             # UI images and examples
│   └── icons/              # SVG icons
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

## 🧩 Key Components

### Data Flow

1. **Upload** → PDF file uploaded to Puter.js storage
2. **Convert** → PDF converted to image for preview
3. **Analyze** → AI processes resume content with job context
4. **Store** → Results saved to key-value database
5. **Display** → Formatted feedback shown to user

### Component Architecture

- **Accordion** - Expandable sections for organized feedback
- **ScoreGauge** - Visual representation of scores
- **FileUploader** - Drag-and-drop with progress indicators
- **ATS** - Specialized ATS score display
- **Details** - Categorized feedback with tips

## 🔄 Available Scripts

```bash
# Development
pnpm dev          # Start dev server with hot reload
pnpm build        # Build for production
pnpm preview      # Preview production build

# Quality Assurance
pnpm typecheck    # Run TypeScript compiler
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier

# Deployment
pnpm start        # Start production server
```

## 🔐 Environment Setup

No environment variables required - Puter.js handles all backend configuration automatically.

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Run type checking: `pnpm typecheck`
6. Commit changes: `git commit -m 'Add amazing feature'`
7. Push to branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Coding Standards

- Use TypeScript for all new code
- Follow existing component patterns
- Add JSDoc comments for complex functions
- Keep components focused and reusable
- Use Tailwind for styling (no custom CSS)

## 🐛 Troubleshooting

### Common Issues

**Resume not uploading?**

- Check file size (max 20MB)
- Ensure file is PDF format
- Verify internet connection

**Scores showing as 0?**

- Check browser console for errors
- Ensure PDF contains readable text
- Try re-uploading the resume

**Authentication failing?**

- Clear browser cache
- Try incognito/private mode
- Check Puter.js service status

## 📈 Performance

- **Bundle Size** - Optimized with Vite tree-shaking
- **Load Time** - Lazy loading for route components
- **File Processing** - Client-side PDF conversion reduces server load
- **Caching** - Resume data cached locally until refresh

## 🔮 Future Enhancements

- **Multiple File Formats** - Support for Word documents
- **Resume Templates** - Built-in resume builder
- **Skill Recommendations** - Industry-specific skill suggestions
- **Comparison Tool** - Before/after resume analysis
- **Export Options** - PDF reports of feedback

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Puter.js** - For providing the cloud infrastructure and AI capabilities
- **PDF.js** - Mozilla's excellent PDF processing library
- **Tailwind CSS** - For the utility-first CSS framework
- **React Team** - For the amazing React ecosystem

---
