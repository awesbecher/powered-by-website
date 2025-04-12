
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface TavusPublishVideoProps {
  generationId: string;
}

const TavusPublishVideo = ({ generationId: initialGenerationId }: TavusPublishVideoProps) => {
  const [generationId, setGenerationId] = useState(initialGenerationId);
  const [script, setScript] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedVideoUrl, setPublishedVideoUrl] = useState("");
  const { toast } = useToast();

  const handlePublish = async () => {
    if (!generationId) {
      toast({
        title: "Generation ID Missing",
        description: "Please enter a generation ID to publish.",
        variant: "destructive",
      });
      return;
    }

    if (!script) {
      toast({
        title: "Missing Script",
        description: "Please provide a script for the AI avatar to speak.",
        variant: "destructive",
      });
      return;
    }

    setIsPublishing(true);
    try {
      const response = await fetch('/api/tavus-publish-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          generationId,
          script,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish video');
      }

      toast({
        title: "Video Published Successfully",
        description: "Your AI avatar video has been published.",
      });

      setPublishedVideoUrl(data.url || "");
    } catch (error) {
      console.error('Error publishing video:', error);
      toast({
        title: "Publishing Failed",
        description: error instanceof Error ? error.message : "Failed to publish the video",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  React.useEffect(() => {
    setGenerationId(initialGenerationId);
  }, [initialGenerationId]);

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-md border border-white/10">
        <h3 className="text-lg font-medium text-white mb-2">Publish AI Avatar Video</h3>
        <p className="text-sm text-gray-300 mb-4">
          Create and publish an AI avatar video by providing a script for your trained generation to speak.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="generation-id">Generation ID</Label>
            <Input 
              id="generation-id" 
              placeholder="Enter Generation ID" 
              value={generationId} 
              onChange={(e) => setGenerationId(e.target.value)} 
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar-script">Script for AI Avatar</Label>
            <Textarea 
              id="avatar-script" 
              placeholder="Enter what you want your AI avatar to say..." 
              value={script} 
              onChange={(e) => setScript(e.target.value)} 
              className="min-h-[150px] bg-white/10 border-white/20 text-white"
            />
          </div>

          <Button 
            onClick={handlePublish}
            disabled={isPublishing || !generationId || !script}
            className="w-full"
          >
            {isPublishing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish AI Video"
            )}
          </Button>

          {publishedVideoUrl && (
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Published Video</h4>
              <div className="relative bg-black aspect-video rounded-md overflow-hidden">
                <iframe 
                  src={publishedVideoUrl} 
                  className="w-full h-full absolute inset-0"
                  allowFullScreen
                  title="Tavus AI Avatar Video"
                ></iframe>
              </div>
              <p className="text-sm text-gray-300 mt-2">
                <a 
                  href={publishedVideoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-purple-400 hover:text-purple-300 underline"
                >
                  Open video in new tab
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TavusPublishVideo;
