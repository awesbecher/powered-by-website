
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
        pb-4
        after:content-[''] 
        after:absolute 
        after:bottom-0 
        after:left-0 
        after:w-full 
        after:h-[4px] 
        after:bg-accent
        after:transform
        after:origin-bottom-left
        after:[clip-path:path('M0,0_C25,0_25,60_50,60_C75,60_75,0_100,0')]
      "
    >
      {currentWord}
    </span>
  );
};
