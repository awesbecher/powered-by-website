
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { FileUploadForm } from "@/components/file-upload/FileUploadForm";

const FileUploadPage = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>
      
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-6">File Upload Service</h1>
          <p className="text-gray-300 text-center mb-8">
            Upload files and send them via email. This service can be integrated with your custom GPT.
          </p>
          
          <FileUploadForm />
          
          <div className="mt-12 p-6 bg-neutral-900/50 rounded-xl backdrop-blur">
            <h3 className="text-xl font-bold mb-4">API Integration Guide</h3>
            <p className="mb-4">
              To integrate this with your Custom GPT, use the following endpoint:
            </p>
            <div className="bg-black/50 p-4 rounded-md overflow-x-auto">
              <code className="text-green-400">
                https://cinohyzbtfzfcdtkgvij.supabase.co/functions/v1/upload-and-send
              </code>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              The endpoint accepts multipart/form-data with files, recipientEmail, and message fields.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default FileUploadPage;
