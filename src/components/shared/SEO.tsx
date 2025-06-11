import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  faqSchema?: object | { // Added for FAQPage JSON-LD schema
    additionalSchemas?: object[];
  };
}

export const SEO = ({ 
  title = "Custom AI Agents for SMBs | Automated AI Voice, Email, & SMS-Text",
  description = "Deploy AI agents for voice, email, and SMS to automate customer interactions, boost engagement, and accelerate business growth.",
  canonical = "https://powered-by.ai",
  faqSchema
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/assets/images/og-image.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="/assets/images/og-image.png" />

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="theme-color" content="#1a0b2e" />

      {/* JSON-LD Schema(s) */}
      {faqSchema && (
        'additionalSchemas' in faqSchema ? (
          <>
            <script type="application/ld+json">
              {JSON.stringify(faqSchema)}
            </script>
            {(faqSchema.additionalSchemas || []).map((schema, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(schema)}
              </script>
            ))}
          </>
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )
      )}

      {/* Microsoft Clarity Analytics */}
      {import.meta.env.VITE_CLARITY_ID && (
        <script type="text/javascript">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${import.meta.env.VITE_CLARITY_ID}");
          `}
        </script>
      )}
    </Helmet>
  );
};
