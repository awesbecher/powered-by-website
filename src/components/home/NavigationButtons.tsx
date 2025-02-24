
import React from "react";
import { PhoneCall, Phone, Mail, MessageSquare } from "lucide-react";

export const NavigationButtons = () => {
  const buttons = [
    { title: "Inbound\nCalls", icon: <PhoneCall className="w-5 h-5 mb-1 mx-auto" /> },
    { title: "Outbound\nCalls", icon: <Phone className="w-5 h-5 mb-1 mx-auto" /> },
    { title: "Bi-Directional\nText / SMS", icon: <Mail className="w-5 h-5 mb-1 mx-auto" /> },
    { title: "Bi-Directional\nEmail", icon: <Mail className="w-5 h-5 mb-1 mx-auto" /> },
    { title: "Website\nChatbot", icon: <MessageSquare className="w-5 h-5 mb-1 mx-auto" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">
        Run Human-like AI Agents Across:
      </h3>
      <div className="flex flex-wrap gap-4 justify-center mb-16">
        {buttons.map((button, index) => (
          <div
            key={index}
            className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(20%-16px)] min-w-[150px]
              backdrop-blur-xl bg-[#9b87f5]/20 border border-white/10 
              shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]
              text-white px-4 py-3 rounded-lg 
              font-semibold text-center whitespace-pre-line text-sm"
          >
            {button.icon}
            {button.title}
          </div>
        ))}
      </div>
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 max-w-4xl mx-auto leading-[1.1] text-center">
        Custom AI Agent Solutions Built for you.{" "}
        <span className="text-[#9b87f5] block mt-4">Quick. Easy. Powerful.</span>
      </h2>
    </div>
  );
};
