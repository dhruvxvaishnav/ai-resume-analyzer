import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

// Accordion Context
interface AccordionContextType {
  openItem: string | null;
  setOpenItem: (itemId: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

// Main Accordion Component
export const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
};

// Accordion Item
export const AccordionItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      {children}
    </div>
  );
};

// Accordion Header
export const AccordionHeader = ({
  itemId,
  children,
}: {
  itemId: string;
  children: React.ReactNode;
}) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionHeader must be used within Accordion");

  const { openItem, setOpenItem } = context;
  const isOpen = openItem === itemId;

  const toggleOpen = () => {
    setOpenItem(isOpen ? null : itemId);
  };

  return (
    <button
      className="w-full p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      onClick={toggleOpen}
    >
      <div className="flex justify-between items-center">
        {children}
        <svg
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen ? "transform rotate-180" : ""
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>
  );
};

// Accordion Content
export const AccordionContent = ({
  itemId,
  children,
}: {
  itemId: string;
  children: React.ReactNode;
}) => {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("AccordionContent must be used within Accordion");

  const { openItem } = context;
  const isOpen = openItem === itemId;

  return (
    <div
      className={cn(
        "transition-all duration-200 ease-in-out overflow-hidden",
        isOpen ? "max-h-screen pb-4" : "max-h-0"
      )}
    >
      <div className="px-4">{children}</div>
    </div>
  );
};
