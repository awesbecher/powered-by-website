
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useVideoDialog } from "@/hooks/useVideoDialog";

const MainContent: React.FC = () => {
  // Function to handle opening the voice chat dialog
  const handleOpenVoiceDialog = () => {
    document.dispatchEvent(new CustomEvent('open-voice-dialog'));
  };
  
  // Use the video dialog hook
  const { open: openVideo, VideoDialog } = useVideoDialog();
  
  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Custom AI Agents <br />
                <span className="text-[#8B5CF6]">for SMBs</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Transform your business operations with AI-powered agents that handle calls, chats, and emails 24/7, delivering personalized customer experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={openVideo}
                  className="bg-white hover:bg-gray-100 text-[#8B5CF6] font-medium"
                >
                  What's an AI Agent?
                  <Play className="ml-2 h-4 w-4" />
                </Button>
                <Button asChild className="bg-[#8B5CF6] hover:bg-[#7c4deb] text-white">
                  <Link to="/demo">
                    Try Demos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button 
                  onClick={handleOpenVoiceDialog}
                  className="border-2 border-[#8B5CF6] bg-transparent hover:bg-[#8B5CF6]/10 text-white"
                >
                  Talk to an AI Agent Now
                  <Phone className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6342ff] p-1 rounded-2xl">
                <div className="bg-[#1a0b2e] rounded-2xl p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center text-white mr-3">
                      AI
                    </div>
                    <div className="bg-[#2f1c4a] p-4 rounded-xl max-w-md">
                      <p className="text-white">Hello! I'm your AI assistant. How can I help your business today?</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-[#8B5CF6]/20 p-4 rounded-xl max-w-md">
                      <p className="text-white">I need help automating our customer support.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white ml-3">
                      You
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-center">
                    <div className="animate-pulse flex gap-1">
                      <div className="bg-[#8B5CF6] h-2 w-2 rounded-full"></div>
                      <div className="bg-[#8B5CF6] h-2 w-2 rounded-full animation-delay-200"></div>
                      <div className="bg-[#8B5CF6] h-2 w-2 rounded-full animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#8B5CF6]/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#6342ff]/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a0b2e]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-[#1a0b2e] rounded-xl p-6 border border-[#8B5CF6]/20 transform transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center text-[#8B5CF6] text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-bold text-white mb-3">Trigger</h3>
              <p className="text-gray-300">Customer initiates contact via phone call, website chat, or email to your business.</p>
            </div>
            
            {/* Arrow connector for desktop */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="text-[#8B5CF6] h-12 w-12" />
            </div>
            
            {/* Step 2 */}
            <div className="bg-[#1a0b2e] rounded-xl p-6 border border-[#8B5CF6]/20 transform transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center text-[#8B5CF6] text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-bold text-white mb-3">AI Agent Responds</h3>
              <p className="text-gray-300">Custom-trained AI agent engages with natural language, understanding intent and context.</p>
            </div>
            
            {/* Arrow connector for desktop */}
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="text-[#8B5CF6] h-12 w-12" />
            </div>
            
            {/* Step 3 */}
            <div className="bg-[#1a0b2e] rounded-xl p-6 border border-[#8B5CF6]/20 transform transition-transform hover:scale-105">
              <div className="w-14 h-14 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center text-[#8B5CF6] text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-bold text-white mb-3">Outcome</h3>
              <p className="text-gray-300">Customer inquiries resolved instantly, data captured, and actions taken without human intervention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Case Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Use Cases</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Explore how AI agents transform operations across industries
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Auto Dealer */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-5 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 transition-all">
              <div className="h-40 bg-[#1a0b2e] rounded-lg mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Auto Dealer</h3>
              <p className="text-gray-300 mb-4">24/7 sales inquiries, appointment scheduling, and follow-ups without adding staff.</p>
              <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                Learn More
              </Button>
            </div>
            
            {/* SaaS */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-5 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 transition-all">
              <div className="h-40 bg-[#1a0b2e] rounded-lg mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">SaaS</h3>
              <p className="text-gray-300 mb-4">Technical support, onboarding assistance, and renewal management automated.</p>
              <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                Learn More
              </Button>
            </div>
            
            {/* Insurance */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-5 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 transition-all">
              <div className="h-40 bg-[#1a0b2e] rounded-lg mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Insurance</h3>
              <p className="text-gray-300 mb-4">Claims processing, policy lookups, and lead qualification handled instantly.</p>
              <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                Learn More
              </Button>
            </div>
            
            {/* Real Estate */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-5 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 transition-all">
              <div className="h-40 bg-[#1a0b2e] rounded-lg mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Real Estate</h3>
              <p className="text-gray-300 mb-4">Property inquiries, showing scheduling, and tenant communications automated.</p>
              <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                Learn More
              </Button>
            </div>
            
            {/* Hospitality */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-5 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 transition-all">
              <div className="h-40 bg-[#1a0b2e] rounded-lg mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hospitality</h3>
              <p className="text-gray-300 mb-4">Reservation management, guest services, and concierge assistance available 24/7.</p>
              <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                Learn More
              </Button>
            </div>
            
            {/* Custom */}
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] p-5 border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/60 transition-all">
              <div className="h-40 bg-[#1a0b2e] rounded-lg mb-4 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Custom</h3>
              <p className="text-gray-300 mb-4">Tailored AI agents built for your unique business needs and workflows.</p>
              <Button variant="outline" className="w-full border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1a0b2e]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Results That Matter</h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Businesses using our AI agents see dramatic improvements
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] rounded-xl p-8 text-center transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">6x</div>
              <h3 className="text-2xl font-bold text-white mb-4">Faster Response</h3>
              <p className="text-gray-300">Customers get immediate answers without waiting on hold or for email replies.</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] rounded-xl p-8 text-center transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">80%</div>
              <h3 className="text-2xl font-bold text-white mb-4">Ticket Automation</h3>
              <p className="text-gray-300">Most common customer inquiries resolved without human intervention.</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] rounded-xl p-8 text-center transform transition-transform hover:scale-105">
              <div className="text-5xl font-bold text-[#8B5CF6] mb-2">24/7</div>
              <h3 className="text-2xl font-bold text-white mb-4">Availability</h3>
              <p className="text-gray-300">Never miss an opportunity with round-the-clock customer service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Audio Agent Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a] rounded-2xl p-8 border border-[#8B5CF6]/20">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Hear a Real Voice Agent</h2>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-[#8B5CF6]/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 01-.707-7.779m-2.121-2.12a9 9 0 010 12.728" />
                </svg>
              </div>
            </div>
            
            <div className="bg-[#1a0b2e] rounded-xl p-4">
              <audio className="w-full" controls>
                <source src="https://example.com/sample-voice-agent.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <p className="text-gray-300 text-center mt-4">
                This is a real conversation between a customer and our AI voice agent.
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button onClick={handleOpenVoiceDialog} className="bg-[#8B5CF6] hover:bg-[#7c4deb] text-white">
                Try Voice Agent Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a0b2e] to-[#2f1c4a]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your AI Agent?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Transform your business operations with AI agents that work around the clock, delivering exceptional customer experiences.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={openVideo}
              className="bg-white hover:bg-gray-100 text-[#8B5CF6] font-medium px-6 py-4 text-lg"
            >
              What's an AI Agent?
              <Play className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              asChild
              className="bg-[#8B5CF6] hover:bg-[#7c4deb] text-white px-6 py-4 text-lg"
            >
              <Link to="/demo">
                Try Demos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              onClick={handleOpenVoiceDialog}
              className="border-2 border-white bg-transparent hover:bg-white/10 text-white px-6 py-4 text-lg"
            >
              Talk to an AI Agent Now
              <Phone className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Render the video dialog */}
      <VideoDialog />
    </main>
  );
};

export default MainContent;
