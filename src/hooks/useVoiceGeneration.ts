
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
        const { data, error } = await supabase.functions.invoke('orpheus-tts', {
          body: { text }
        });

        if (error) throw error;

        if (data.audio) {
          setAudioBlob(data.audio);
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
