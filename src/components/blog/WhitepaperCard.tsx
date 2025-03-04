
import { useState } from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Whitepaper } from "@/types/whitepaper";
import { useToast } from "@/hooks/use-toast";

interface WhitepaperCardProps {
  whitepaper: Whitepaper;
  onDownload?: () => void;
}

export const WhitepaperCard = ({ whitepaper, onDownload }: WhitepaperCardProps) => {
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    try {
      setDownloading(true);
      
      // Get the public URL for the file
      const { data } = supabase
        .storage
        .from('whitepapers')
        .getPublicUrl(whitepaper.file_path);
      
      if (!data.publicUrl) {
        throw new Error("Failed to get download URL");
      }

      // Create an anchor element and trigger the download
      const link = document.createElement('a');
      link.href = data.publicUrl;
      link.download = whitepaper.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Optional: increment the download counter
      if (onDownload) {
        onDownload();
      }
      
      toast({
        title: "Download started",
        description: `Downloading ${whitepaper.filename}`
      });
      
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: error instanceof Error ? error.message : "Failed to download the whitepaper",
        variant: "destructive"
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-lg">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{whitepaper.title}</h3>
          {whitepaper.description && (
            <p className="text-white/70 text-sm mb-4">{whitepaper.description}</p>
          )}
          <div className="flex items-center text-xs text-white/60 mb-4">
            <span>Published: {new Date(whitepaper.published_at).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{whitepaper.downloads} downloads</span>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDownload}
              disabled={downloading}
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              {downloading ? "Downloading..." : "Download"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/20 hover:bg-white/10 hover:text-white"
              asChild
            >
              <a 
                href={supabase.storage.from('whitepapers').getPublicUrl(whitepaper.file_path).data.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
