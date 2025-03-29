
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, X, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface DocumentFile {
  id: string;
  source: string;
  text: string;
}

export const DocumentUploader: React.FC = () => {
  const [files, setFiles] = useState<DocumentFile[]>([]);
  const [modelPrompt, setModelPrompt] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{success?: boolean; message?: string} | null>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Process each file
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      
      // Only accept text files
      if (file.type !== 'text/plain') {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `Only .txt files are supported. ${file.name} has type ${file.type}`
        });
        continue;
      }
      
      try {
        // Read the file content
        const text = await readFileAsText(file);
        
        // Add to our list
        setFiles(prev => [...prev, {
          id: Math.random().toString(36).substring(2, 9),
          source: file.name,
          text
        }]);
      } catch (error) {
        toast({
          variant: "destructive",
          title: `Error reading file ${file.name}`,
          description: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }
    
    // Clear the input
    e.target.value = '';
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const uploadToKnowledgeBase = async () => {
    if (files.length === 0 && !modelPrompt) {
      toast({
        variant: "destructive",
        title: "No content to upload",
        description: "Please add at least one document or a model prompt"
      });
      return;
    }

    setUploading(true);
    setUploadResult(null);
    
    try {
      // Convert files to the format expected by the API
      const documents = files.map(file => ({
        text: file.text,
        source: file.source
      }));
      
      // Call our edge function
      const { data, error } = await supabase.functions.invoke('upload-to-pinecone', {
        body: { 
          documents, 
          modelPrompt: modelPrompt || null 
        }
      });
      
      if (error) {
        throw new Error(`Error uploading to Pinecone: ${error.message}`);
      }
      
      console.log("Upload result:", data);
      
      // Show success message
      setUploadResult({
        success: true,
        message: data.message || `Successfully uploaded ${data.processedCount} items to your knowledge base`
      });
      
      toast({
        title: "Upload successful",
        description: data.message || `Successfully uploaded to your knowledge base`
      });
      
    } catch (error) {
      console.error("Error uploading to knowledge base:", error);
      
      setUploadResult({
        success: false,
        message: error instanceof Error ? error.message : "Unknown error occurred"
      });
      
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload documents to knowledge base"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base Uploader</CardTitle>
          <CardDescription>
            Upload text documents (.txt) to your AI Voice Agent's knowledge base
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Model Prompt Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Model Prompt (Optional)</h3>
            <p className="text-sm text-gray-500 mb-2">
              This defines how your AI responds to queries. Add special instructions here.
            </p>
            <Textarea
              placeholder="Enter your model prompt here..."
              value={modelPrompt}
              onChange={(e) => setModelPrompt(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          
          {/* Document Upload Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Knowledge Documents</h3>
            <p className="text-sm text-gray-500 mb-2">
              Upload .txt files containing the knowledge your AI will reference
            </p>
            
            <div className="grid gap-4">
              {/* File Upload Button */}
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 border-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Text files only (.txt)
                  </p>
                </div>
                <Input 
                  id="file-upload" 
                  type="file" 
                  className="hidden" 
                  accept=".txt"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              
              {/* File List */}
              {files.length > 0 && (
                <div className="border rounded-lg p-4 mt-4">
                  <h4 className="font-medium mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Uploaded Documents ({files.length})
                  </h4>
                  <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {files.map(file => (
                      <li key={file.id} className="flex justify-between items-center p-2 rounded bg-gray-100 dark:bg-gray-800">
                        <span className="truncate max-w-[80%]" title={file.source}>{file.source}</span>
                        <button 
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Upload Result */}
          {uploadResult && (
            <div className={`p-4 rounded-lg ${uploadResult.success ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
              <div className="flex items-start">
                {uploadResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                )}
                <p className={`text-sm ${uploadResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                  {uploadResult.message}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={uploadToKnowledgeBase} 
            disabled={uploading || (files.length === 0 && !modelPrompt)}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              'Upload to Knowledge Base'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
