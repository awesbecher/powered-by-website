
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const FileUploadForm = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileList | null>(null);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files || files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      
      // Add email and message
      formData.append("recipientEmail", email);
      formData.append("message", message);
      
      // Add all files
      for (let i = 0; i < files.length; i++) {
        formData.append(`file-${i}`, files[i]);
      }
      
      // Call the Edge Function
      const { data, error } = await supabase.functions.invoke('upload-and-send', {
        body: formData,
        headers: {
          // Don't set Content-Type header - the browser will set the appropriate multipart/form-data with boundary
        },
      });
      
      if (error) {
        throw new Error(`Function error: ${error.message}`);
      }
      
      console.log('Upload response:', data);
      
      if (!data.success) {
        throw new Error(data.error || "Unknown error occurred");
      }
      
      toast({
        title: "Files uploaded successfully",
        description: "Your files have been uploaded and an email has been sent.",
      });
      
      // Reset form
      setFiles(null);
      setEmail("");
      setMessage("");
      
      // Reset file input by clearing the value
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
      
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast({
        title: "Error uploading files",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mt-8 bg-neutral-900/50 p-8 rounded-xl backdrop-blur">
      <h2 className="text-2xl font-bold mb-6">Upload Files & Send Email</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Recipient Email (optional)
          </label>
          <Input
            id="email"
            type="email"
            placeholder="recipient@example.com (leave empty to use admin email)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-800 border-neutral-700 text-white"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <Textarea
            id="message"
            placeholder="Add a message to include with the files..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-neutral-800 border-neutral-700 text-white min-h-[100px]"
          />
        </div>
        
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium mb-2">
            Select Files
          </label>
          <Input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="bg-neutral-800 border-neutral-700 text-white"
          />
          {files && (
            <p className="mt-2 text-sm text-gray-400">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </p>
          )}
        </div>
        
        <Button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-white py-6"
          disabled={isUploading || !files}
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" /> Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Upload size={18} /> Upload Files & <Send size={18} /> Send Email
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};
