import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
}

export const SEO = ({ 
  title = "Custom AI Agents for SMBs | Powered_by Agency",
  description = "Powered_by builds voice, chat & email AI agents that automate your SMB's customer interactions, cutting support costs by $50K+ a year.",
  canonical = "https://powered-by.ai"
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
    </Helmet>
  );
};
