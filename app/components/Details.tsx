import React from "react";
import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "~/components/Accordion";

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  const badgeColor =
    categoryScore > 69
      ? "bg-badge-green text-badge-green-text"
      : categoryScore > 49
      ? "bg-badge-yellow text-badge-yellow-text"
      : "bg-badge-red text-badge-red-text";

  const scoreText =
    categoryScore > 69
      ? "Strong"
      : categoryScore > 49
      ? "Good Start"
      : "Needs Work";

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            badgeColor
          )}
        >
          {scoreText}
        </span>
      </div>
      <div className="text-xl font-semibold">
        <span
          className={
            categoryScore > 69
              ? "text-green-600"
              : categoryScore > 49
              ? "text-yellow-600"
              : "text-red-600"
          }
        >
          {categoryScore}
        </span>
        /100
      </div>
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: Array<{
    type: "good" | "improve";
    tip: string;
    explanation: string;
  }>;
}) => {
  if (!tips || tips.length === 0) {
    return (
      <div className="text-gray-500 italic">
        No specific feedback available for this category.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tips.map((tip, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col gap-2 rounded-2xl p-4",
            tip.type === "good"
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-yellow-50 border-yellow-500 text-yellow-800"
          )}
        >
          <div className="flex flex-row gap-2 items-start">
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="tip icon"
              className="size-5 mt-0.5 flex-shrink-0"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{tip.tip}</p>
              <p className="text-sm opacity-90">{tip.explanation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
