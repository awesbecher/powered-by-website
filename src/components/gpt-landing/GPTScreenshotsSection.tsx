import React from 'react';
import { Button } from "@/components/ui/button";
import { processImage } from '@/utils/imageProcessor';

interface GPTScreenshotsSectionProps {
  initialLoad: boolean;
}

export const GPTScreenshotsSection: React.FC<GPTScreenshotsSectionProps> = ({ initialLoad }) => {
  const [processedImage1, setProcessedImage1] = React.useState<string | null>(null);
  const [processedImage2, setProcessedImage2] = React.useState<string | null>(null);
  const [loadingImage1, setLoadingImage1] = React.useState(false);
  const [loadingImage2, setLoadingImage2] = React.useState(false);

  React.useEffect(() => {
    const loadImageAndProcess = async (imageUrl: string, setImage: (url: string | null) => void, setLoading: (loading: boolean) => void) => {
      setLoading(true);
      try {
        const result = await processImage(imageUrl);
        if (result.success) {
          // Assuming processImage returns a data URL or a URL to the processed image
          setImage(imageUrl); // Use the original image URL for now
        } else {
          console.error('Image processing failed:', result.message);
          setImage(null);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        setImage(null);
      } finally {
        setLoading(false);
      }
    };

    loadImageAndProcess("/assets/images/0199a99b-199a-4495-a99a-99a9a9a9a9a9.png", setProcessedImage1, setLoadingImage1);
    loadImageAndProcess("/assets/images/0288b88c-288b-4678-b88c-8c8c8c8c8c8c.png", setProcessedImage2, setLoadingImage2);
  }, []);

  return (
    <section className="py-16 px-4">
      <h2 className={`text-3xl sm:text-4xl font-bold text-white text-center mb-12 transition-all duration-1000 ease-out transform delay-400 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        See What You Can Build
      </h2>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ease-out transform delay-500 ${
        initialLoad ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
      }`}>
        {/* First Image */}
        <div className="relative">
          {loadingImage1 ? (
            <div className="absolute inset-0 bg-gray-800/50 rounded-xl flex items-center justify-center">
              <span className="text-white">Loading...</span>
            </div>
          ) : null}
          {processedImage1 ? (
            <img
              src={processedImage1}
              alt="Screenshot 1"
              className="rounded-xl shadow-lg"
            />
          ) : (
            <div className="bg-gray-800 rounded-xl p-20 text-center">
              <span className="text-white">Failed to load image</span>
            </div>
          )}
        </div>

        {/* Second Image */}
        <div className="relative">
          {loadingImage2 ? (
            <div className="absolute inset-0 bg-gray-800/50 rounded-xl flex items-center justify-center">
              <span className="text-white">Loading...</span>
            </div>
          ) : null}
          {processedImage2 ? (
            <img
              src={processedImage2}
              alt="Screenshot 2"
              className="rounded-xl shadow-lg"
            />
          ) : (
            <div className="bg-gray-800 rounded-xl p-20 text-center">
              <span className="text-white">Failed to load image</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
