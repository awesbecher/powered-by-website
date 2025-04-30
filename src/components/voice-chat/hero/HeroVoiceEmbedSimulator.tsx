import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Shield, Clock, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VoiceWaveform } from './VoiceWaveform';
import { TranscriptPanel } from './TranscriptPanel';
import { AppointmentModal } from './AppointmentModal';

// Feature items with icons
const FEATURES = [
  {
    icon: <Mic className="w-5 h-5 text-blue-500" />,
    text: "State-of-the-art AI Voices"
  },
  {
    icon: <Settings className="w-5 h-5 text-purple-500" />,
    text: "Fully Customizable"
  },
  {
    icon: <Clock className="w-5 h-5 text-green-500" />,
    text: "24/7 Scalability"
  },
  {
    icon: <Shield className="w-5 h-5 text-red-500" />,
    text: "Built-in Compliance & Security"
  }
];

// Define conversation sequences
const CONVERSATION_SEQUENCES = [
  // Sequence 1: Business Hours
  [
    { id: 1, speaker: 'user', text: "What days are you open?", delay: 1000 },
    { id: 2, speaker: 'agent', text: "We're open Monday through Friday, 9 AM to 6 PM Pacific time. Would you like to schedule an appointment?", delay: 2000 },
    { id: 3, speaker: 'user', text: "Yes, I'd like to come in next week.", delay: 2000 },
    { id: 4, speaker: 'agent', text: "Great! Let me help you schedule that appointment.", delay: 2000 }
  ],
  // Sequence 2: Real Estate
  [
    { id: 5, speaker: 'user', text: "I'm looking for a 3-bedroom house in the Mission District.", delay: 1000 },
    { id: 6, speaker: 'agent', text: "I found 5 properties matching your criteria. There's a beautiful Victorian with a modern interior at $1.2M. Would you like to see more details?", delay: 2500 },
    { id: 7, speaker: 'user', text: "Yes, and does it have parking?", delay: 2000 },
    { id: 8, speaker: 'agent', text: "Yes, it includes a 2-car garage and additional street parking. The property was recently renovated and features a chef's kitchen. Should I schedule a viewing?", delay: 3000 }
  ],
  // Sequence 3: Insurance
  [
    { id: 9, speaker: 'user', text: "Can you help me find the right life insurance policy?", delay: 1000 },
    { id: 10, speaker: 'agent', text: "Of course! For personalized recommendations, could you tell me if you're looking for term or whole life insurance?", delay: 2500 },
    { id: 11, speaker: 'user', text: "Term life insurance. I'm 35 with two kids.", delay: 2000 },
    { id: 12, speaker: 'agent', text: "Based on your family situation, I'd recommend a 20-year term policy with $1M coverage. The premium would be around $45/month. Would you like to see the full quote?", delay: 3000 }
  ]
];

const LOOP_DURATION = 20000; // 20 seconds for full loop

export const HeroVoiceEmbedSimulator = () => {
  const [isActive, setIsActive] = useState(true); // Start active by default
  const [currentSequence, setCurrentSequence] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showAppointment, setShowAppointment] = useState(false);

  const handleGetStarted = () => {
    const calBtn = document.querySelector('[data-cal-link="team-powered-by-dfbtbb/get-started-today"]');
    if (calBtn instanceof HTMLElement) {
      console.log("Cal.com button found, triggering click");
      calBtn.click();
    } else {
      console.error("Cal.com button not found in DOM, navigating to /contact as fallback");
      window.location.href = '/contact';
    }
  };

  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];

    const runSequence = () => {
      const sequence = CONVERSATION_SEQUENCES[currentSequence];
      let totalDelay = 0;

      // Show each message in sequence
      sequence.forEach((message, index) => {
        timeoutIds.push(
          setTimeout(() => {
            setVisibleMessages(prev => [...prev, message.id]);
          }, totalDelay)
        );
        totalDelay += message.delay;
      });

      // Show appointment modal only for the first sequence
      if (currentSequence === 0) {
        timeoutIds.push(
          setTimeout(() => {
            setShowAppointment(true);
          }, totalDelay + 1000)
        );

        timeoutIds.push(
          setTimeout(() => {
            setShowAppointment(false);
            moveToNextSequence();
          }, totalDelay + 4000)
        );
      } else {
        // For other sequences, just pause before moving to next
        timeoutIds.push(
          setTimeout(() => {
            moveToNextSequence();
          }, totalDelay + 3000)
        );
      }
    };

    const moveToNextSequence = () => {
      setVisibleMessages([]);
      setCurrentSequence((prev) => (prev + 1) % CONVERSATION_SEQUENCES.length);
    };

    runSequence();

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [currentSequence]);

  // Auto-start and loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(true);
      setVisibleMessages([]);
      setShowAppointment(false);
    }, LOOP_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Get Started Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <Button 
          className="bg-[#9b87f5] hover:bg-[#8a75e3] text-white px-6 py-4 text-base rounded-md flex items-center justify-center"
          onClick={handleGetStarted}
        >
          Get Started Now
        </Button>

        {/* Hidden Cal.com button */}
        <button
          className="hidden"
          data-cal-link="team-powered-by-dfbtbb/get-started-today"
          data-cal-config='{"layout":"month_view"}'
        />
      </motion.div>

      {/* Simulation Container */}
      <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden h-[320px] border border-purple-500/20">
        {/* Glass Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />
        
        {/* Browser Frame */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gray-900/80 backdrop-blur-sm flex items-center px-4 border-b border-purple-500/20">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 mx-4">
            <div className="w-full max-w-md mx-auto h-7 bg-gray-800/80 rounded-md px-3 text-sm text-gray-400 flex items-center border border-purple-500/20">
              ai.yourdomain.com
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full h-full pt-12">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-purple-600/5 animate-gradient" />
          
          {/* Waveform Animation */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <VoiceWaveform />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Particles Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="particles-container" />
          </div>

          {/* Transcript Panel */}
          <TranscriptPanel
            messages={CONVERSATION_SEQUENCES[currentSequence]}
            visibleMessages={visibleMessages}
          />

          {/* Appointment Modal */}
          <AnimatePresence>
            {showAppointment && (
              <AppointmentModal onClose={() => setShowAppointment(false)} />
            )}
          </AnimatePresence>

          {/* Mic Button */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="relative">
              {/* Pulsing Ring Effect */}
              <div className="absolute -inset-4 bg-purple-500/20 rounded-full animate-ping" />
              <Button
                size="lg"
                className={`w-12 h-12 rounded-full relative z-10 ${
                  isActive 
                    ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/50' 
                    : 'bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/50'
                } text-white border border-white/10`}
                onClick={() => setIsActive(!isActive)}
                aria-label={isActive ? 'Stop voice assistant' : 'Activate voice assistant'}
              >
                <Mic className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm mb-3">
              {feature.icon}
            </div>
            <span className="text-sm text-gray-300 font-medium">
              {feature.text}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
