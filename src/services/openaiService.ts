
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
      console.log("OpenAI Service: Starting chat completion request");
      console.log("OpenAI Service: Using model:", options.model || "gpt-4o");
      console.log("OpenAI Service: Message count:", messages.length);
      
      const { data, error } = await supabase.functions.invoke('openai-custom-gpt', {
        body: { 
          messages,
          model: options.model || "gpt-4o",
          temperature: options.temperature || 0.7,
          systemPrompt: options.systemPrompt
        }
      });
      
      if (error) {
        console.error("OpenAI Service: Error calling openai-custom-gpt function:", error);
        throw new Error(`Failed to generate chat completion: ${error.message}`);
      }
      
      // Check for API-level errors returned with a 200 status
      if (data && data.error) {
        console.error("OpenAI Service: API returned an error:", data.error, data.details || '');
        throw new Error(data.error);
      }
      
      if (!data || !data.message) {
        console.error("OpenAI Service: Invalid response structure:", data);
        throw new Error("No response returned from OpenAI");
      }
      
      console.log("OpenAI Service: Chat completion successful");
      console.log("OpenAI Service: Token usage:", data.usage);
      
      return {
        message: data.message,
        usage: data.usage
      };
    } catch (error) {
      console.error("OpenAI Service: Error in generateChatCompletion:", error);
      throw error; // Let the caller handle the error with more context
    }
  }
};
