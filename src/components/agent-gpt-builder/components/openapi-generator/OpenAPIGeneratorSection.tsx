
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Copy, Send, FileCode, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOpenAPIGenerator } from "./hooks/useOpenAPIGenerator";

const OpenAPIGeneratorSection = () => {
  const [activeTab, setActiveTab] = useState<"curl" | "text" | "url">("curl");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { generateOpenAPISpec } = useOpenAPIGenerator();
  const [generatedSpec, setGeneratedSpec] = useState("");

  const handleGenerateSpec = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input required",
        description: "Please provide an input to generate an OpenAPI specification",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const spec = await generateOpenAPISpec(inputValue, activeTab);
      setGeneratedSpec(spec);
      
      toast({
        title: "OpenAPI spec generated",
        description: "Your OpenAPI specification has been successfully generated",
      });
    } catch (error) {
      console.error("Error generating OpenAPI spec:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Failed to generate OpenAPI specification",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedSpec) return;
    
    navigator.clipboard.writeText(generatedSpec);
    toast({
      title: "Copied to clipboard",
      description: "OpenAPI specification has been copied to clipboard"
    });
  };

  const clearInputs = () => {
    setInputValue("");
    setGeneratedSpec("");
    toast({
      title: "Cleared",
      description: "All inputs and generated specs have been cleared"
    });
  };

  const getPlaceholderText = () => {
    switch (activeTab) {
      case "curl":
        return `curl -X POST https://api.example.com/leads \\
  -H "Authorization: Bearer sk-test-abc123" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Alice", "email": "alice@example.com"}'`;
      case "text":
        return "POST to https://api.example.com/leads with a JSON body containing name and email fields.";
      case "url":
        return "https://api.weatherapi.com/v1/current.json?key=APIKEY&q=London";
      default:
        return "";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-[#1a0b2e]/80 border border-white/10 shadow-xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <FileCode className="mr-2 text-[#9b87f5]" />
            API Input
          </h2>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "curl" | "text" | "url")} className="mb-4">
            <TabsList className="bg-[#2f1c4a]/60 border border-white/10 w-full">
              <TabsTrigger value="curl" className="flex-1">cURL Command</TabsTrigger>
              <TabsTrigger value="text" className="flex-1">Text Description</TabsTrigger>
              <TabsTrigger value="url" className="flex-1">API URL</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={getPlaceholderText()}
            className="bg-[#1a0b2e]/60 border-white/10 text-white resize-none min-h-[200px] mb-4"
          />
          
          <div className="flex gap-3">
            <Button
              onClick={handleGenerateSpec}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-[#9b87f5] to-[#8777e5] hover:from-[#8777e5] hover:to-[#7667d5] text-white shadow-lg shadow-[#9b87f5]/20 flex-1"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate Spec
                </>
              )}
            </Button>
            <Button
              onClick={clearInputs}
              variant="outline"
              className="bg-[#2f1c4a]/20 border-white/10 text-white hover:bg-[#2f1c4a]/40"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1a0b2e]/80 border border-white/10 shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <FileCode className="mr-2 text-[#9b87f5]" />
              OpenAPI 3.1.0 Spec
            </h2>
            {generatedSpec && (
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="text-[#9b87f5] hover:text-white hover:bg-[#2f1c4a]/40"
              >
                <Copy className="mr-1 h-4 w-4" /> Copy
              </Button>
            )}
          </div>
          
          <div className="bg-[#1a0b2e]/60 border border-white/10 rounded-md p-4 overflow-auto min-h-[200px] font-mono text-sm text-white/90">
            {generatedSpec ? (
              <pre className="whitespace-pre-wrap">{generatedSpec}</pre>
            ) : (
              <div className="text-white/50 flex flex-col items-center justify-center h-full">
                <FileCode size={24} className="mb-2" />
                <p>Generated OpenAPI spec will appear here</p>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-white/70 text-sm">
            <p>This OpenAPI specification can be used directly as a custom action in your Agent-GPT setup.</p>
          </div>
        </CardContent>
      </Card>

      {/* Usage guide section */}
      <div className="md:col-span-2">
        <Card className="bg-[#2f1c4a]/40 border border-white/10 shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-white mb-3">How to Use the API Spec Generator</h2>
            <ol className="list-decimal list-inside text-white/80 space-y-2 ml-2">
              <li>Choose your input type (cURL command, text description, or API URL)</li>
              <li>Paste or type your input in the text area</li>
              <li>Click "Generate Spec" to create an OpenAPI 3.1.0 specification</li>
              <li>Copy the generated YAML to use as a custom action in Agent-GPT</li>
              <li>The generator will automatically detect authentication requirements, parameters, and response formats</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpenAPIGeneratorSection;
