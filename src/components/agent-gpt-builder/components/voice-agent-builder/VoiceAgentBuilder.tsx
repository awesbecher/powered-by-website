import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";
import VoiceAgentTemplates from "./VoiceAgentTemplates";
import AgentEditor from "./AgentEditor";
import AgentChat from "./AgentChat";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { agentTemplates } from "./data/templateData";
import { AgentTemplatesKey } from "./data/templateData";
import SavedAgentList from "./SavedAgentList";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";

interface VoiceAgentBuilderProps {
  onSelectTemplate?: (template: any) => void;
  initialTab?: string;
}

const VoiceAgentBuilder: React.FC<VoiceAgentBuilderProps> = ({ onSelectTemplate, initialTab }) => {
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    
    fetchUser();
  }, []);

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
    initialTabOverride,
    setInitialTabOverride
  } = useVoiceAgent(initialTab);

  const handleTemplateSelect = (key: string) => {
    const template = agentTemplates[key as AgentTemplatesKey];
    setEditableTemplate(template);
    
    if (onSelectTemplate) {
      onSelectTemplate(template);
    }
  };

  const handleBrowseTemplates = () => {
    setInitialTabOverride("templates");
  };

  return (
    <Card className="border border-white/10 bg-gradient-to-br from-[#1a0b2e]/70 to-[#2f1c4a]/70 shadow-xl rounded-xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.7s' }}>
      <CardHeader className="border-b border-white/10 bg-gradient-to-r from-[#2f1c4a] to-[#1a0b2e]">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="bg-[#9b87f5]/20 p-1 rounded-md">
            <Bot className="text-[#9b87f5]" size={24} />
          </span>
          Voice GPT Agent Builder
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        {!selectedTemplate && !editableTemplate && initialTabOverride !== "saved" && (
          <VoiceAgentTemplates 
            onSelectTemplate={handleTemplateSelect}
          />
        )}
        
        {!selectedTemplate && !editableTemplate && initialTabOverride === "saved" && (
          <SavedAgentList 
            user={user}
            onLoadAgent={loadSavedAgent}
            onRefresh={fetchSavedAgents}
            onBrowseTemplates={handleBrowseTemplates}
          />
        )}
        
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
