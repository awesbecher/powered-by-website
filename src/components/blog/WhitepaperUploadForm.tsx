
import { useState } from "react";
import { UploadCloud, X, Check, AlertCircle } from "lucide-react";
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
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      if (!selectedFile.type.includes('pdf')) {
        toast({
          title: "Invalid file type",
          description: "Only PDF files are allowed",
          variant: "destructive"
        });
        return;
      }
      
      // Limit file size to 10MB
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 10MB",
          variant: "destructive"
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
        variant: "destructive"
      });
      return;
    }
    
    try {
      setUploading(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      if (description) {
        formData.append('description', description);
      }
      
      // Upload the file
      const response = await fetch("https://cinohyzbtfzfcdtkgvij.supabase.co/functions/v1/upload-whitepaper", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${uploadKey}`,
          'apikey': apiKey
        },
        body: formData
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to upload whitepaper');
      }
      
      toast({
        title: "Upload successful",
        description: "Your whitepaper has been uploaded",
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
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An error occurred during upload",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="file" className="text-white">PDF File *</Label>
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="file" 
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer 
            ${file ? 'border-green-500 bg-green-500/10' : 'border-gray-500 bg-white/5 hover:bg-white/10'}`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {!file ? (
                <>
                  <UploadCloud className="w-8 h-8 mb-3 text-gray-300" />
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-300">PDF only (MAX. 10MB)</p>
                </>
              ) : (
                <>
                  <Check className="w-8 h-8 mb-3 text-green-400" />
                  <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">{file.name}</span>
                  </p>
                  <p className="text-xs text-gray-300">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </>
              )}
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
        </div>
      </div>
      
      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={uploading} 
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {uploading ? "Uploading..." : "Upload Whitepaper"}
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
