
import React from "react";

export const LoadingState = () => {
  return (
    <div className="p-4 bg-white min-h-[500px] max-h-[500px] h-[500px] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9b87f5]"></div>
      <p className="mt-4 text-base text-gray-600">Connecting to an agent...</p>
    </div>
  );
};
