
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Types for our voice agent service
interface TranscriptionResult {
  text: string;
  language?: string;
}

interface KnowledgeChunk {
  text: string;
  source?: string;
  relevance?: number;
}

interface ResponseGeneration {
  text: string;
}

interface SpeechGeneration {
  audioUrl: string;
}

// Language codes for Whisper API
export const supportedLanguages = {
  english: 'en',
  german: 'de',
  portuguese: 'pt',
  chinese: 'zh',
  japanese: 'ja',
  french: 'fr',
  spanish: 'es',
  hindi: 'hi',
  italian: 'it',
  korean: 'ko',
  dutch: 'nl',
  polish: 'pl',
  russian: 'ru',
  swedish: 'sv',
  turkish: 'tr'
};

// This service handles the integration with external APIs
export const voiceAgentService = {
  // Convert speech to text using Whisper API via Supabase Edge Function
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
  },
  
  // Query knowledge base using Pinecone
  queryKnowledgeBase: async (transcript: string): Promise<KnowledgeChunk[]> => {
    try {
      console.log("Querying Pinecone knowledge base with:", transcript);
      
      // Retrieve the Pinecone API key from Supabase Edge Function
      const { data: secretData, error: secretError } = await supabase.functions.invoke('get-secret', {
        body: { 
          secretName: 'PINECONE_API_KEY'
        }
      });
      
      if (secretError) {
        console.error("Error retrieving Pinecone API key:", secretError);
        throw new Error("Failed to retrieve Pinecone API key");
      }
      
      // Call the Pinecone query API directly (in production, this should be done via an edge function)
      const pineconeIndexName = "voice-agent-knowledge"; // Replace with your index name
      const pineconeApiKey = secretData.secret;
      
      // Here we would make the actual call to Pinecone, but for now we'll simulate it
      // This would normally be done via a dedicated Edge Function for security
      console.log("Would query Pinecone with API key and index:", pineconeIndexName);
      
      // Simulate a delay and return sample results
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return [
        { 
          text: "Our voice agent uses real-time speech recognition powered by OpenAI's Whisper model. It provides accurate transcription in multiple languages.",
          source: "voice-agent-documentation.pdf",
          relevance: 0.92
        },
        {
          text: "The knowledge retrieval system leverages Pinecone vector database to find relevant information based on semantic similarity to the user's query.",
          source: "technical-architecture.pdf",
          relevance: 0.87
        },
        {
          text: "Our system generates responses using a sophisticated AI language model that considers both the user's query and the retrieved knowledge chunks.",
          source: "ai-capabilities.pdf",
          relevance: 0.85
        }
      ];
    } catch (error) {
      console.error("Error in queryKnowledgeBase:", error);
      throw new Error("Failed to query knowledge base");
    }
  },
  
  // Generate response using GPT
  generateResponse: async (
    transcript: string, 
    knowledgeChunks: KnowledgeChunk[]
  ): Promise<ResponseGeneration> => {
    try {
      console.log("Generating response with transcript and knowledge chunks:", {
        transcript,
        knowledgeChunks
      });
      
      // In production, this would call an OpenAI endpoint via an Edge Function
      // For now, we'll simulate a response based on the knowledge chunks
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a response that references the knowledge chunks
      const knowledgeContext = knowledgeChunks.map(chunk => chunk.text).join(" ");
      
      return {
        text: `Based on our knowledge base: ${knowledgeContext.substring(0, 150)}... I can tell you that our voice agent system provides accurate transcription and semantic search capabilities. It uses OpenAI's Whisper model for speech recognition and Pinecone for knowledge retrieval. How else can I help you understand our technology?`
      };
    } catch (error) {
      console.error("Error in generateResponse:", error);
      throw new Error("Failed to generate response");
    }
  },
  
  // Convert text to speech using Cartesia.ai
  generateSpeech: async (text: string): Promise<SpeechGeneration> => {
    try {
      console.log("Would generate speech using Cartesia.ai with:", text);
      
      // This will be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real implementation, this would return a URL to the audio
      return {
        audioUrl: "example-audio-url.mp3"
      };
    } catch (error) {
      console.error("Error in generateSpeech:", error);
      throw new Error("Failed to generate speech");
    }
  },
  
  // Log conversation for analytics
  logConversation: async (
    transcript: string, 
    response: string, 
    audioUrl?: string
  ): Promise<void> => {
    try {
      console.log("Would log conversation:", {
        transcript,
        response,
        audioUrl
      });
      
      // This will be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error("Error in logConversation:", error);
      // Non-critical, so we don't throw
    }
  }
};

// Helper function to convert Blob to base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
