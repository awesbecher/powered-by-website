
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Database } from "lucide-react";

export const InstructionsText: React.FC = () => {
  return (
    <div className="text-center">
      <p className="text-gray-400 text-sm mb-3">
        Click the microphone to ask a question. The AI will respond based on your knowledge base using Pinecone.
      </p>
      <p className="text-gray-400 text-sm mb-3">
        For best results, speak clearly and ask specific questions about the topics in your knowledge base.
      </p>
      <div className="mt-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/voice-agent-upload" className="flex items-center text-purple-300 hover:text-purple-100">
            <Database className="mr-2 h-4 w-4" />
            Upload Knowledge Base
          </Link>
        </Button>
      </div>
    </div>
  );
};
