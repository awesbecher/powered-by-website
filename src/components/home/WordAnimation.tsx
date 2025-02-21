
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
        after:h-1
        after:bg-gradient-to-r 
        after:from-purple-500 
        after:via-accent 
        after:to-purple-500
        after:animate-[wave_2s_ease-in-out_infinite]
        after:rounded-full
        after:blur-[2px]
        before:content-['']
        before:absolute
        before:bottom-0
        before:left-0
        before:w-full
        before:h-[3px]
        before:bg-gradient-to-r
        before:from-accent/40
        before:via-accent
        before:to-accent/40
        before:animate-[wave_2s_ease-in-out_infinite_reverse]
        before:rounded-full
      "
    >
      {currentWord}
    </span>
  );
};
