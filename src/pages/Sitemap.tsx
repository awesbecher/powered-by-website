
import React from "react";

const Sitemap = () => {
  // The sitemap XML content as provided
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- Homepage -->
    <url>
        <loc>https://poweredby.agency/</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/ai-agency</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/products</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/demo</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <!-- Note: This URL is hosted on a separate domain.
         If you want it indexed as part of your main site's sitemap,
         you can include it below, though it's not always common to do so. -->
    <url>
        <loc>https://poweredbyagency.ghost.io/</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/about</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/contact</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/voice-chat</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/ai-receptionist</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/email-agent</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/text-agent</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/virtual-se</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    
    <url>
        <loc>https://poweredby.agency/outbound-ai</loc>
        <lastmod>2025-03-16</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>

</urlset>`;

  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">XML Sitemap</h1>
        <div className="border border-gray-300 rounded-md p-6 overflow-auto">
          <pre className="text-gray-600 whitespace-pre-wrap font-mono text-sm">
            {sitemapXml}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
