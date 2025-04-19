
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioPlayerProps {
  base64Audio?: string | null;
  src?: string | null;
  accentColor?: string;
  autoplay?: boolean;
}

export const AudioPlayer = ({ 
  base64Audio, 
  src, 
  accentColor = '#8B5CF6', 
  autoplay = true 
}: AudioPlayerProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!waveformRef.current) return;

    // Initialize WaveSurfer
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#e4e4e7',
      progressColor: accentColor,
      cursorColor: 'transparent',
      barWidth: 2,
      barGap: 3,
      height: 60,
      normalize: true,
    });

    // Load audio source
    const audioSource = base64Audio || src;
    if (audioSource) {
      const audioUrl = base64Audio 
        ? `data:audio/wav;base64,${audioSource}`
        : audioSource;
      wavesurferRef.current.load(audioUrl);
    }

    // Setup event listeners
    wavesurferRef.current.on('ready', () => {
      if (autoplay) {
        wavesurferRef.current?.play();
      }
    });

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));
    wavesurferRef.current.on('finish', () => setIsPlaying(false));

    // Cleanup
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, [base64Audio, src, accentColor, autoplay]);

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
    }
  };

  const handleSendEmail = async () => {
    try {
      const { data, error } = await window.supabase.functions.invoke('upload-and-send', {
        body: {
          audioData: base64Audio,
          recipientEmail: window.pageState?.userEmail || '',
          message: "Here's your requested audio file"
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Audio file has been sent to your email",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send audio file. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Only render if audio source exists
  if (!base64Audio && !src) return null;

  return (
    <div 
      style={{ 
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        maxWidth: '600px',
        margin: '32px auto'
      }}
    >
      <div ref={waveformRef} />
      <div className="flex justify-between items-center mt-4">
        <Button 
          onClick={handlePlayPause}
          variant="outline"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button
          onClick={handleSendEmail}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Mail className="h-4 w-4" />
          Send to email
        </Button>
      </div>
    </div>
  );
};
