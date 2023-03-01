import { useState } from "react";
import { faqs } from "../../../../config/constants/faq_constants";

export const FaqSection = () =>{
    
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(id === expanded ? null : id);
  };

  return (
    <>
        <div className="row justify-center">
            <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
            
            {faqs.map((question) => (
                <div key={question.id} className="mb-6">
                    <button
                        onClick={() => toggleExpand(question.id)}
                        className="question-text"
                        >
                        {question.question}
                        <svg
                            className={`w-6 h-6 ml-2 ${
                            expanded === question.id ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {expanded === question.id && (
                    <div className="answer-tab">
                        {question.answer}
                    </div>
                    )}
            </div>
            ))}
        </div>
    </>
  );
}