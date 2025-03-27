
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface OmegaVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoUrl: string;
}

const OmegaVideoDialog: React.FC<OmegaVideoDialogProps> = ({
  open,
  onOpenChange,
  videoUrl
}) => {
  // Format Vimeo URL for embedding
  const getEmbedUrl = (url: string) => {
    // If it's already an embed URL, return it
    if (url.includes('player.vimeo.com')) return url;
    
    // Extract the video ID from the URL
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const match = url.match(vimeoRegex);
    
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
    }
    
    // If we can't parse it, return the original URL
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-1 bg-black border-purple-500" closeButton={true}>
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Stella's Digital Avatar"
            className="rounded-sm"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OmegaVideoDialog;
