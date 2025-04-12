
import React, { useState } from 'react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TavusGenerationCreator from "@/components/ai-avatar/TavusGenerationCreator";
import TavusGenerationStatus from "@/components/ai-avatar/TavusGenerationStatus";
import TavusVideoUploader from "@/components/ai-avatar/TavusVideoUploader";
import TavusPublishVideo from "@/components/ai-avatar/TavusPublishVideo";
import { Toaster } from "@/components/ui/toaster";

const AIAvatar = () => {
  const [activeGenerationId, setActiveGenerationId] = useState<string>("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Tavus AI Avatar Testing Tool</h1>
            <p className="text-gray-300">Create, upload videos, and publish AI avatars with Tavus API</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="create">Create Generation</TabsTrigger>
                <TabsTrigger value="upload">Upload Video</TabsTrigger>
                <TabsTrigger value="status">Generation Status</TabsTrigger>
                <TabsTrigger value="publish">Publish</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create" className="space-y-4">
                <TavusGenerationCreator onGenerationCreated={setActiveGenerationId} />
              </TabsContent>
              
              <TabsContent value="upload" className="space-y-4">
                <TavusVideoUploader generationId={activeGenerationId} />
              </TabsContent>
              
              <TabsContent value="status" className="space-y-4">
                <TavusGenerationStatus generationId={activeGenerationId} />
              </TabsContent>
              
              <TabsContent value="publish" className="space-y-4">
                <TavusPublishVideo generationId={activeGenerationId} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default AIAvatar;
