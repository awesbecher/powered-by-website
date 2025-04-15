
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { openaiService } from "@/services/openaiService";

export function useOpenAPIGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateOpenAPISpec = async (
    input: string, 
    inputType: "curl" | "text" | "url"
  ): Promise<string> => {
    setIsGenerating(true);
    
    try {
      // Use OpenAI to generate the OpenAPI spec based on the input
      const systemPrompt = `You are an API expert that creates OpenAPI 3.1.0 specifications from user inputs. 
      
Your task is to generate a valid OpenAPI 3.1.0 YAML spec based on the user's input, which may be a cURL command, a text description, or a URL endpoint.

Output guidelines:
1. Always create valid OpenAPI 3.1.0 YAML
2. Use descriptive, camelCase operationId naming
3. Infer appropriate requestBody schemas and response formats
4. Add bearer token security if an Authorization header is present
5. DO NOT add any explanatory text outside of the YAML spec
6. Keep the YAML format clean and properly indented
7. ONLY return the YAML spec, no markdown, no explanations, no code blocks
8. Be comprehensive but concise
9. Include reasonable parameter descriptions and examples
10. Ensure the spec is complete and valid`;

      const userMessage = `Create an OpenAPI 3.1.0 specification for the following ${inputType === "curl" ? "cURL command" : inputType === "text" ? "API description" : "API URL"}:

${input}`;

      const response = await openaiService.generateChatCompletion(
        [{ role: "user", content: userMessage }],
        {
          systemPrompt,
          temperature: 0.1,
          model: "gpt-4o-mini" // Using a capable model for code generation
        }
      );

      const generatedSpec = response.message.content;
      
      if (!generatedSpec) {
        throw new Error("Failed to generate OpenAPI specification");
      }

      return generatedSpec;
    } catch (error) {
      console.error("Error in OpenAPI generation:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate OpenAPI specification",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateOpenAPISpec,
    isGenerating
  };
}
