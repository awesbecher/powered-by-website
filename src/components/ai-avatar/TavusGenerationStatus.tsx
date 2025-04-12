
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw } from "lucide-react";
import { useGenerationStatus } from './hooks/useGenerationStatus';
import StatusDisplay from './components/StatusDisplay';

interface TavusGenerationStatusProps {
  generationId: string;
}

const TavusGenerationStatus = ({ generationId: initialGenerationId }: TavusGenerationStatusProps) => {
  const {
    generationId,
    setGenerationId,
    status,
    isLoading,
    isPolling,
    fetchStatus,
    togglePolling
  } = useGenerationStatus({ initialGenerationId });

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

          <StatusDisplay status={status} />
        </div>
      </div>
    </div>
  );
};

export default TavusGenerationStatus;
