
import React from 'react';
import { Button } from '@/components/ui/button';
import PromptTextarea from './PromptTextarea';

interface PromptFormProps {
  onSubmit: (prompt: string) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PromptTextarea 
        value={prompt}
        onChange={setPrompt}
      />
      <Button type="submit" variant="default" className="w-full">
        Save Prompt
      </Button>
    </form>
  );
};

export default PromptForm;
