# AI Resume Analyzer

This project is a web application that allows users to upload their resumes and get AI-powered feedback on them. It analyzes various aspects of the resume, such as tone, style, content, structure, and skills, providing a detailed report to help users improve their resumes for job applications.

## Screenshots

![Home Page](/public/images/resume-1.png)
_The home page displaying a list of analyzed resumes._

![Feedback View](/public/images/resume-2.png)
_Detailed feedback view for a resume._

## Features

-   **AI-Powered Feedback:** Get detailed feedback on your resume'''s tone, content, structure, and skills.
-   **ATS Score:** See how well your resume is likely to perform with Applicant Tracking Systems (ATS).
-   **PDF Upload & Conversion:** Upload your resume in PDF format, and it will be automatically converted to an image for display.
-   **Secure Authentication:** User authentication is handled by Puter.js.
-   **Data Persistence:** Your resume data is stored securely in your Puter account.

## Project Structure

The project is structured as follows:

```
/
├── app/
│   ├── components/  # Reusable React components
│   ├── lib/         # Utility functions and libraries
│   ├── routes/      # Application routes
│   ├── app.css      # Global styles
│   └── root.tsx     # Root application component
├── constants/       # Shared constants
├── public/          # Static assets (images, icons)
├── types/           # TypeScript type definitions
├── package.json     # Project dependencies and scripts
├── vite.config.ts   # Vite configuration
└── tsconfig.json    # TypeScript configuration
```

## Technologies Used

-   **Frontend:**
    -   [React](https://reactjs.org/)
    -   [React Router](https://reactrouter.com/)
    -   [Vite](https://vitejs.dev/)
    -   [TypeScript](https://www.typescriptlang.org/)
    -   [Tailwind CSS](https://tailwindcss.com/)
-   **Backend & State Management:**
    -   [Puter.js](https://puter.com/): Handles authentication, file storage, database (KV), and AI functionalities.
    -   [Zustand](https://github.com/pmndrs/zustand): For client-side state management.
-   **PDF Processing:**
    -   [PDF.js](https://mozilla.github.io/pdf.js/): For rendering PDF documents in the browser.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or newer recommended)
-   [pnpm](https://pnpm.io/) (or your preferred package manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ai-resume-analyzer
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### Running the Application

To start the development server, run:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Scripts

-   `pnpm dev`: Starts the development server.
-   `pnpm build`: Builds the application for production.
-   `pnpm start`: Starts the production server.
-   `pnpm typecheck`: Runs the TypeScript compiler to check for type errors.

## Components

The application is built with a set of reusable components found in `app/components/`:

-   **`Accordion.tsx`**: A collapsible accordion component for displaying content in sections.
-   **`Navbar.tsx`**: The main navigation bar.
-   **`ResumeCard.tsx`**: A card to display a summary of a resume on the home page.
-   **`ScoreCircle.tsx`**: A component to display a score in a circular progress bar.
-   **`ScoreGuage.tsx`**: A gauge-like component to visualize a score.
-   **`feedback/`**: Components related to displaying AI feedback:
    -   **`ATS.tsx`**: Shows the Applicant Tracking System (ATS) score and related tips.
    -   **`Details.tsx`**: Provides a detailed breakdown of feedback categories (Tone, Content, etc.).
    -   **`Summary.tsx`**: Displays an overall score summary.

## Routes

The application'''s routes are defined in `app/routes/`:

-   **`home.tsx` (`/`)**: The main page that displays the user'''s submitted resumes.
-   **`auth.tsx` (`/auth`)**: Handles user sign-in and sign-out using Puter.js.
-   **`resume.$id.tsx` (`/resume/:id`)**: Displays the detailed feedback for a specific resume. (Note: This route is not yet implemented in the provided file structure, but is a likely future route).
-   **`upload.tsx` (`/upload`)**: A page for uploading new resumes. (Note: This route is not yet implemented in the provided file structure).
-   **`wipe.tsx` (`/wipe`)**: A utility route to clear all application data from the user'''s Puter account (files and KV store).

## State Management

The application uses **Zustand** for simple, client-side state management. For all backend interactions, it uses a custom Zustand store (`app/lib/puter.ts`) that acts as a wrapper around the **Puter.js SDK**. This `usePuterStore` provides a clean and reactive way to interact with Puter'''s services for authentication, file system operations, AI, and key-value storage.

## Contributing

Contributions are welcome! If you have suggestions for improvements, please open an issue or submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m '''Add some AmazingFeature'''`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
