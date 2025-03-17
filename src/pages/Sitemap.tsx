
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

const Sitemap = () => {
  const [xmlContent, setXmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [customSitemap, setCustomSitemap] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the default XML sitemap
    fetchDefaultSitemap();
  }, []);

  const fetchDefaultSitemap = () => {
    setLoading(true);
    fetch("/sitemap.xml")
      .then(response => response.text())
      .then(data => {
        setXmlContent(data);
        setLoading(false);
        setCustomSitemap(false);
      })
      .catch(error => {
        console.error("Error fetching sitemap.xml:", error);
        setLoading(false);
      });
  };

  // Format the XML for display
  const formatXml = (xml: string) => {
    return xml
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&lt;(\/?[\w:-]+)&gt;/g, "<span class='text-[#9b87f5]'>&lt;$1&gt;</span>")
      .replace(/&lt;url&gt;/g, "<div class='ml-4 mt-2'>&lt;url&gt;")
      .replace(/&lt;\/url&gt;/g, "&lt;/url&gt;</div>")
      .replace(/&lt;(loc|lastmod|changefreq|priority)&gt;/g, "<div class='ml-8'>&lt;$1&gt;")
      .replace(/&lt;\/(loc|lastmod|changefreq|priority)&gt;/g, "&lt;/$1&gt;</div>");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's an XML file
    if (file.type !== "text/xml" && !file.name.endsWith('.xml')) {
      toast.error("Please upload an XML file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      // Basic validation that it's a sitemap XML
      if (!content.includes('<urlset') || !content.includes('</urlset>')) {
        toast.error("Invalid sitemap.xml format");
        return;
      }

      setXmlContent(content);
      setCustomSitemap(true);
      toast.success("Custom sitemap loaded successfully");
    };
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">XML Sitemap</h1>
        
        <div className="bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-white mb-2">
                {customSitemap 
                  ? "Viewing your custom sitemap" 
                  : "This XML sitemap is available for search engines at "}
                {!customSitemap && (
                  <a href="/sitemap.xml" className="text-[#9b87f5] hover:underline" target="_blank" rel="noopener noreferrer">
                    sitemap.xml
                  </a>
                )}
              </p>
              {customSitemap && (
                <button 
                  onClick={fetchDefaultSitemap}
                  className="text-[#9b87f5] hover:underline text-sm"
                >
                  Return to default sitemap
                </button>
              )}
            </div>
            
            <div className="relative group">
              <label 
                htmlFor="sitemap-upload" 
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#3a2a5e] hover:bg-[#4a3a6e] text-white cursor-pointer transition-all duration-300"
              >
                <UploadCloud size={18} />
                <span>Upload Sitemap</span>
              </label>
              <input 
                id="sitemap-upload" 
                type="file" 
                accept=".xml,text/xml" 
                className="hidden" 
                onChange={handleFileUpload}
              />
              <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-[#1a0b2e] text-white text-xs p-2 rounded whitespace-nowrap">
                Upload your sitemap.xml file
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 p-8 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9b87f5]"></div>
            </div>
          ) : (
            <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
              <div dangerouslySetInnerHTML={{ __html: formatXml(xmlContent) }} />
            </pre>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sitemap;
