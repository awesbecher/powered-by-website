
import React from 'react';
import { Button } from '@/components/ui/button';

const AgentPromptEditor: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/10 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Agent Prompt Editor</h2>
      <div className="space-y-4">
        <textarea 
          className="w-full h-48 p-4 bg-white/5 border border-white/20 rounded-lg text-white"
          placeholder="Enter your agent's prompt instructions here..."
        />
        <Button variant="default" className="w-full">
          Save Prompt
        </Button>
      </div>
    </div>
  );
};

export default AgentPromptEditor;
