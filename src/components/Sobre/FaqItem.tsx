// src/components/FaqItem.tsx
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-blue-500/30 rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
      <button
        onClick={onClick}
        className="w-full text-left px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 flex justify-between items-center hover:bg-[#0F1A34] transition-colors duration-200"
      >
        <span className="text-sm sm:text-base md:text-lg font-medium text-white pr-4">
          {question}
        </span>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-200" />
          ) : (
            <ChevronDown className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-transform duration-200" />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="bg-[#0F1A34] px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 text-sm sm:text-base text-gray-300 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FaqItem;
