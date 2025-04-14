
export interface AgentTemplate {
  name: string;
  prompt: string;
}

export type AgentTemplates = Record<string, AgentTemplate>;

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface VoiceAgentHooks {
  handleSendMessage: (text?: string) => Promise<void>;
  startVoiceInput: () => void;
  generateEmbedCode: () => void;
  generateOpenAPISpec: () => void;
  saveAgent: () => Promise<void>;
}
