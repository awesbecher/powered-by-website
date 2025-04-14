
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, FileDown } from "lucide-react";

interface ExportOptionsPanelProps {
  onGenerateEmbedCode: () => void;
  onGenerateOpenAPISpec: () => void;
}

const ExportOptionsPanel: React.FC<ExportOptionsPanelProps> = ({
  onGenerateEmbedCode,
  onGenerateOpenAPISpec
}) => {
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
          Copy Widget Snippet
        </Button>
        <Button
          variant="outline"
          className="bg-[#1a0b2e]/60 border-white/10 text-white hover:bg-[#2f1c4a]/60"
          onClick={onGenerateOpenAPISpec}
        >
          <FileDown size={16} className="mr-2" />
          Export OpenAPI Spec
        </Button>
      </div>
    </div>
  );
};

export default ExportOptionsPanel;
