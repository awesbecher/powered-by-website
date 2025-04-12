
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";

interface TavusGenerationStatusProps {
  generationId: string;
}

interface GenerationStatus {
  id: string;
  name: string;
  status: string;
  created_at: string;
  last_updated: string;
  progress?: number;
}

const TavusGenerationStatus = ({ generationId: initialGenerationId }: TavusGenerationStatusProps) => {
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

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-400";
    
    switch (status.toLowerCase()) {
      case 'completed':
        return "bg-green-500";
      case 'failed':
        return "bg-red-500";
      case 'processing':
        return "bg-yellow-500";
      case 'queued':
        return "bg-blue-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 rounded-md border border-white/10">
        <h3 className="text-lg font-medium text-white mb-2">Check Generation Status</h3>
        <p className="text-sm text-gray-300 mb-4">
          Check the status of your generation.
        </p>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input 
              placeholder="Enter Generation ID" 
              value={generationId} 
              onChange={(e) => setGenerationId(e.target.value)} 
              className="bg-white/10 border-white/20 text-white flex-grow"
            />
            <Button 
              onClick={fetchStatus}
              disabled={isLoading || !generationId}
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Check"
              )}
            </Button>
          </div>

          <Button 
            onClick={togglePolling} 
            variant={isPolling ? "default" : "outline"}
            className="w-full"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isPolling ? 'animate-spin' : ''}`} />
            {isPolling ? "Stop Auto-Refresh" : "Auto-Refresh Every 10s"}
          </Button>

          {status && (
            <div className="bg-white/10 p-4 rounded-md mt-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(status.status)}`}></div>
                <span className="text-white font-medium">{status.status || "Unknown"}</span>
                {status.progress !== undefined && (
                  <span className="text-gray-300 text-sm">({status.progress}%)</span>
                )}
              </div>
              
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="font-medium">ID:</span> {status.id}</p>
                <p><span className="font-medium">Name:</span> {status.name}</p>
                <p><span className="font-medium">Created:</span> {new Date(status.created_at).toLocaleString()}</p>
                <p><span className="font-medium">Last Updated:</span> {new Date(status.last_updated).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TavusGenerationStatus;
