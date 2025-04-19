
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    supabase: any;
    pageState?: {
      audioBlob?: string | null;
      gptText?: string | null;
      voiceChoice?: string | null;
      userEmail?: string | null;
    };
  }
}

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
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (!waveformRef.current) return;

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

    const audioSource = base64Audio || src;
    if (audioSource) {
      const audioUrl = base64Audio 
        ? `data:audio/wav;base64,${audioSource}`
        : audioSource;
      wavesurferRef.current.load(audioUrl);
    }

    wavesurferRef.current.on('ready', () => {
      if (autoplay) {
        wavesurferRef.current?.play();
      }
    });

    wavesurferRef.current.on('play', () => setIsPlaying(true));
    wavesurferRef.current.on('pause', () => setIsPlaying(false));
    wavesurferRef.current.on('finish', () => setIsPlaying(false));

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
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await window.supabase.functions.invoke('send-audio-email', {
        body: {
          recipientEmail: email,
          audioData: base64Audio
        }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Audio file has been sent to your email ✅",
      });
      
      // Clear email input after successful send
      setEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send audio file ❌",
        variant: "destructive",
      });
    }
  };

  if (!base64Audio && !src) return null;

  return (
    <div 
      style={{ 
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
        maxWidth: '600px',
        margin: '32px auto'
      }}
    >
      <div ref={waveformRef} />
      <div className="mt-6 space-y-4">
        <Button 
          onClick={handlePlayPause}
          variant="outline"
          className="w-full"
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleSendEmail}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
