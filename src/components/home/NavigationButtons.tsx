
import React from "react";

export const NavigationButtons = () => {
  const buttons = [
    { title: "Inbound\nCalls" },
    { title: "Outbound\nCalls" },
    { title: "Bi-Directional\nText / SMS" },
    { title: "Bi-Directional\nEmail" },
    { title: "Website\nChatbot" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">
        Run Human-like AI Agents Across:
      </h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(20%-16px)] min-w-[150px]
              backdrop-blur-xl bg-[#9b87f5]/20 border border-white/10 
              shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]
              text-white px-4 py-3 rounded-lg 
              font-semibold text-center whitespace-pre-line text-sm"
          >
            {button.title}
          </div>
        ))}
      </div>
    </div>
  );
};
