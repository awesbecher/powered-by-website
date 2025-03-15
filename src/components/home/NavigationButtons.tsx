
import React from "react";
import { PhoneCall, Mail, MessageSquare, Settings, Slack } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const NavigationButtons = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAboutPage = location.pathname === "/about";
  
  const scrollToAgentTypes = () => {
    const agentTypesSection = document.getElementById('agent-types-section');
    if (agentTypesSection) {
      agentTypesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleButtonClick = (index: number) => {
    if (index === 0) {
      // Navigate to AIVoiceChat when "Inbound & Outbound Calls" is clicked
      navigate("/voice-chat");
      // Ensure the page scrolls to the top
      window.scrollTo(0, 0);
    } else if (index === 1) {
      // Navigate to EmailAgent when "Bi-Directional Text & Email" is clicked
      navigate("/email-agent");
    } else if (index === 2) {
      // Navigate to Products when "Internal Workflows" is clicked
      navigate("/products");
    } else if (index === 3) {
      // Navigate to Products when "Team Collaboration" is clicked
      navigate("/products");
    } else if (index === 4) {
      // Navigate to Products when "Website Chatbots" is clicked
      navigate("/products");
    } else {
      scrollToAgentTypes();
    }
  };

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
        <div className={`flex flex-wrap gap-4 justify-center`}>
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(index)}
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
