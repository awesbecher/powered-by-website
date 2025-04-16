import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { initiateVapiCall, stopVapiCall } from "@/services/vapiService";
import { DemoTabs } from "./interactive/DemoTabs";
import { DemoCard } from "./interactive/DemoCard";
import { VoiceChatDialog } from "./interactive/VoiceChatDialog";
import { demoOptions } from "./interactive/DemoData";
import { useNavigate } from "react-router-dom";

export const InteractiveDemoSection = () => {
  const [activeTab, setActiveTab] = useState("real-estate");
  const [showDialog, setShowDialog] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleStartCall = async () => {
    setIsProcessing(true);
    try {
      const activeOption = demoOptions.find(option => option.id === activeTab);
      if (!activeOption) {
        throw new Error("Selected demo option not found");
      }

      console.log(`Starting call with Vapi for ${activeOption.title}`);
      await initiateVapiCall(activeOption.assistantId);
      setIsCallActive(true);
      toast({
        title: "Call connected",
        description: `You are now speaking with our ${activeOption.title} AI agent.`,
      });
    } catch (error) {
      console.error("Error starting call:", error);
      toast({
        variant: "destructive",
        title: "Call failed",
        description: error instanceof Error ? error.message : "Please check your microphone settings and try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEndCall = async () => {
    try {
      console.log("Ending call with Vapi");
      await stopVapiCall();
      toast({
        title: "Call ended",
        description: "Thank you for trying our AI voice agent.",
      });
    } catch (error) {
      console.error("Error ending call:", error);
    } finally {
      setIsCallActive(false);
    }
  };

  const handleCloseDialog = () => {
    if (isCallActive) {
      handleEndCall();
    }
    setShowDialog(false);
  };

  const handleShowDemo = (demoId: string) => {
    const demo = demoOptions.find(option => option.id === demoId);
    
    if (demo?.routePath) {
      navigate(demo.routePath);
    } else {
      setShowDialog(true);
    }
  };

  return (
    <section id="interactive-demo" className="py-8 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-[#9b87f5] to-[#6342ff] bg-clip-text text-transparent">
              Experience Our Industry-Specific AI Demos
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how our AI agents can transform different industries through intelligent automation and personalized interactions.
              Select any industry demo below to get started.
            </p>
          </div>

          <Tabs defaultValue="real-estate" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <DemoTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {demoOptions.map(option => (
              <TabsContent key={option.id} value={option.id} className="mt-0">
                <DemoCard 
                  option={option} 
                  onShowDemo={() => handleShowDemo(option.id)} 
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </motion.div>

      {/* Voice Chat Dialog */}
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-[#1a0f2e] text-white border-gray-800 sm:max-w-md">
          <VoiceChatDialog
            isCallActive={isCallActive}
            isProcessing={isProcessing}
            onStartCall={handleStartCall}
            onEndCall={handleEndCall}
            onClose={handleCloseDialog}
            activeDemo={demoOptions.find(option => option.id === activeTab)}
          />
        </DialogContent>
      </Dialog>
    </section>
  );
};
