
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface MessageSectionProps {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

export const MessageSection: React.FC<MessageSectionProps> = ({
  message,
  onChange,
  error
}) => {
  const isValid = message.length > 0 && !error;
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <Label htmlFor="message" className="text-xs font-medium text-gray-300">How can we help?*</Label>
        {message && (
          isValid ? (
            <span className="text-green-500 flex items-center gap-1 text-[10px]">
              <CheckCircle2 className="h-2.5 w-2.5" /> Valid
            </span>
          ) : error ? (
            <span className="text-red-500 flex items-center gap-1 text-[10px]">
              <AlertCircle className="h-2.5 w-2.5" /> {error}
            </span>
          ) : null
        )}
      </div>
      <Textarea
        id="message"
        name="message"
        value={message}
        onChange={onChange}
        placeholder="Tell us about your project and specific needs..."
        className={`min-h-[80px] bg-[#1a1a1a] border-gray-700 hover:border-gray-600 ${error ? 'border-red-500 focus:border-red-500' : isValid && message ? 'border-green-500 focus:border-green-500' : 'focus:border-purple-500'} text-white resize-none rounded-md transition-colors text-sm`}
        required
      />
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
};
