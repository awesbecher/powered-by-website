
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChatTester } from "@/components/openai/ChatTester";

export default function OpenAITest() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">OpenAI Integration Test</h1>
        
        <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Test Instructions</h2>
          <p className="text-gray-700 mb-2">
            This page tests the OpenAI integration by sending a simple message through the 
            <code className="mx-1 px-1 py-0.5 bg-gray-100 rounded">openaiService</code> 
            to the edge function.
          </p>
          <p className="text-gray-700">
            Enter a test message below and check the console for detailed logs about the request flow.
          </p>
        </div>
        
        <ChatTester />
      </div>
      
      <Footer />
    </div>
  );
}
