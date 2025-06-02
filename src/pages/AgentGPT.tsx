
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Filter, PenLine, Wand2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

const AgentGPT = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight">
            Build Your AI Voice Agent in Minutes
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Choose a template, customize behavior, and launch in any channel.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              onClick={() => navigate("/agent-marketplace")}
              className="bg-white hover:bg-gray-100 text-[#1a0b2e] px-8 py-6 text-lg font-medium rounded-xl"
              size="lg"
            >
              Browse Templates
            </Button>
            <Button 
              onClick={() => navigate("/agent-gpt-builder")}
              className="bg-[#8B5CF6] hover:bg-[#7C3AED] px-8 py-6 text-lg font-medium rounded-xl"
              size="lg"
            >
              Start From Scratch <ArrowRight className="ml-2" />
            </Button>
          </div>
        </motion.div>
        
        {/* Floating Cards Animation */}
        <motion.div 
          className="relative w-full h-80 md:h-96 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 md:w-80 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
            animate={{ 
              y: [0, -10, 0], 
              rotateZ: [-1, 1, -1],
              transition: { 
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 7, repeat: Infinity, ease: "easeInOut" }
              }
            }}
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                <PenLine className="w-4 h-4 text-white" />
              </div>
              <h3 className="ml-3 font-semibold">Voice Agent Builder</h3>
            </div>
            <p className="text-sm text-gray-300">Create custom voice agents using our intuitive prompt editor and behavior controls</p>
          </motion.div>
          
          <motion.div 
            className="absolute top-24 left-1/4 transform -translate-x-1/2 w-64 md:w-72 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
            animate={{ 
              y: [0, 8, 0], 
              rotateZ: [1, -1, 1],
              transition: { 
                y: { duration: 6, delay: 0.5, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 8, delay: 0.5, repeat: Infinity, ease: "easeInOut" }
              }
            }}
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                <Filter className="w-4 h-4 text-white" />
              </div>
              <h3 className="ml-3 font-semibold">Industry Templates</h3>
            </div>
            <p className="text-sm text-gray-300">Choose from dozens of pre-built agents optimized for your specific industry</p>
          </motion.div>
          
          <motion.div 
            className="absolute top-12 right-1/4 transform translate-x-1/2 w-64 md:w-72 bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
            animate={{ 
              y: [0, 12, 0], 
              rotateZ: [-1, 2, -1],
              transition: { 
                y: { duration: 7, delay: 0.8, repeat: Infinity, ease: "easeInOut" },
                rotateZ: { duration: 9, delay: 0.8, repeat: Infinity, ease: "easeInOut" }
              }
            }}
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                <Wand2 className="w-4 h-4 text-white" />
              </div>
              <h3 className="ml-3 font-semibold">AI Generation</h3>
            </div>
            <p className="text-sm text-gray-300">Create agents automatically with AI-powered prompts and behavior generation</p>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Features Section */}
      <motion.section 
        className="py-20 px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-white/10"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6">
                <Filter className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Browse by Industry</h3>
              <p className="text-gray-300 mb-6">
                Find the perfect starting point with industry-specific templates tailored to your use case.
              </p>
              <Button
                onClick={() => navigate("/agent-marketplace")}
                variant="outline"
                className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
              >
                Explore Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-white/10"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6">
                <PenLine className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Visual Prompt Builder</h3>
              <p className="text-gray-300 mb-6">
                Customize every aspect of your AI's behavior with our intuitive visual editor interface.
              </p>
              <Button
                onClick={() => navigate("/agent-gpt-builder")}
                variant="outline"
                className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10"
              >
                Open Builder <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 shadow-lg transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-white/10"
              variants={itemVariants}
            >
              <div className="h-12 w-12 bg-[#8B5CF6]/20 rounded-xl flex items-center justify-center mb-6">
                <Wand2 className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Auto-Generate Agents</h3>
              <p className="text-gray-300 mb-6">
                Coming soon! Let AI generate the perfect agent based on a simple description of your needs.
              </p>
              <Button
                disabled
                variant="outline"
                className="border-white/20 text-gray-400 cursor-not-allowed"
              >
                Coming Soon
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto bg-[#8B5CF6]/10 backdrop-blur-sm border border-[#8B5CF6]/30 rounded-2xl p-12 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to build your AI voice agent?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get started in minutes with our intuitive builder or choose from pre-built templates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => navigate("/agent-marketplace")}
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Browse Templates
            </Button>
            <Button 
              onClick={() => navigate("/agent-gpt-builder")}
              size="lg"
              className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
            >
              Build Your Agent <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default AgentGPT;
