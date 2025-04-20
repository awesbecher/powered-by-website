
import { supabase } from "@/integrations/supabase/client";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
  systemPrompt?: string;
}

export const openaiService = {
  /**
   * Generate a response from OpenAI's GPT models based on conversation history
   * 
   * @param messages Array of message objects with role and content
   * @param options Additional options like model, temperature, and system prompt
   * @returns The assistant's response message and token usage statistics
   */
  generateChatCompletion: async (messages: ChatMessage[], options: ChatCompletionOptions = {}) => {
    try {
      console.log("Generating chat completion with messages:", messages);
      
      const { data, error } = await supabase.functions.invoke('openai-custom-gpt', {
        body: { 
          messages,
          model: options.model || "gpt-4o",
          temperature: options.temperature || 0.7,
          systemPrompt: options.systemPrompt
        }
      });
      
      if (error) {
        console.error("Error calling openai-custom-gpt function:", error);
        throw new Error(`Failed to generate chat completion: ${error.message}`);
      }
      
      // Check for API-level errors returned with a 200 status
      if (data && data.error) {
        console.error("API returned an error:", data.error, data.details || '');
        throw new Error(data.error);
      }
      
      if (!data || !data.message) {
        console.error("Invalid response structure:", data);
        throw new Error("No response returned from OpenAI");
      }
      
      console.log("Chat completion generated successfully");
      
      return {
        message: data.message,
        usage: data.usage
      };
    } catch (error) {
      console.error("Error in generateChatCompletion:", error);
      throw error; // Let the caller handle the error with more context
    }
  }
};
