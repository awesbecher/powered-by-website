
import { supabase } from '@/integrations/supabase/client';
import { TranscriptionResult } from './types';
import { blobToBase64 } from './utils';

/**
 * Service for handling speech transcription
 */
export const transcriptionService = {
  /**
   * Convert speech to text using Whisper API via Supabase Edge Function
   */
  transcribeSpeech: async (audioBlob: Blob, language?: string): Promise<TranscriptionResult> => {
    try {
      console.log("Transcribing speech using Whisper API", language ? `with language: ${language}` : "with auto language detection");
      
      // Convert the Blob to base64 string
      const base64Audio = await blobToBase64(audioBlob);
      
      // Call the Supabase Edge Function for transcription
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { 
          audio: base64Audio,
          language: language // Pass the language parameter if provided
        }
      });
      
      if (error) {
        console.error("Error calling transcribe-audio function:", error);
        throw new Error("Failed to transcribe speech: " + error.message);
      }
      
      if (!data || !data.text) {
        throw new Error("No transcription result returned");
      }
      
      console.log("Transcription successful:", data);
      
      return {
        text: data.text,
        language: data.language
      };
    } catch (error) {
      console.error("Error in transcribeSpeech:", error);
      throw new Error("Failed to transcribe speech");
    }
  }
};
