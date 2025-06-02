
import { useState, useEffect } from "react";
import { AgentTemplate } from "../types";
import { agentTemplates, AgentTemplatesKey } from "../data/templateData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAgentTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate | null>(null);
  const [editableTemplate, setEditableTemplate] = useState<AgentTemplate | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [user, setUser] = useState<{ id: string } | null>(null);
  const { toast } = useToast();

  // Fetch the current user when the hook is initialized
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    
    fetchUser();
  }, []);

  const handleTemplateSelect = (key: string) => {
    const template = agentTemplates[key as AgentTemplatesKey];
    setEditableTemplate(template);
  };

  const launchAgent = () => {
    if (!editableTemplate) return;
    
    setSelectedTemplate(editableTemplate);
    setEditableTemplate(null);
  };

  const saveAgent = async () => {
    if (!editableTemplate) return;
    
    try {
      const { data, error } = await supabase.from("voice_agents").insert([
        {
          name: editableTemplate.name || "",
          prompt: editableTemplate.prompt || "",
          created_by: user?.id  // Include the user ID if available
        }
      ]).select();
      
      if (error) {
        throw new Error(error.message);
      }
      
      toast({
        title: "Agent saved",
        description: "Your voice agent has been saved successfully.",
      });
      
      return data;
    } catch (error) {
      console.error("Error saving agent:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save agent. Please try again.",
      });
      return null;
    }
  };

  return {
    selectedTemplate,
    setSelectedTemplate,
    editableTemplate,
    setEditableTemplate,
    selectedLanguage,
    setSelectedLanguage,
    handleTemplateSelect,
    launchAgent,
    saveAgent
  };
}
