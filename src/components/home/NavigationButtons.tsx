
import React from "react";
import { PhoneCall, Mail, MessageSquare, Settings, Slack } from "lucide-react";

export const NavigationButtons = () => {
  const buttons = [
    { title: "Inbound &\nOutbound Calls", icon: <PhoneCall className="w-6 h-6 mb-2 mx-auto text-[#9b87f5]" /> },
    { title: "Bi-Directional\nText & Email", icon: <Mail className="w-6 h-6 mb-2 mx-auto text-[#9b87f5]" /> },
    { title: "Internal\nWorkflows", icon: <Settings className="w-6 h-6 mb-2 mx-auto text-[#9b87f5]" /> },
    { title: "Team\nCollaboration", icon: <Slack className="w-6 h-6 mb-2 mx-auto text-[#9b87f5]" /> },
    { title: "Website\nChatbots", icon: <MessageSquare className="w-6 h-6 mb-2 mx-auto text-[#9b87f5]" /> },
  ];

  return (
    <div className="w-full px-4">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-gray-300 text-2xl font-bold mb-4 text-center">
          Run Human-like AI Agents Across:
        </h3>
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          {buttons.map((button, index) => (
            <div
              key={index}
              className="w-[calc(45%-8px)] sm:w-[calc(30%-11px)] md:w-[calc(18%-13px)] min-w-[140px] max-w-[160px]
                backdrop-blur-xl bg-gradient-to-br from-[#2f1c4a]/80 to-[#1a0b2e]/80 
                border border-[#9b87f5]/20 hover:border-[#9b87f5]/40
                shadow-[0_8px_16px_-4px_rgba(0,0,0,0.3)]
                hover:shadow-[0_12px_24px_-4px_rgba(155,135,245,0.2)]
                text-white px-5 py-4 rounded-xl
                font-medium text-center whitespace-pre-line text-sm
                transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[#2f1c4a]/90"
            >
              {button.icon}
              {button.title}
            </div>
          ))}
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-16 max-w-4xl mx-auto leading-[1.1] text-center">
          Custom AI Agent Solutions Built for you.{" "}
          <span className="text-[#9b87f5] block mt-4 bg-gradient-to-r from-[#9b87f5] to-[#7a6cc5] bg-clip-text text-transparent">
            Quick. Easy. Powerful.
          </span>
        </h2>
      </div>
    </div>
  );
};
