
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Download, FileJson, ExternalLink } from "lucide-react";

interface AgentDeploymentSectionProps {
  agentName: string;
  agentInstructions: string;
  handleSaveAgent: () => Promise<void>;
}

const AgentDeploymentSection: React.FC<AgentDeploymentSectionProps> = ({
  agentName,
  agentInstructions,
  handleSaveAgent,
}) => {
  const { toast } = useToast();

  const handleCopyPrompt = () => {
    const exportData = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: agentInstructions },
        { role: "user", content: "Can you help me with a customer inquiry?" },
      ],
    };
    navigator.clipboard.writeText(JSON.stringify(exportData, null, 2));
    toast({
      title: "Copied to clipboard",
      description: "Agent prompt has been copied to clipboard.",
    });
  };

  const handleDownloadPrompt = () => {
    const exportData = {
      model: "gpt-4o",
      messages: [
        { role: "system", content: agentInstructions },
        { role: "user", content: "Can you help me with a customer inquiry?" },
      ],
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${agentName.replace(/\s+/g, '-')}-prompt.json`;
    a.click();
  };

  const handleDownloadOpenAPISpec = () => {
    const yaml = `openapi: 3.1.0
info:
  title: ${agentName} Agent API
  description: Auto-generated OpenAPI spec for your custom GPT agent
  version: 1.0.0
servers:
  - url: https://api.openai.com/v1
paths:
  /chat/completions:
    post:
      operationId: sendMessageTo${agentName.replace(/\s+/g, '')}
      summary: Send a message to the ${agentName} GPT agent
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [model, messages]
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
                        enum: [system, user, assistant]
                      content:
                        type: string
                  example:
                    - role: system
                      content: "${agentInstructions.replace(/"/g, "'")}"
                    - role: user
                      content: "Hello"
      responses:
        '200':
          description: Assistant response
          content:
            application/json:
              schema:
                type: object
                properties:
                  choices:
                    type: array
                    items:
                      type: object
                      properties:
                        message:
                          type: object
                          properties:
                            role:
                              type: string
                            content:
                              type: string
security:
  - BearerAuth: []
components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer`;

    const blob = new Blob([yaml], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${agentName.replace(/\s+/g, '-')}-OpenAPI.yaml`;
    a.click();
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="bg-[#9b87f5]/20 p-1 rounded-md">🚀</span>
        Deploy Your Agent
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button 
          variant="outline" 
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
          onClick={handleCopyPrompt}
        >
          <Copy size={16} />
          Copy Prompt JSON
        </Button>
        
        <Button 
          variant="outline"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
          onClick={handleDownloadPrompt}
        >
          <Download size={16} />
          Download JSON
        </Button>
        
        <Button 
          variant="outline"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
          onClick={handleDownloadOpenAPISpec}
        >
          <FileJson size={16} />
          Export OpenAPI
        </Button>
        
        <Button 
          variant="outline"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60 flex items-center justify-center gap-2"
          onClick={handleSaveAgent}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Save Agent
        </Button>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2 mt-6">
        <span className="bg-[#9b87f5]/20 p-1 rounded-md">🔗</span>
        External Platforms
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        <a 
          href={`https://platform.openai.com/playground?mode=chat&model=gpt-4o&prompt=${encodeURIComponent(agentInstructions)}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#9b87f5] hover:text-[#a87cff] transition-colors"
        >
          <ExternalLink size={16} />
          Open in OpenAI Playground
        </a>
        
        <a 
          href="https://chat.openai.com/gpts/editor" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-[#9b87f5] hover:text-[#a87cff] transition-colors"
        >
          <ExternalLink size={16} />
          Add to Custom GPT
        </a>
      </div>
    </div>
  );
};

export default AgentDeploymentSection;
