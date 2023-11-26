import React, { useState, Children, cloneElement } from "react";

const Accordion = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      {Children.map(children, (child, index) => {
        const isActive = activeIndex === index;

        return (
          <div key={index} className="mb-4 rounded-lg">
            {cloneElement(child, {
              onClick: () => handleClick(index),
              isActive,
            })}
            {!isActive && (
              <div className="p-4 bg-white border-t">
                {child.props.children}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const AccordionItem = ({ onClick, isActive, title, children }) => (
  <div
    className="flex items-center justify-between p-4 bg-gray-200 rounded-lg cursor-pointer"
    onClick={onClick}
  >
    <span className="text-lg font-semibold">{title}</span>
    <svg
      className={`w-6 h-6 transition-transform ${
        isActive ? "transform rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </div>
);

export { Accordion, AccordionItem };
