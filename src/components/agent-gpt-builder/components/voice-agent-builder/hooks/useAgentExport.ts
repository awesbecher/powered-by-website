
import { useToast } from "@/hooks/use-toast";
import { AgentTemplate } from "../types";

export function useAgentExport() {
  const { toast } = useToast();

  // Generate embed code for the agent
  const generateEmbedCode = (selectedTemplate: AgentTemplate, selectedLanguage: string) => {
    if (!selectedTemplate) return;
    
    const code = `
<!-- GPT Agent Widget -->
<div id="gpt-agent-widget"></div>
<script src="https://voice-agent-widget.vercel.app/widget.js" data-agent="${selectedTemplate.name}" data-lang="${selectedLanguage}"></script>
`;
    
    navigator.clipboard.writeText(code);
    toast({
      title: "Embed code copied",
      description: "The widget embed code has been copied to your clipboard.",
    });
  };

  // Generate OpenAPI specification file
  const generateOpenAPISpec = (selectedTemplate: AgentTemplate) => {
    if (!selectedTemplate) return;
    
    const yaml = `openapi: 3.1.0
info:
  title: ${selectedTemplate.name} API
  version: 1.0.0
servers:
  - url: https://api.openai.com/v1
paths:
  /chat/completions:
    post:
      operationId: sendMessageTo${selectedTemplate.name.replace(/\s+/g, "")}
      summary: Send message to GPT agent
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                model:
                  type: string
                  example: gpt-4o
                messages:
                  type: array
                  items:
                    type: object
                    properties:
                      role:
                        type: string
                      content:
                        type: string
      responses:
        '200':
          description: GPT response
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
security:
  - BearerAuth: []`;

    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedTemplate.name}-OpenAPI.yaml`;
    a.click();
    
    toast({
      title: "OpenAPI spec downloaded",
      description: "The OpenAPI specification file has been downloaded.",
    });
  };

  return {
    generateEmbedCode,
    generateOpenAPISpec
  };
}
