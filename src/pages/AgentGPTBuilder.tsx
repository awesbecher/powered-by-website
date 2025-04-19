import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AgentPromptEditor from "@/components/AgentPromptEditor";
import { Toaster } from "@/components/ui/toaster";

const AgentGPTBuilder = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <div className="pt-6 pb-16 px-4">
        <AgentPromptEditor />
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default AgentGPTBuilder;
