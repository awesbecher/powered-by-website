
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {buttons.map((button, index) => (
          <div key={index} className="group perspective">
            <Link
              to={button.path}
              className="block w-full bg-[#9b87f5] hover:bg-[#7a6cc5] text-white px-4 py-3 rounded-lg 
                font-semibold transition-all duration-300 ease-in-out will-change-transform
                group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-lg
                text-center whitespace-pre-line text-sm"
            >
              {button.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
