
import React from 'react';
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supportedLanguages } from '@/services/voiceAgentService';

interface LanguageSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  setSelectedLanguage
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-purple-300" />
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600 text-white">
          <SelectValue placeholder="Auto-detect language" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700 text-white">
          <SelectItem value="">Auto-detect</SelectItem>
          <SelectItem value={supportedLanguages.english}>English</SelectItem>
          <SelectItem value={supportedLanguages.german}>German</SelectItem>
          <SelectItem value={supportedLanguages.portuguese}>Portuguese</SelectItem>
          <SelectItem value={supportedLanguages.chinese}>Chinese</SelectItem>
          <SelectItem value={supportedLanguages.japanese}>Japanese</SelectItem>
          <SelectItem value={supportedLanguages.french}>French</SelectItem>
          <SelectItem value={supportedLanguages.spanish}>Spanish</SelectItem>
          <SelectItem value={supportedLanguages.hindi}>Hindi</SelectItem>
          <SelectItem value={supportedLanguages.italian}>Italian</SelectItem>
          <SelectItem value={supportedLanguages.korean}>Korean</SelectItem>
          <SelectItem value={supportedLanguages.dutch}>Dutch</SelectItem>
          <SelectItem value={supportedLanguages.polish}>Polish</SelectItem>
          <SelectItem value={supportedLanguages.russian}>Russian</SelectItem>
          <SelectItem value={supportedLanguages.swedish}>Swedish</SelectItem>
          <SelectItem value={supportedLanguages.turkish}>Turkish</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
