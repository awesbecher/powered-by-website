
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { validateTavusScript } from "../utils/tavusValidation";

interface UseTavusGenerationProps {
  onGenerationCreated: (generationId: string) => void;
}

export const useTavusGeneration = ({ onGenerationCreated }: UseTavusGenerationProps) => {
  const [name, setName] = useState("");
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const { toast } = useToast();

  // Validate inputs
  const { isScriptTooLong, isScriptTooShort } = validateTavusScript(script);
  const isNameEmpty = !name.trim();

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

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.error || 'Failed to create generation';
        throw new Error(errorMessage);
      }

      if (!responseData.id) {
        throw new Error('Invalid response from server - missing generation ID');
      }

      toast({
        title: "Generation Created!",
        description: `Generation ID: ${responseData.id}`,
      });

      onGenerationCreated(responseData.id);
    } catch (error) {
      console.error('Error creating generation:', error);
      
      // Extract error details if available
      let details = null;
      if (error instanceof Error) {
        // Use a type assertion for any to access potential details
        const errorObj = error as any;
        if (errorObj.details) {
          details = errorObj.details;
        }
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

  return {
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
  };
};
