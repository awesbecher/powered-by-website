
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, AlertCircle } from "lucide-react";

interface TavusGenerationCreatorProps {
  onGenerationCreated: (generationId: string) => void;
}

const TavusGenerationCreator = ({ onGenerationCreated }: TavusGenerationCreatorProps) => {
  const [name, setName] = useState("");
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const { toast } = useToast();

  // Tavus requirements - validate inputs
  const isScriptTooLong = script.length > 10000;
  const isScriptTooShort = script.trim().split(' ').length < 10;
  const isNameEmpty = !name.trim();

  // Guidance messages
  const getScriptGuidance = () => {
    if (isScriptTooLong) return "Script is too long. Please reduce to 10,000 characters or less.";
    if (isScriptTooShort) return "Script should contain at least a few complete sentences.";
    return "";
  };

  const handleCreateGeneration = async () => {
    // Validate inputs first
    if (isNameEmpty) {
      toast({
        title: "Missing Name",
        description: "Please provide a name for the generation.",
        variant: "destructive",
      });
      return;
    }

    if (isScriptTooShort) {
      toast({
        title: "Script Too Short",
        description: "Please provide a longer script with at least a few complete sentences.",
        variant: "destructive",
      });
      return;
    }

    if (isScriptTooLong) {
      toast({
        title: "Script Too Long",
        description: "Please reduce your script to 10,000 characters or less.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setErrorDetails(null);
    
    try {
      const response = await fetch('/api/tavus-create-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name.trim(), 
          script: script.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error || 'Failed to create generation';
        throw new Error(errorMessage, { cause: data.details });
      }

      if (!data.id) {
        throw new Error('Invalid response from server - missing generation ID');
      }

      toast({
        title: "Generation Created!",
        description: `Generation ID: ${data.id}`,
      });

      onGenerationCreated(data.id);
    } catch (error) {
      console.error('Error creating generation:', error);
      
      // Extract error details if available
      let details = null;
      if (error instanceof Error && error.cause) {
        details = error.cause;
        setErrorDetails(details);
      }

      // Set user-friendly error message
      setError(error instanceof Error ? error.message : "Failed to create generation");
      
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

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 p-3 rounded-md mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
              <div>
                <p className="text-red-300 text-sm font-medium">{error}</p>
                {errorDetails && (
                  <details className="mt-2">
                    <summary className="text-xs text-red-400 cursor-pointer">View technical details</summary>
                    <pre className="mt-2 whitespace-pre-wrap text-xs text-red-300 bg-red-950/30 p-2 rounded">
                      {JSON.stringify(errorDetails, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Generation Name</Label>
            <Input 
              id="name" 
              placeholder="My Tavus Generation" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={`bg-white/10 border-white/20 text-white ${isNameEmpty && name.length > 0 ? 'border-red-500' : ''}`}
            />
            {isNameEmpty && name.length > 0 && (
              <p className="text-xs text-red-400">Name cannot be empty</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="script">Script</Label>
            <Textarea 
              id="script" 
              placeholder="Enter the script for your AI avatar..." 
              value={script} 
              onChange={(e) => setScript(e.target.value)} 
              className={`min-h-[150px] bg-white/10 border-white/20 text-white ${
                (isScriptTooLong || isScriptTooShort) && script.length > 0 ? 'border-amber-500' : ''
              }`}
            />
            <div className="text-xs flex justify-between">
              <span className={`${isScriptTooLong ? 'text-red-400' : 'text-gray-400'}`}>
                {script.length} / 10000 characters
              </span>
              <span className={`${script.length > 0 && (isScriptTooLong || isScriptTooShort) ? 'text-amber-400' : 'text-gray-400'}`}>
                {getScriptGuidance() || "Tavus requires a script with complete sentences"}
              </span>
            </div>
          </div>

          <div className="mt-2 mb-2 text-xs text-gray-400">
            <p className="font-medium">Tips for a successful generation:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Use natural, conversational language</li>
              <li>Aim for 3-5 sentences minimum</li>
              <li>Avoid special characters when possible</li>
              <li>Keep your total script under 10,000 characters</li>
            </ul>
          </div>

          <Button 
            onClick={handleCreateGeneration} 
            disabled={isLoading || isScriptTooLong || isNameEmpty} 
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
