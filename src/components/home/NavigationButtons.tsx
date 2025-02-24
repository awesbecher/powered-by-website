
import { Link } from "react-router-dom";

export const NavigationButtons = () => {
  const buttons = [
    { title: "Inbound\nCalls", path: "/" },
    { title: "Outbound\nCalling", path: "/" },
    { title: "Bi-Directional\nText / SMS", path: "/" },
    { title: "Bi-Directional\nEmail", path: "/" },
    { title: "Website\nChatbot", path: "/" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-center gap-4 flex-wrap">
      {buttons.map((button, index) => (
        <Link
          key={index}
          to={button.path}
          className="min-w-[200px] bg-[#9b87f5] hover:bg-[#7a6cc5] text-white px-6 py-4 rounded-lg 
            font-semibold transition-all duration-300 ease-in-out transform hover:-translate-y-1 
            text-center whitespace-pre-line"
        >
          {button.title}
        </Link>
      ))}
    </div>
  );
};
