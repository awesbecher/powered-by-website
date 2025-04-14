
import { useState, useEffect } from "react";
import { Message } from "../types";
import { useAgentTemplates } from "./useAgentTemplates";
import { useAgentMessages } from "./useAgentMessages";
import { useAgentVoice } from "./useAgentVoice";
import { useAgentExport } from "./useAgentExport";
import { supabase } from "@/integrations/supabase/client";

export function useVoiceAgent(initialTab?: string) {
  const {
    selectedTemplate,
    setSelectedTemplate,
    editableTemplate,
    setEditableTemplate,
    selectedLanguage,
    setSelectedLanguage,
    handleTemplateSelect,
    launchAgent,
    saveAgent
  } = useAgentTemplates();

  const {
    messages,
    setMessages,
    userInput,
    setUserInput,
    loading,
    handleSendMessage
  } = useAgentMessages();

  const {
    isListening,
    speakText,
    startVoiceInput
  } = useAgentVoice(selectedLanguage);

  const {
    generateEmbedCode: generateEmbedCodeBase,
    generateOpenAPISpec: generateOpenAPISpecBase
  } = useAgentExport();

  // New state for saved agents
  const [savedAgents, setSavedAgents] = useState<any[]>([]);
  const [initialTabOverride, setInitialTabOverride] = useState(initialTab || "");

  // Initialize system message when template is selected
  useEffect(() => {
    if (selectedTemplate && messages.length === 0) {
      setMessages([{ role: "system", content: selectedTemplate.prompt }]);
    }
  }, [selectedTemplate, messages.length, setMessages]);

  // Fetch saved agents when the component mounts
  useEffect(() => {
    fetchSavedAgents();
  }, []);

  const fetchSavedAgents = async () => {
    try {
      const { data, error } = await supabase
        .from("voice_agents")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      if (data) setSavedAgents(data);
    } catch (error) {
      console.error("Error fetching saved agents:", error);
    }
  };

  const loadSavedAgent = (agent: any) => {
    const template = {
      name: agent.name,
      prompt: agent.prompt,
      id: agent.id
    };
    setSelectedTemplate(template);
    setMessages([{ role: "system", content: agent.prompt }]);
  };

  // Wrapper for voice input that passes the handleSendMessage callback
  const handleVoiceInput = () => {
    startVoiceInput((text) => {
      setUserInput(text);
      setTimeout(() => handleSendMessage(text), 100);
    });
  };

  // Wrappers for export functions to provide the current template
  const generateEmbedCode = () => {
    if (selectedTemplate) {
      generateEmbedCodeBase(selectedTemplate, selectedLanguage);
    }
  };

  const generateOpenAPISpec = () => {
    if (selectedTemplate) {
      generateOpenAPISpecBase(selectedTemplate);
    }
  };

  return {
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
    startVoiceInput: handleVoiceInput,
    saveAgent,
    generateEmbedCode,
    generateOpenAPISpec,
    savedAgents,
    fetchSavedAgents,
    loadSavedAgent,
    initialTabOverride
  };
}
