
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceAgentTemplates from "./VoiceAgentTemplates";
import AgentEditor from "./AgentEditor";
import AgentChat from "./AgentChat";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { agentTemplates } from "./data/templateData";
import { AgentTemplatesKey } from "./data/templateData";

interface VoiceAgentBuilderProps {
  onSelectTemplate?: (template: any) => void;
  initialTab?: string;
}

const VoiceAgentBuilder: React.FC<VoiceAgentBuilderProps> = ({ onSelectTemplate, initialTab }) => {
  const {
    selectedTemplate,
    setSelectedTemplate,
    editableTemplate,
    setEditableTemplate,
    messages,
    userInput,
    setUserInput,
    loading,
    isListening,
    selectedLanguage,
    setSelectedLanguage,
    launchAgent,
    handleSendMessage,
    startVoiceInput,
    saveAgent,
    generateEmbedCode,
    generateOpenAPISpec,
    savedAgents,
    fetchSavedAgents,
    loadSavedAgent,
    initialTabOverride
  } = useVoiceAgent(initialTab);

  // Handle template selection from the grid
  const handleTemplateSelect = (key: string) => {
    const template = agentTemplates[key as AgentTemplatesKey];
    setEditableTemplate(template);
    
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">🎙️</span>
          Voice GPT Agent Builder
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Template selection grid */}
        {!selectedTemplate && !editableTemplate && initialTabOverride !== "saved" && (
          <VoiceAgentTemplates 
            agentTemplates={agentTemplates} 
            onSelectTemplate={handleTemplateSelect}
          />
        )}
        
        {/* Saved agent selection grid */}
        {!selectedTemplate && !editableTemplate && initialTabOverride === "saved" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedAgents.length === 0 ? (
              <div className="text-center col-span-full py-12">
                <h3 className="text-white text-xl mb-4">No Saved Agents</h3>
                <p className="text-gray-300 mb-6">You haven't saved any agents yet</p>
              </div>
            ) : (
              savedAgents.map((agent) => (
                <div 
                  key={agent.id}
                  onClick={() => loadSavedAgent(agent)}
                  className="border border-white/10 rounded-lg p-4 cursor-pointer bg-[#1a0b2e]/40 hover:bg-[#2f1c4a]/40 transition-colors"
                >
                  <h3 className="text-white font-bold">{agent.name}</h3>
                  <p className="text-gray-300 text-sm mt-2">{agent.prompt.substring(0, 100)}...</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Created: {new Date(agent.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
        
        {/* Agent editor */}
        {editableTemplate && (
          <AgentEditor
            editableTemplate={editableTemplate}
            setEditableTemplate={setEditableTemplate}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
            onLaunchAgent={launchAgent}
            onSaveAgent={saveAgent}
          />
        )}
        
        {/* Agent chat interface */}
        {selectedTemplate && (
          <AgentChat 
            selectedTemplate={selectedTemplate}
            messages={messages}
            userInput={userInput}
            setUserInput={setUserInput}
            loading={loading}
            isListening={isListening}
            onSendMessage={handleSendMessage}
            onStartVoiceInput={startVoiceInput}
            onGenerateEmbedCode={generateEmbedCode}
            onGenerateOpenAPISpec={generateOpenAPISpec}
            onBack={() => setSelectedTemplate(null)}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceAgentBuilder;
