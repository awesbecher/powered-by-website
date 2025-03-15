
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Sitemap = () => {
  const [xmlContent, setXmlContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the XML sitemap
    fetch("/sitemap.xml")
      .then(response => response.text())
      .then(data => {
        setXmlContent(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching sitemap.xml:", error);
        setLoading(false);
      });
  }, []);

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1a0b2e] via-[#2f1c4a] to-[#1a0b2e]">
      <div className="sticky top-0 z-50 w-full">
        <Navbar />
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-white mb-8">XML Sitemap</h1>
        
        <div className="bg-gradient-to-r from-[#2a1a47]/50 to-[#1a0b2e]/50 rounded-xl border border-[#9b87f5]/20 p-8 mb-8">
          <p className="text-white mb-4">
            This XML sitemap is available for search engines at <a href="/sitemap.xml" className="text-[#9b87f5] hover:underline" target="_blank" rel="noopener noreferrer">sitemap.xml</a>
          </p>
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
