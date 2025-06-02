
import { Link } from "react-router-dom";

interface SectionTitleProps {
  title: string;
  linked?: boolean;
}

export const SectionTitle = ({ title, linked = false }: SectionTitleProps) => {
  const TitleContent = () => (
    <h2 className="relative text-5xl font-bold text-white mb-8 transition-colors duration-300 hover:bg-gradient-to-r hover:from-purple-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent pt-0 pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-purple-500 after:to-indigo-500">
      {title}
    </h2>
  );

  if (linked) {
    return (
      <Link to="/about">
        <TitleContent />
      </Link>
    );
  }

  return <TitleContent />;
};
