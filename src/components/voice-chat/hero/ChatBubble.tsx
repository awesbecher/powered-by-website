import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  delay: number;
}

interface ChatBubbleProps {
  message: ChatMessage;
  isVisible: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={cn(
            'max-w-[80%] p-3 rounded-2xl',
            message.isUser ? 
              'ml-auto bg-purple-600 text-white rounded-br-none' : 
              'mr-auto bg-gray-100 text-gray-900 rounded-bl-none'
          )}
          aria-label={`Chat message ${message.id} of 4: ${message.isUser ? 'User' : 'AI Assistant'}`}
        >
          <p className="text-base leading-relaxed">{message.text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
