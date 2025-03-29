
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
      
      // Mock implementation - in real code this would request microphone access
      // const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Mock the MediaRecorder for now
      // In a real implementation we would use:
      // mediaRecorderRef.current = new MediaRecorder(stream);
      
      // Instead of actual recording, we'll simulate the state changes
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
    
    // In a real implementation, this would stop the MediaRecorder
    // and process the audio chunks
    
    setIsRecording(false);
    
    // Create a dummy audio blob for simulation
    const dummyBlob = new Blob([], { type: 'audio/webm' });
    setAudioURL(URL.createObjectURL(dummyBlob));
    
    return dummyBlob;
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
