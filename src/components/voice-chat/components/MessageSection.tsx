
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface MessageSectionProps {
  message: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const MessageSection: React.FC<MessageSectionProps> = ({
  message,
  onChange
}) => {
  return (
    <div>
      <Textarea
        name="message"
        value={message}
        onChange={onChange}
        placeholder="How can we help?*"
        className="min-h-[120px] bg-[#1a1a1a] border-gray-800 text-white resize-none"
        required
      />
    </div>
  );
};
