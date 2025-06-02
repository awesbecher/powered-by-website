import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AudioControlsProps {
  isPlaying: boolean;
  currentTime: number;
  onPlayPause: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isPlaying,
  currentTime,
  onPlayPause,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPlayPause}
        aria-label={isPlaying ? 'Pause waveform' : 'Play waveform'}
        className="text-purple-600 hover:text-purple-700"
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>

      <div className="flex-1 mx-4">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-purple-600 transition-all duration-1000 ease-linear"
            style={{ width: `${(currentTime / 15) * 100}%` }}
          />
        </div>
      </div>

      <span className="text-sm font-medium text-gray-600">
        {formatTime(currentTime)}
      </span>
    </div>
  );
};
