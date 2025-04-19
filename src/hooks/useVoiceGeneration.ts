
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useVoiceGeneration = (text: string | null) => {
  const [audioBlob, setAudioBlob] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateVoice = async () => {
      if (!text) {
        setAudioBlob(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get the voice choice from pageState if it exists
        const voiceChoice = window.pageState?.voiceChoice;
        
        // First try the Orpheus TTS service
        try {
          const { data: orpheusData, error: orpheusError } = await supabase.functions.invoke('orpheus-tts', {
            body: { 
              text,
              voice: voiceChoice 
            }
          });

          if (!orpheusError && orpheusData.audio) {
            setAudioBlob(orpheusData.audio);
            return;
          }
        } catch (orpheusError) {
          console.warn('Orpheus TTS failed, falling back to GCP:', orpheusError);
        }

        // Fallback to GCP TTS if Orpheus fails
        const { data: gcpData, error: gcpError } = await supabase.functions.invoke('orpheus-gcp-tts', {
          body: { 
            text,
            voice: voiceChoice 
          }
        });

        if (gcpError) throw gcpError;

        if (gcpData.audio) {
          setAudioBlob(gcpData.audio);
        }
      } catch (err) {
        console.error('Error generating voice:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate voice');
      } finally {
        setLoading(false);
      }
    };

    generateVoice();
  }, [text]);

  return { audioBlob, loading, error };
};
