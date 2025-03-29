
import { ResponseGeneration, KnowledgeChunk } from './types';

/**
 * Service for handling response generation
 */
export const responseService = {
  /**
   * Generate response using GPT
   */
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
  }
};
