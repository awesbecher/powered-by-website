
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

interface GenerationStatus {
  id: string;
  name: string;
  status: string;
  created_at: string;
  last_updated: string;
  progress?: number;
}

interface UseGenerationStatusProps {
  initialGenerationId: string;
}

export const useGenerationStatus = ({ initialGenerationId }: UseGenerationStatusProps) => {
  const [generationId, setGenerationId] = useState(initialGenerationId);
  const [status, setStatus] = useState<GenerationStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const { toast } = useToast();

  const fetchStatus = async () => {
    if (!generationId) {
      toast({
        title: "Generation ID Missing",
        description: "Please enter a generation ID to check status.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/tavus-generation-status?id=${generationId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch generation status');
      }

      setStatus(data);
    } catch (error) {
      console.error('Error fetching generation status:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch generation status",
        variant: "destructive",
      });
      setStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePolling = () => {
    setIsPolling(!isPolling);
  };

  useEffect(() => {
    // Update local state when prop changes
    setGenerationId(initialGenerationId);
  }, [initialGenerationId]);

  useEffect(() => {
    let pollingInterval: number | undefined;
    
    if (isPolling && generationId) {
      // Initial fetch
      fetchStatus();
      
      // Set up polling every 10 seconds
      pollingInterval = window.setInterval(() => {
        fetchStatus();
      }, 10000);
    }
    
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [isPolling, generationId]);

  return {
    generationId,
    setGenerationId,
    status,
    isLoading,
    isPolling,
    fetchStatus,
    togglePolling
  };
};
