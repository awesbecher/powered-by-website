
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgentTemplate } from "./types";
import { supportedLanguages } from "@/services/voiceAgentService";

interface AgentEditorProps {
  editableTemplate: AgentTemplate;
  setEditableTemplate: (template: AgentTemplate) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  onLaunchAgent: () => void;
  onSaveAgent: () => void;
}

const AgentEditor: React.FC<AgentEditorProps> = ({
  editableTemplate,
  setEditableTemplate,
  selectedLanguage,
  setSelectedLanguage,
  onLaunchAgent,
  onSaveAgent
}) => {
  if (!editableTemplate) return null;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white flex items-center gap-2">
        <span className="bg-[#9b87f5]/20 p-1 rounded-md">🧠</span>
        Edit Template: {editableTemplate.name}
      </h3>
      
      <div className="space-y-2">
        <label className="text-white">Prompt:</label>
        <Textarea
          rows={6}
          className="bg-[#1a0b2e]/40 border-white/10 text-white resize-none"
          value={editableTemplate.prompt}
          onChange={(e) => setEditableTemplate({ ...editableTemplate, prompt: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-white block mb-1">Language:</label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="bg-[#1a0b2e]/40 border-white/10 text-white">
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a0b2e] border-white/10">
            <SelectGroup>
              <SelectItem value="english">🇺🇸 English</SelectItem>
              <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
              <SelectItem value="french">🇫🇷 French</SelectItem>
              <SelectItem value="german">🇩🇪 German</SelectItem>
              <SelectItem value="hindi">🇮🇳 Hindi</SelectItem>
              <SelectItem value="chinese">🇨🇳 Chinese</SelectItem>
              <SelectItem value="japanese">🇯🇵 Japanese</SelectItem>
              <SelectItem value="portuguese">🇵🇹 Portuguese</SelectItem>
              <SelectItem value="italian">🇮🇹 Italian</SelectItem>
              <SelectItem value="russian">🇷🇺 Russian</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex gap-3">
        <Button 
          onClick={onLaunchAgent}
          className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5]"
        >
          ✅ Launch Agent
        </Button>
        <Button 
          onClick={onSaveAgent} 
          className="bg-[#1a0b2e]/60 border-white/10 hover:bg-[#2f1c4a]/60"
        >
          💾 Save Agent
        </Button>
      </div>
    </div>
  );
};

export default AgentEditor;
