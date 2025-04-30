import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';

interface Message {
  id: number;
  speaker: 'user' | 'agent';
  text: string;
  delay: number;
}

interface TranscriptPanelProps {
  messages: Message[];
  visibleMessages: number[];
}

export const TranscriptPanel: React.FC<TranscriptPanelProps> = ({
  messages,
  visibleMessages,
}) => {
  return (
    <div 
      className="absolute bottom-24 left-6 right-6"
      aria-label="Voice conversation transcript"
    >
      <div className="bg-gray-900/75 backdrop-blur-md rounded-lg border border-purple-500/20 shadow-xl">
        <div className="p-6 max-h-[40vh] overflow-y-auto">
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((message) =>
                visibleMessages.includes(message.id) ? (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1],
                      delay: 0.1 
                    }}
                    className="relative"
                  >
                    {/* Voice indicator and speaker info */}
                    <div className={`flex items-center gap-3 mb-2 ${
                      message.speaker === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      {message.speaker === 'agent' && (
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/30">
                            <img
                              src="/assets/team/Michael.jpg"
                              alt="Michael - AI Assistant"
                              className="w-full h-full object-cover"
                            />
                            {/* Pulsing ring effect */}
                            <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full animate-ping" />
                          </div>
                          <span className="text-sm font-medium text-blue-300">
                            Michael speaking...
                          </span>
                        </div>
                      )}
                      {message.speaker === 'user' && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-purple-300">
                            You speaking...
                          </span>
                          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                            <Mic className="w-4 h-4 text-purple-300" />
                            {/* Pulsing ring effect */}
                            <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full animate-ping" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Voice waveform and text */}
                    <div className={`relative group ${
                      message.speaker === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {/* Animated waveform background */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className={`absolute inset-0 ${
                          message.speaker === 'user'
                            ? 'bg-gradient-to-l from-purple-500/10 to-transparent origin-right'
                            : 'bg-gradient-to-r from-blue-500/10 to-transparent origin-left'
                        } rounded-lg -z-10`}
                      />

                      {/* Voice bars visualization */}
                      <div className={`flex items-center gap-1 h-6 mb-2 ${
                        message.speaker === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: ['60%', '100%', '80%', '40%', '60%'],
                              opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                            className={`w-0.5 ${
                              message.speaker === 'user'
                                ? 'bg-purple-400/50'
                                : 'bg-blue-400/50'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Transcript text with typing animation */}
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={`text-base leading-relaxed ${
                          message.speaker === 'user' ? 'text-purple-100' : 'text-blue-100'
                        }`}
                      >
                        {message.text}
                      </motion.p>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
