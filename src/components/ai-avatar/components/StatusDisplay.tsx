
import React from 'react';

interface StatusDisplayProps {
  status: {
    id: string;
    name: string;
    status: string;
    created_at: string;
    last_updated: string;
    progress?: number;
  } | null;
}

export const getStatusColor = (status?: string) => {
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

const StatusDisplay = ({ status }: StatusDisplayProps) => {
  if (!status) return null;

  return (
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
  );
};

export default StatusDisplay;
