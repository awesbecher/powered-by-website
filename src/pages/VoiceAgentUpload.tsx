
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DocumentUploader } from '@/components/voice-agent-beta/upload/DocumentUploader';

const VoiceAgentUpload = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-600/20 border border-purple-500/40 rounded-lg px-4 py-1 mb-4">
              <span className="text-purple-300 font-semibold">Knowledge Management</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Upload Knowledge Base</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Add documents and configure your AI Voice Agent's knowledge base. Upload text documents that contain information your AI should know and reference when answering questions.
            </p>
          </div>
          
          {/* Uploader Component */}
          <DocumentUploader />
          
          {/* Instructions */}
          <div className="mt-12 text-center text-gray-400 text-sm max-w-2xl mx-auto">
            <h3 className="text-white text-lg font-medium mb-2">How it works:</h3>
            <p className="mb-2">
              1. Add a model prompt (optional) to customize how your AI responds
            </p>
            <p className="mb-2">
              2. Upload text documents containing information your AI should know
            </p>
            <p className="mb-2">
              3. Submit to process and index your knowledge base
            </p>
            <p>
              4. Your AI will use this knowledge when responding to voice queries
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VoiceAgentUpload;
