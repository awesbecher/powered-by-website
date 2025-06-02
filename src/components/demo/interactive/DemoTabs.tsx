
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoOptions } from "./DemoData";

interface DemoTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const DemoTabs = ({ activeTab, onTabChange }: DemoTabsProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-gray-900/50 rounded-xl p-1 mb-10">
      {demoOptions.map(option => (
        <TabsTrigger 
          key={option.id} 
          value={option.id}
          className="data-[state=active]:bg-[#6342ff] data-[state=active]:text-white rounded-lg font-medium"
        >
          <option.icon className="mr-2 h-5 w-5" />
          {option.title}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
