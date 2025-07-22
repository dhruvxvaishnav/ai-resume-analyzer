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
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      // Transform the actual data to match your Feedback interface
      const transformedFeedback: Feedback = {
        overallScore: data.feedback.overall_rating || 0,
        ATS: {
          score: data.feedback.ats_compatibility || 0,
          tips:
            data.feedback.ats_optimization_tips?.map((tip: string) => ({
              type: "improve" as const,
              tip: tip,
            })) || [],
        },
        toneAndStyle: {
          score: data.feedback.section_ratings?.summary || 0,
          tips: [
            // Add strengths as good tips
            ...(data.feedback.strengths?.map((strength: string) => ({
              type: "good" as const,
              tip: strength,
              explanation: "This is a strength identified in your resume",
            })) || []),
            // Add some weaknesses related to tone
            ...(data.feedback.weaknesses
              ?.slice(0, 2)
              .map((weakness: string) => ({
                type: "improve" as const,
                tip: weakness,
                explanation:
                  "Consider improving this aspect for better tone and style",
              })) || []),
          ],
        },
        content: {
          score: data.feedback.section_ratings?.experience || 0,
          tips:
            data.feedback.improvement_suggestions?.map((tip: string) => ({
              type: "improve" as const,
              tip: tip,
              explanation: "This improvement will enhance your resume content",
            })) || [],
        },
        structure: {
          score: data.feedback.section_ratings?.format_and_design || 0,
          tips: [
            // Add format-related strengths
            {
              type: "good" as const,
              tip: "Clean, professional layout with good organization",
              explanation: "Your resume has a well-structured format",
            },
            // Add some structure-related weaknesses
            ...(data.feedback.weaknesses
              ?.filter(
                (w: string) =>
                  w.toLowerCase().includes("section") ||
                  w.toLowerCase().includes("format") ||
                  w.toLowerCase().includes("organization")
              )
              .map((weakness: string) => ({
                type: "improve" as const,
                tip: weakness,
                explanation:
                  "Improving this will enhance your resume structure",
              })) || []),
          ],
        },
        skills: {
          score: data.feedback.section_ratings?.skills || 0,
          tips: [
            // Add present keywords as good tips
            ...(data.feedback.keyword_analysis?.present_keywords
              ?.slice(0, 3)
              .map((keyword: string) => ({
                type: "good" as const,
                tip: `"${keyword}" keyword is present`,
                explanation: "This relevant keyword strengthens your resume",
              })) || []),
            // Add missing keywords as improvement tips
            ...(data.feedback.keyword_analysis?.missing_keywords
              ?.slice(0, 5)
              .map((keyword: string) => ({
                type: "improve" as const,
                tip: `Consider adding "${keyword}" keyword`,
                explanation:
                  "This keyword is commonly sought by employers in your field",
              })) || []),
          ],
        },
      };

      setFeedback(transformedFeedback);
      console.log({ resumeUrl, imageUrl, feedback: transformedFeedback });
    };
    loadResume();
  }, [id]);

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
