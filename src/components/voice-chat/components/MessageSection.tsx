
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MessageSectionProps {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const MessageSection: React.FC<MessageSectionProps> = ({
  message,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="message" className="text-sm font-medium text-gray-300">How can we help?*</Label>
      <Textarea
        id="message"
        name="message"
        value={message}
        onChange={onChange}
        placeholder="Tell us about your project and specific needs..."
        className="min-h-[120px] bg-[#1a1a1a] border-gray-700 hover:border-gray-600 focus:border-purple-500 text-white resize-none rounded-md transition-colors"
        required
      />
    </div>
  );
};
