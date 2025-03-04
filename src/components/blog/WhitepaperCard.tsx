
import React from "react";
import { FileText, Download } from "lucide-react";
import { Whitepaper } from "@/types/whitepaper";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface WhitepaperCardProps {
  whitepaper: Whitepaper;
}

export const WhitepaperCard = ({ whitepaper }: WhitepaperCardProps) => {
  const { toast } = useToast();
  
  const downloadWhitepaper = async () => {
    try {
      // Get the file URL
      const { data, error } = await supabase.storage
        .from('whitepapers')
        .createSignedUrl(whitepaper.file_path, 60); // 60 seconds expiry
      
      if (error) {
        throw error;
      }
      
      if (data?.signedUrl) {
        // Create a link element and click it to trigger download
        const link = document.createElement('a');
        link.href = data.signedUrl;
        link.download = whitepaper.filename || 'whitepaper.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Track download (optional)
        await supabase
          .from('whitepapers')
          .update({ downloads: (whitepaper.downloads || 0) + 1 })
          .eq('id', whitepaper.id);

        toast({
          title: "Download started",
          description: "Your whitepaper download has started",
        });
      }
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "There was a problem downloading this whitepaper. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  // Format the publication date
  const publishedDate = whitepaper.published_at ? 
    formatDistanceToNow(new Date(whitepaper.published_at), { addSuffix: true }) : 
    'Recently';
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="bg-purple-500/20 p-2 rounded-full">
            <FileText className="h-6 w-6 text-purple-400" />
          </div>
          <div className="text-xs text-gray-400">{publishedDate}</div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{whitepaper.title}</h3>
        
        {whitepaper.description && (
          <p className="text-gray-300 mb-4 line-clamp-3">{whitepaper.description}</p>
        )}
        
        <button
          onClick={downloadWhitepaper}
          className="mt-2 flex items-center text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md transition-colors w-full justify-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Download PDF
          {whitepaper.downloads > 0 && (
            <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {whitepaper.downloads} downloads
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
