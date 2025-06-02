
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
      const systemPrompt = `You are an API specification generator that creates OpenAPI 3.1.0 YAML from various inputs.

Your task is to generate a valid OpenAPI 3.1.0 YAML specification based on the provided input, which may be a cURL command, a text description, or a URL endpoint.

OUTPUT RULES:
- Return ONLY valid OpenAPI 3.1.0 YAML with NO explanations or extra text
- Do NOT wrap the output in markdown code blocks or add any comments
- Include ONLY the YAML content - nothing else
- The output will be pasted directly into a system that expects raw YAML

SPECIFICATION REQUIREMENTS:
- Always start with 'openapi: 3.1.0'
- Include info.title, info.version, and info.description fields
- Add servers section using the domain from the input
- Create appropriate paths with well-named camelCase operationIds
- If the method isn't specified, default to GET
- Extract path variables like /users/{id} and define them properly
- For JSON bodies, infer schema properties with appropriate types
- If Authorization: Bearer header is present, include a bearerAuth security scheme
- Add sample response codes (200 for GET, 201 for POST, etc.)
- Keep the spec minimal but complete and valid`;

      const userMessage = `Generate an OpenAPI 3.1.0 specification for this ${inputType === "curl" ? "cURL command" : inputType === "text" ? "API description" : "API URL"}:

${input}`;

      const response = await openaiService.generateChatCompletion(
        [{ role: "user", content: userMessage }],
        {
          systemPrompt,
          temperature: 0.1,
          model: "gpt-4o-mini" // Using a capable model for specification generation
        }
      );

      const generatedSpec = response.message.content.trim();
      
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
