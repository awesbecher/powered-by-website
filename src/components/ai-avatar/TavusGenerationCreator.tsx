
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface TavusGenerationCreatorProps {
  onGenerationCreated: (generationId: string) => void;
}

const TavusGenerationCreator = ({ onGenerationCreated }: TavusGenerationCreatorProps) => {
  const [name, setName] = useState("");
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleCreateGeneration = async () => {
    if (!name || !script) {
      toast({
        title: "Missing Information",
        description: "Please provide both a name and script for the generation.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/tavus-create-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, script }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create generation');
      }

      toast({
        title: "Generation Created!",
        description: `Generation ID: ${data.id}`,
      });

      onGenerationCreated(data.id);
    } catch (error) {
      console.error('Error creating generation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create generation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-md border border-white/10 mb-4">
        <h3 className="text-lg font-medium text-white mb-2">Create a New Generation</h3>
        <p className="text-sm text-gray-300 mb-4">
          Start by creating a new generation with a name and script. This will give you a generation ID to use in the next steps.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Generation Name</Label>
            <Input 
              id="name" 
              placeholder="My Tavus Generation" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="script">Script</Label>
            <Textarea 
              id="script" 
              placeholder="Enter the script for your AI avatar..." 
              value={script} 
              onChange={(e) => setScript(e.target.value)} 
              className="min-h-[150px] bg-white/10 border-white/20 text-white"
            />
          </div>

          <Button 
            onClick={handleCreateGeneration} 
            disabled={isLoading} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Generation"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TavusGenerationCreator;
