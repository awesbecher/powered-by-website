
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, FileDown, Settings } from "lucide-react";
import BrandingCustomizer from "./BrandingCustomizer";
import { AgentTemplate } from "../types";

interface ExportOptionsPanelProps {
  onGenerateEmbedCode: () => void;
  onGenerateOpenAPISpec: () => void;
  selectedTemplate: AgentTemplate;
}

const ExportOptionsPanel: React.FC<ExportOptionsPanelProps> = ({
  onGenerateEmbedCode,
  onGenerateOpenAPISpec,
  selectedTemplate
}) => {
  const [showBrandingCustomizer, setShowBrandingCustomizer] = useState(false);

  return (
    <div className="pt-4 border-t border-white/10">
      <div className="font-medium text-white mb-2">Export Options:</div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
          onClick={onGenerateEmbedCode}
        >
          <Copy size={16} className="mr-2" />
          Copy Simple Widget Snippet
        </Button>
        <Button
          variant="outline"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
          onClick={onGenerateOpenAPISpec}
        >
          <FileDown size={16} className="mr-2" />
          Export OpenAPI Spec
        </Button>
        <Button
          variant="outline"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
          onClick={() => setShowBrandingCustomizer(!showBrandingCustomizer)}
        >
          <Settings size={16} className="mr-2" />
          {showBrandingCustomizer ? "Hide Customizer" : "Advanced Widget Customizer"}
        </Button>
      </div>

      {showBrandingCustomizer && (
        <div className="mt-4 border-t border-white/10 pt-4">
          <BrandingCustomizer agentName={selectedTemplate.name} />
        </div>
      )}
    </div>
  );
};

export default ExportOptionsPanel;
