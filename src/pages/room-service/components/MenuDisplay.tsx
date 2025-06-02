import React from "react";

export const MenuDisplay: React.FC = () => {
  return (
    <div className="flex flex-col items-center space-y-6 mb-24">
      <h2 className="text-3xl font-bold text-white">In-Room Dining Menus</h2>
      <div className="flex flex-col items-center space-y-1">
        <img 
          src="/assets/images/54a3f767-41a4-4083-a920-5592f61dbd63.png"
          alt="Food Menu"
          className="max-w-2xl w-full h-auto"
        />
        <img 
          src="/assets/images/2035fcd4-8b92-4f84-ad1e-c4ecae819711.png"
          alt="Drink Menu"
          className="max-w-2xl w-full h-auto"
        />
      </div>
    </div>
  );
};
