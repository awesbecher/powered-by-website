import React, { useState } from "react";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceAgentTemplates from "./VoiceAgentTemplates";
import AgentEditor from "./AgentEditor";
import AgentChat from "./AgentChat";
import SavedAgentList from "./SavedAgentList";
import { Card, CardContent } from "@/components/ui/card";
import MultiAgentManager from "./MultiAgentManager";

interface VoiceAgentBuilderProps {
  onSelectTemplate: (template: { name: string; prompt: string }) => void;
  initialTab?: string;
  checkAgentLimits?: () => Promise<boolean>;
  disableCreation?: boolean;
}

const VoiceAgentBuilder: React.FC<VoiceAgentBuilderProps> = ({ 
  onSelectTemplate, 
  initialTab,
  checkAgentLimits,
  disableCreation 
}) => {
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

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    onSelectTemplate({ name: template.name, prompt: template.prompt });
  };

  return (
    <Card className="border border-gray-700 bg-gray-900 shadow-xl rounded-xl">
      <CardContent className="p-4">
        <Tabs defaultValue={initialTabOverride || "templates"} className="w-full">
          <TabsList className="max-w-md mx-auto">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="saved">My Agents</TabsTrigger>
            <TabsTrigger value="embeds">Embeds</TabsTrigger>
            <TabsTrigger value="multi">Multi Agent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates">
            <VoiceAgentTemplates onSelect={handleTemplateSelect} />
          </TabsContent>
          
          <TabsContent value="editor">
            <AgentEditor
              selectedTemplate={editableTemplate}
              onUpdateTemplate={setEditableTemplate}
              onLaunch={launchAgent}
              onSave={async () => {
                if (checkAgentLimits && disableCreation) {
                  return;
                }
                if (checkAgentLimits) {
                  const canProceed = await checkAgentLimits();
                  if (!canProceed) return;
                }
                await saveAgent();
                await fetchSavedAgents();
              }}
              disableCreation={disableCreation}
            />
          </TabsContent>
          
          <TabsContent value="chat">
            <AgentChat
              messages={messages}
              userInput={userInput}
              setUserInput={setUserInput}
              loading={loading}
              isListening={isListening}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              handleSendMessage={handleSendMessage}
              startVoiceInput={startVoiceInput}
              generateEmbedCode={generateEmbedCode}
              generateOpenAPISpec={generateOpenAPISpec}
            />
          </TabsContent>

          <TabsContent value="saved">
            <SavedAgentList
              savedAgents={savedAgents}
              onSelectAgent={loadSavedAgent}
            />
          </TabsContent>

          <TabsContent value="embeds">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Embed Your Agent</h3>
              {selectedTemplate ? (
                <>
                  <p className="text-gray-400 mb-2">Use the code below to embed this agent on your website:</p>
                  <textarea
                    readOnly
                    value={`<iframe src="YOUR_URL_HERE" width="300" height="400"></iframe>`}
                    className="w-full h-32 bg-gray-800 border-gray-700 rounded-md p-2 text-gray-200"
                  />
                  <button
                    onClick={generateEmbedCode}
                    className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Generate Embed Code
                  </button>
                  <button
                    onClick={generateOpenAPISpec}
                    className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Generate OpenAPI Spec
                  </button>
                </>
              ) : (
                <p className="text-gray-400">Select a template to generate embed code.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="multi">
            <MultiAgentManager />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoiceAgentBuilder;
