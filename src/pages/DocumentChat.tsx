
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FileUploadWithContext from "@/components/file-upload/FileUploadWithContext";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";

const DocumentChat = () => {
  const [user, setUser] = useState<{ id: string } | null>(null);

  // Fetch user on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">Document Chat</h1>
          <p className="text-gray-300 text-center mb-8">
            Upload a document and chat with an AI that understands its content.
          </p>
          
          <FileUploadWithContext user={user} />
          
          <div className="mt-12 p-6 bg-neutral-900/50 rounded-xl backdrop-blur">
            <h3 className="text-xl font-bold mb-4">How it works</h3>
            <p className="mb-4">
              This tool allows you to upload documents (text files, markdown, or JSON) and have 
              a conversation with an AI about their content. The AI will use the document as context
              to answer your questions.
            </p>
            <div className="bg-black/50 p-4 rounded-md overflow-x-auto">
              <ul className="list-disc pl-5 space-y-2">
                <li className="text-gray-300">Upload a text-based file (.txt, .md, or .json)</li>
                <li className="text-gray-300">The AI will read and understand your document</li>
                <li className="text-gray-300">Ask questions about the content</li>
                <li className="text-gray-300">Get answers based specifically on your document</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default DocumentChat;
