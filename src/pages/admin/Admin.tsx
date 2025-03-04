
import { useEffect, useState } from "react";
import { WhitepaperUploadForm } from "@/components/blog/WhitepaperUploadForm";
import { SectionTitle } from "@/components/home/SectionTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const Admin = () => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const handleUploadSuccess = () => {
    // You could add additional logic here if needed
    console.log("Upload was successful");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e] pb-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-36">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            className="mb-6 text-white border-white/20 hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <SectionTitle title="Whitepaper Administration" />
          
          <p 
            className={`mt-4 text-lg text-gray-300 max-w-3xl mx-auto text-center transition-all duration-1000 ease-out transform
              ${initialLoad ? 'opacity-0' : 'opacity-100'}`}
          >
            Use the form below to upload new whitepapers. All uploaded whitepapers will be available in the Blog section.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <WhitepaperUploadForm onSuccess={handleUploadSuccess} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
