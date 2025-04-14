
export interface AgentTemplate {
  id?: string;
  name: string;
  prompt: string;
  created_at?: string;
}

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}
