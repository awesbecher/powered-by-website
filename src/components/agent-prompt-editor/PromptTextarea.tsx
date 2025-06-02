
import React from 'react';

interface PromptTextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PromptTextarea: React.FC<PromptTextareaProps> = ({ 
  value, 
  onChange, 
  placeholder = "Enter your agent's prompt instructions here..." 
}) => {
  return (
    <textarea 
      className="w-full h-48 p-4 bg-white/5 border border-white/20 rounded-lg text-white"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default PromptTextarea;
