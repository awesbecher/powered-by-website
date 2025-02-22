
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const WhatsAnAIAgent = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden px-6 lg:px-8">
          <Link to="/ai-agency">
            <Button variant="ghost" className="text-gray-300 hover:text-white mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to AI Agency
            </Button>
          </Link>

          <div className="mx-auto max-w-4xl">
            <div className={`text-center transition-all duration-1000 ease-out transform
                ${initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                What's An AI Agent?
              </h1>
              
              <p className="mt-6 text-lg text-gray-300 leading-relaxed text-justify">
                Think of an AI agent as a super-smart, tireless assistant that handles tasks for you, without the coffee breaks. 
                Companies like OpenAI & Anthropic are at the forefront of innovating AI agents to be state of the art. 
                We bring these capabilities to SMBs who may not have the budget or resources to build agent solutions themselves.
              </p>

              <p className="mt-6 text-lg text-gray-300 leading-relaxed text-justify">
                We deliver agent software that listens, learns, and acts, whether it's speaking on the phone with customers, 
                sending emails, or organizing your workflow. No sci-fi jargon here, just practical, custom-built help for your business.
              </p>

              <p className="mt-6 text-xl text-white font-medium">
                The best part? They work 24/7, never take vacations, and can handle multiple tasks simultaneously. 
                It's like having a tireless team member who's always ready to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAnAIAgent;
