
import React from "react";

export const BackgroundGradient: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
      <div className="absolute top-[30%] right-[5%] w-[20rem] h-[20rem] bg-purple-600/20 rounded-full blur-[7rem]"></div>
      <div className="absolute bottom-[10%] left-[5%] w-[20rem] h-[20rem] bg-blue-600/20 rounded-full blur-[7rem]"></div>
    </div>
  );
};
