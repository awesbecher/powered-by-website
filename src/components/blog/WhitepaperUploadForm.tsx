
import { useState } from "react";
import { UploadCloud, X, Check, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const WhitepaperUploadForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadKey, setUploadKey] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      if (!selectedFile.type.includes('pdf')) {
        toast({
          title: "Invalid file type",
          description: "Only PDF files are allowed",
          variant: "destructive",
          className: "bg-red-800 border-red-700 text-white"
        });
        return;
      }
      
      // Limit file size to 10MB
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 10MB",
          variant: "destructive",
          className: "bg-red-800 border-red-700 text-white"
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file || !title || !uploadKey || !apiKey) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and select a file",
        variant: "destructive",
        className: "bg-red-800 border-red-700 text-white"
      });
      return;
    }
    
    setDebugInfo(null);
    
    try {
      setUploading(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      if (description) {
        formData.append('description', description);
      }
      
      // Log debugging information
      console.log("Upload started:", {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        title,
        descriptionLength: description?.length || 0
      });
      
      // Upload the file
      const response = await fetch("https://cinohyzbtfzfcdtkgvij.supabase.co/functions/v1/upload-whitepaper", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${uploadKey}`,
          'apikey': apiKey
        },
        body: formData
      });
      
      // Get the response as text first for debugging
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      // Try to parse as JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload whitepaper');
      }
      
      toast({
        title: "Upload successful",
        description: "Your whitepaper has been uploaded",
        variant: "default",
        className: "bg-green-800 text-white border-green-700"
      });
      
      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
      
      // Call the onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
    } catch (error) {
      console.error("Upload error:", error);
      
      // Show detailed error in the debug section
      setDebugInfo(error instanceof Error ? error.message : "Unknown error occurred");
      
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive",
        className: "bg-red-800 border-red-700 text-white"
      });
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white/5 rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">Title *</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter whitepaper title"
          className="bg-white/10 border-white/20 text-white"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description" className="text-white">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a brief description"
          className="bg-white/10 border-white/20 text-white h-24 resize-none"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="pdf-upload-key" className="text-white">Admin Upload Key *</Label>
        <Input
          id="pdf-upload-key"
          type="password"
          value={uploadKey}
          onChange={(e) => setUploadKey(e.target.value)}
          placeholder="Enter your PDF Upload key"
          className="bg-white/10 border-white/20 text-white"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="api-key" className="text-white">Supabase Anon Key *</Label>
        <Input
          id="api-key"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Supabase anon key"
          className="bg-white/10 border-white/20 text-white"
          required
        />
        <p className="text-xs text-gray-400">
          The anon key can be found in src/integrations/supabase/client.ts (SUPABASE_PUBLISHABLE_KEY)
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="file" className="text-white">PDF File *</Label>
        <div className="flex items-center justify-center w-full">
          {!file ? (
            <label 
              htmlFor="file" 
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
              border-gray-500 bg-white/5 hover:bg-white/10"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloud className="w-8 h-8 mb-3 text-gray-300" />
                <p className="mb-2 text-sm text-gray-300">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-300">PDF only (MAX. 10MB)</p>
              </div>
              <input 
                id="file" 
                type="file" 
                accept=".pdf" 
                className="hidden" 
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          ) : (
            <div className="flex flex-col items-center w-full p-4 border-2 border-green-500 bg-green-500/10 rounded-lg">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Check className="w-6 h-6 mr-2 text-green-400" />
                  <div>
                    <p className="text-sm font-medium truncate max-w-[180px] md:max-w-xs">{file.name}</p>
                    <p className="text-xs text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={clearFile} 
                  className="p-1 rounded-full hover:bg-white/10"
                  disabled={uploading}
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {debugInfo && (
        <div className="p-3 bg-amber-900/30 border border-amber-500/30 rounded-md">
          <div className="flex items-start">
            <Info className="w-5 h-5 mr-2 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-400">Debug Information</h4>
              <p className="text-xs text-gray-300 mt-1 whitespace-pre-wrap">{debugInfo}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={uploading} 
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {uploading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : "Upload Whitepaper"}
        </Button>
      </div>
      
      <div className="flex items-start mt-4 text-xs text-gray-300">
        <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 text-amber-400" />
        <p>
          Your PDF will be publicly accessible after upload. Make sure you have the rights to distribute this content.
        </p>
      </div>
    </form>
  );
};
