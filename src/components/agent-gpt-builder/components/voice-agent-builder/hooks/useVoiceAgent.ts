
import { useState, useEffect } from "react";
import { Message } from "../types";
import { useAgentTemplates } from "./useAgentTemplates";
import { useAgentMessages } from "./useAgentMessages";
import { useAgentVoice } from "./useAgentVoice";
import { useAgentExport } from "./useAgentExport";

export function useVoiceAgent() {
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

  // Initialize system message when template is selected
  useEffect(() => {
    if (selectedTemplate && messages.length === 0) {
      setMessages([{ role: "system", content: selectedTemplate.prompt }]);
    }
  }, [selectedTemplate, messages.length, setMessages]);

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
    generateOpenAPISpec
  };
}
