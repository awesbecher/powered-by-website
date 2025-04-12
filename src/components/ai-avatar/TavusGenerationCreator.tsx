
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useTavusGeneration } from "./hooks/useTavusGeneration";
import GenerationErrorDisplay from "./components/GenerationErrorDisplay";
import GenerationTips from "./components/GenerationTips";
import { getScriptGuidance } from "./utils/tavusValidation";

interface TavusGenerationCreatorProps {
  onGenerationCreated: (generationId: string) => void;
}

const TavusGenerationCreator = ({ onGenerationCreated }: TavusGenerationCreatorProps) => {
  const {
    name,
    setName,
    script,
    setScript,
    isLoading,
    error,
    errorDetails,
    isScriptTooLong,
    isScriptTooShort,
    isNameEmpty,
    handleCreateGeneration
  } = useTavusGeneration({ onGenerationCreated });

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-md border border-white/10 mb-4">
        <h3 className="text-lg font-medium text-white mb-2">Create a New Generation</h3>
        <p className="text-sm text-gray-300 mb-4">
          Start by creating a new generation with a name and script. This will give you a generation ID to use in the next steps.
        </p>

        <GenerationErrorDisplay error={error} errorDetails={errorDetails} />

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
                {getScriptGuidance(script) || "Tavus requires a script with complete sentences"}
              </span>
            </div>
          </div>

          <GenerationTips />

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
