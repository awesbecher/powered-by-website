
import React from "react";
import { useEffect } from "react";

// Define the Tally interface
interface TallyWindow extends Window {
  Tally?: {
    loadEmbeds: () => void;
    openPopup: (formId: string) => void;
  };
}

const CTASection = () => {
  useEffect(() => {
    // Load Tally script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleContactClick = () => {
    const tallyWindow = window as TallyWindow;
    if (tallyWindow.Tally && tallyWindow.Tally.openPopup) {
      tallyWindow.Tally.openPopup("w2og9b");
    }
  };

  return (
    <div className="text-center py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Ready to transform your customer experience?
      </h2>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
        Get started with AI agents today or talk to our team about your specific needs.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={handleContactClick}
          className="px-8 py-3 text-lg font-medium text-white bg-[#9b87f5] hover:bg-[#8976d9] rounded-lg transition duration-300 shadow-lg"
        >
          Contact Sales
        </button>
        <a
          href="/contact"
          className="px-8 py-3 text-lg font-medium text-white bg-transparent hover:bg-white/10 border border-white/30 rounded-lg transition duration-300 shadow-lg"
        >
          Book a Demo
        </a>
      </div>
    </div>
  );
};

export default CTASection;
