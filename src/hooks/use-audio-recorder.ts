
import { useState, useRef, useEffect } from 'react';

interface AudioRecorderResult {
  isRecording: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Blob | null>;
  recordingTime: number;
  audioURL: string | null;
  error: string | null;
}

export const useAudioRecorder = (): AudioRecorderResult => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  
  // Cleanup function
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (audioURL) {
        URL.revokeObjectURL(audioURL);
      }
    };
  }, [audioURL]);
  
  const startRecording = async (): Promise<void> => {
    try {
      setError(null);
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer for recording duration
      timerRef.current = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
      
    } catch (err) {
      setError('Error accessing microphone: ' + (err instanceof Error ? err.message : String(err)));
      console.error('Error starting recording:', err);
    }
  };
  
  const stopRecording = async (): Promise<Blob | null> => {
    // Clear the timer
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // If there's no MediaRecorder or it's not recording, return null
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== 'recording') {
      setIsRecording(false);
      return null;
    }
    
    return new Promise<Blob | null>((resolve) => {
      mediaRecorderRef.current!.onstop = () => {
        if (audioChunksRef.current.length === 0) {
          setIsRecording(false);
          resolve(null);
          return;
        }
        
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
        setIsRecording(false);
        resolve(audioBlob);
      };
      
      // Request data and stop recording
      mediaRecorderRef.current!.requestData();
      mediaRecorderRef.current!.stop();
      
      // Stop all audio tracks
      mediaRecorderRef.current!.stream.getTracks().forEach(track => track.stop());
    });
  };
  
  return {
    isRecording,
    startRecording,
    stopRecording,
    recordingTime,
    audioURL,
    error,
  };
};
