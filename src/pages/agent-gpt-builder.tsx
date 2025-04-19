
import React from 'react';
import AgentPromptEditor from '@/components/AgentPromptEditor';
import AgentGPTBuilder from '@/pages/AgentGPTBuilder';

export default function AgentBuilderPage() {
  return <AgentGPTBuilder initialLoad={false} />;
}
