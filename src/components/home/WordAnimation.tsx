
import { useState, useEffect } from "react";

export const WordAnimation = () => {
  const [currentWord, setCurrentWord] = useState("Voice");
  const words = ["Voice", "Phone", "Text", "Email", "Slack", "Chat", "Docs", "Survey"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % words.length;
        setCurrentWord(words[nextIndex]);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className="
        relative inline-block min-w-[120px] sm:min-w-[180px] 
        transition-all duration-500 ease-in-out 
        animate-fade-in
        bg-gradient-to-r from-accent via-[#E5DEFF] to-accent 
        bg-clip-text text-transparent
        drop-shadow-[0_0_10px_rgba(155,135,245,0.3)]
      "
    >
      {currentWord}
    </span>
  );
};
