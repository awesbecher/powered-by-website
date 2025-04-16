
import React from 'react';
import Navbar from "@/components/layout/Navbar";
import AnnouncementBanner from "@/components/layout/AnnouncementBanner";
import Footer from "@/components/layout/Footer";
import { AIVoiceChat } from '@/pages/AIVoiceChat';

/**
 * VoiceChat page component
 * This component serves as a wrapper around the AIVoiceChat component
 * to maintain compatibility with the routing system
 */
const VoiceChat = () => {
  // We're using the existing AIVoiceChat component to avoid duplication
  return <AIVoiceChat />;
};

export default VoiceChat;
