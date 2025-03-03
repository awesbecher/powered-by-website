
import React from "react";

const AssetTest = () => {
  return (
    <div className="pt-24 min-h-screen bg-[#222222] text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-[#9b87f5]">Asset Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#1A1F2C] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-[#9b87f5]">Test Section 1</h2>
            <p className="text-gray-300 mb-4">
              This is a testing area for new features and assets that may be implemented across the site in the future.
            </p>
            <div className="h-48 bg-gradient-to-br from-[#9b87f5]/20 to-[#1A1F2C] rounded-md flex items-center justify-center">
              <span className="text-lg font-medium text-[#D6BCFA]">Asset Placeholder</span>
            </div>
          </div>
          
          <div className="bg-[#1A1F2C] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-[#9b87f5]">Test Section 2</h2>
            <p className="text-gray-300 mb-4">
              Use this area to experiment with different layouts, components, and styling before implementing them elsewhere.
            </p>
            <div className="h-48 bg-gradient-to-br from-[#1A1F2C] to-[#9b87f5]/20 rounded-md flex items-center justify-center">
              <span className="text-lg font-medium text-[#D6BCFA]">Component Testing</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 bg-[#1A1F2C] p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-[#9b87f5]">Feature Playground</h2>
          <p className="text-gray-300 mb-6">
            This isolated page allows for testing new features without affecting the main site. Add components, styles, or functionality here to evaluate their performance and appearance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-[#9b87f5]/30 rounded-md p-4 hover:bg-[#9b87f5]/10 transition duration-300">
                <h3 className="text-xl font-medium mb-2 text-[#9b87f5]">Test Item {item}</h3>
                <p className="text-gray-400">Sample content for testing purposes</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTest;
