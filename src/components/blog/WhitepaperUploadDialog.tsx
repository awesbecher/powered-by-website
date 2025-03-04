
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileUp, X, File as FileIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WhitepaperUploadDialog = ({ onUploadSuccess }: { onUploadSuccess: () => void }) => {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Only PDF files are allowed",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload",
        variant: "destructive"
      });
      return;
    }

    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please provide a title for the whitepaper",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("description", description);

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-whitepaper`, {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to upload whitepaper");
      }
      
      toast({
        title: "Upload successful",
        description: "Your whitepaper has been uploaded"
      });

      // Reset form
      setFile(null);
      setTitle("");
      setDescription("");
      setOpen(false);
      
      // Callback to refresh the whitepaper list
      onUploadSuccess();
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="gradient" className="mt-4">
          <Upload className="mr-2 h-4 w-4" />
          Upload Whitepaper
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Whitepaper</DialogTitle>
          <DialogDescription>
            Upload a PDF whitepaper to share with your audience.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter whitepaper title"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Enter a brief description (optional)"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium">
              PDF File
            </label>
            <div className="col-span-3">
              {!file ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 dark:border-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FileUp className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF only</p>
                  </div>
                  <input 
                    type="file" 
                    accept=".pdf,application/pdf" 
                    className="hidden" 
                    onChange={handleFileChange} 
                  />
                </label>
              ) : (
                <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <FileIcon className="w-8 h-8 mr-3 text-gray-500 dark:text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={uploading || !file || !title.trim()}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
