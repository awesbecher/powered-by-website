
import React from 'react';
import PromptForm from './agent-prompt-editor/PromptForm';

const AgentPromptEditor: React.FC = () => {
  const handleSavePrompt = (prompt: string) => {
    // Handle saving the prompt
    console.log('Saving prompt:', prompt);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/10 rounded-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Agent Prompt Editor</h2>
      <PromptForm onSubmit={handleSavePrompt} />
    </div>
  );
};

export default AgentPromptEditor;
