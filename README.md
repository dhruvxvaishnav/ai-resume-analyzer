# AI Resume Analyzer

This project is a web application that allows users to upload their resumes and get feedback on them.

## Components

### Navbar

The `Navbar` component is a simple navigation bar that displays the application title and a link to upload a resume.

**Usage:**

```tsx
import Navbar from "./app/components/Navbar";

<Navbar />;
```

### ResumeCard

The `ResumeCard` component displays a preview of a resume, including the company name, job title, and an overall score. Clicking on the card will take the user to a more detailed view of the resume feedback.

**Usage:**

```tsx
import ResumeCard from "./app/components/ResumeCard";

const resume = {
  id: "1",
  companyName: "Google",
  jobTitle: "Software Engineer",
  feedback: {
    overallScore: 85,
  },
  imagePath: "/images/resume-1.png",
};

<ResumeCard resume={resume} />;
```

**Props:**

*   `resume`: An object containing the following properties:
    *   `id`: The unique identifier of the resume.
    *   `companyName`: The name of the company the resume is for.
    *   `jobTitle`: The job title the resume is for.
    *   `feedback`: An object containing the feedback for the resume.
        *   `overallScore`: The overall score of the resume.
    *   `imagePath`: The path to the image of the resume.