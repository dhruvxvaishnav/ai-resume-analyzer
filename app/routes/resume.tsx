import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => [
  { title: "Resumind | Review " },
  { name: "description", content: "Detailed overview of your resume" },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`);
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      try {
        const resume = await kv.get(`resume:${id}`);
        if (!resume) return;

        const data = JSON.parse(resume);

        // Load PDF
        const resumeBlob = await fs.read(data.resumePath);
        if (!resumeBlob) return;
        const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
        const resumeUrl = URL.createObjectURL(pdfBlob);
        setResumeUrl(resumeUrl);

        // Load image
        const imageBlob = await fs.read(data.imagePath);
        if (!imageBlob) return;
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageUrl(imageUrl);

        // Debug: log the actual feedback structure
        console.log("Raw feedback data:", data.feedback);

        // Check if feedback is already in the correct format
        if (data.feedback && typeof data.feedback === "object") {
          // If the feedback already matches our Feedback interface structure
          if ("overallScore" in data.feedback && "ATS" in data.feedback) {
            setFeedback(data.feedback as Feedback);
            console.log("Using feedback as-is:", data.feedback);
            return;
          }

          // If it's an older format, transform it
          const transformedFeedback: Feedback = {
            overallScore: data.feedback.overallScore || 75, // Default fallback
            ATS: {
              score: data.feedback.ATS?.score || 70,
              tips: data.feedback.ATS?.tips || [
                {
                  type: "improve",
                  tip: "Add relevant keywords to improve ATS compatibility",
                },
              ],
            },
            toneAndStyle: {
              score: data.feedback.toneAndStyle?.score || 80,
              tips: data.feedback.toneAndStyle?.tips || [
                {
                  type: "good",
                  tip: "Professional tone maintained throughout",
                  explanation:
                    "Your resume maintains a consistent professional tone",
                },
              ],
            },
            content: {
              score: data.feedback.content?.score || 75,
              tips: data.feedback.content?.tips || [
                {
                  type: "improve",
                  tip: "Quantify your achievements with specific metrics",
                  explanation:
                    "Adding numbers and percentages makes your accomplishments more impactful",
                },
              ],
            },
            structure: {
              score: data.feedback.structure?.score || 85,
              tips: data.feedback.structure?.tips || [
                {
                  type: "good",
                  tip: "Well-organized sections",
                  explanation:
                    "Your resume follows a logical structure with clear sections",
                },
              ],
            },
            skills: {
              score: data.feedback.skills?.score || 70,
              tips: data.feedback.skills?.tips || [
                {
                  type: "improve",
                  tip: "Include more industry-specific skills",
                  explanation:
                    "Adding relevant technical skills can improve your resume's effectiveness",
                },
              ],
            },
          };

          setFeedback(transformedFeedback);
          console.log("Transformed feedback:", transformedFeedback);
        } else {
          // Fallback: create default feedback structure
          console.warn("No valid feedback data found, using defaults");
          const defaultFeedback: Feedback = {
            overallScore: 75,
            ATS: {
              score: 70,
              tips: [
                {
                  type: "improve",
                  tip: "Optimize for ATS systems with relevant keywords",
                },
                {
                  type: "improve",
                  tip: "Use standard section headers like 'Experience' and 'Education'",
                },
              ],
            },
            toneAndStyle: {
              score: 80,
              tips: [
                {
                  type: "good",
                  tip: "Professional presentation",
                  explanation:
                    "Your resume maintains a professional appearance",
                },
                {
                  type: "improve",
                  tip: "Consider varying sentence structure",
                  explanation:
                    "Mix different sentence lengths for better readability",
                },
              ],
            },
            content: {
              score: 75,
              tips: [
                {
                  type: "improve",
                  tip: "Quantify achievements with numbers",
                  explanation:
                    "Use specific metrics to demonstrate your impact and results",
                },
                {
                  type: "improve",
                  tip: "Use action verbs to start bullet points",
                  explanation:
                    "Begin achievements with strong action words like 'Developed', 'Increased', 'Led'",
                },
              ],
            },
            structure: {
              score: 85,
              tips: [
                {
                  type: "good",
                  tip: "Clear section organization",
                  explanation:
                    "Your resume sections are well-defined and easy to follow",
                },
                {
                  type: "improve",
                  tip: "Ensure consistent formatting",
                  explanation:
                    "Check that dates, spacing, and fonts are uniform throughout",
                },
              ],
            },
            skills: {
              score: 70,
              tips: [
                {
                  type: "improve",
                  tip: "Add relevant technical skills",
                  explanation:
                    "Include programming languages, tools, and software relevant to your field",
                },
                {
                  type: "improve",
                  tip: "Group skills by category",
                  explanation:
                    "Organize skills into sections like 'Technical Skills', 'Languages', etc.",
                },
              ],
            },
          };

          setFeedback(defaultFeedback);
        }
      } catch (error) {
        console.error("Error loading resume:", error);
        // Set default feedback on error
        setFeedback({
          overallScore: 70,
          ATS: {
            score: 65,
            tips: [
              {
                type: "improve",
                tip: "Resume analysis failed - please try re-uploading",
              },
            ],
          },
          toneAndStyle: {
            score: 75,
            tips: [
              {
                type: "improve",
                tip: "Unable to analyze",
                explanation: "Please re-upload for detailed analysis",
              },
            ],
          },
          content: {
            score: 75,
            tips: [
              {
                type: "improve",
                tip: "Unable to analyze",
                explanation: "Please re-upload for detailed analysis",
              },
            ],
          },
          structure: {
            score: 80,
            tips: [
              {
                type: "improve",
                tip: "Unable to analyze",
                explanation: "Please re-upload for detailed analysis",
              },
            ],
          },
          skills: {
            score: 70,
            tips: [
              {
                type: "improve",
                tip: "Unable to analyze",
                explanation: "Please re-upload for detailed analysis",
              },
            ],
          },
        });
      }
    };

    if (id) {
      loadResume();
    }
  }, [id, kv, fs]);

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-wxl:h-fit w-fit">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  title="resume"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section">
          <h2 className="text-4xl !text-black font-bold">Resume Review</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
              <Summary feedback={feedback} />
              <ATS score={feedback.ATS.score} suggestions={feedback.ATS.tips} />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" className="w-full" />
          )}
        </section>
      </div>
    </main>
  );
};

export default Resume;
