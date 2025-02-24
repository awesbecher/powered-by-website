
import { Link } from "react-router-dom";

export const NavigationButtons = () => {
  const buttons = [
    { title: "Inbound\nCalls", path: "/" },
    { title: "Outbound\nCalls", path: "/" },
    { title: "Bi-Directional\nText / SMS", path: "/" },
    { title: "Bi-Directional\nEmail", path: "/" },
    { title: "Website\nChatbot", path: "/" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h3 className="text-white text-xl font-semibold mb-4 text-center">
        Run Human-like AI Agents Across:
      </h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {buttons.map((button, index) => (
          <Link
            key={index}
            to={button.path}
            className="w-[calc(50%-8px)] sm:w-[calc(33.333%-16px)] md:w-[calc(20%-16px)] min-w-[150px]
              backdrop-blur-xl bg-[#9b87f5]/20 border border-white/10 
              shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]
              text-white px-4 py-3 rounded-lg 
              font-semibold text-center whitespace-pre-line text-sm"
          >
            {button.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
