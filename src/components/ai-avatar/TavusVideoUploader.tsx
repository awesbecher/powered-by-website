
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

interface TavusVideoUploaderProps {
  generationId: string;
}

const TavusVideoUploader = ({ generationId }: TavusVideoUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!generationId) {
      toast({
        title: "Generation ID Missing",
        description: "Please create a generation first in the 'Create Generation' tab.",
        variant: "destructive",
      });
      return;
    }

    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a video file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('video', file);
      formData.append('generationId', generationId);

      // Simulate upload progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + Math.random() * 10;
          return newProgress >= 95 ? 95 : newProgress;
        });
      }, 500);

      const response = await fetch('/api/tavus-upload-video', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload video');
      }

      toast({
        title: "Upload Successful",
        description: "Your video has been uploaded and is being processed.",
      });

      // Reset the file input
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Failed to upload video",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-md border border-white/10">
        <h3 className="text-lg font-medium text-white mb-2">Upload Video for Training</h3>
        <p className="text-sm text-gray-300 mb-4">
          Upload a video for your generation. Current generation ID: {generationId || 'None selected'}
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video">Select Video File</Label>
            <Input 
              id="video" 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/mp4,video/mov,video/avi"
              className="bg-white/10 border-white/20 text-white"
              disabled={isUploading}
            />
          </div>

          {file && (
            <p className="text-sm text-gray-300">
              Selected file: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
          )}

          {isUploading && (
            <div className="w-full bg-white/10 rounded-full h-2.5 mt-2">
              <div 
                className="bg-purple-500 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-xs text-gray-400 mt-1 text-right">{Math.round(uploadProgress)}%</p>
            </div>
          )}

          <Button 
            onClick={handleUpload}
            disabled={!file || isUploading || !generationId}
            className="w-full"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Video
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TavusVideoUploader;
