
/**
 * Utility functions for creating tracking URLs for various platforms
 */

/**
 * TikTok tracking parameters interface
 */
interface TikTokTrackingParams {
  campaign?: string;
  source?: string;
  medium?: string;
  content?: string;
}

/**
 * Creates a TikTok tracking URL for a specific page
 * 
 * @param baseUrl - The base URL to add tracking parameters to
 * @param params - The tracking parameters
 * @returns The complete tracking URL with parameters
 */
export const createTikTokTrackingUrl = (baseUrl: string, params: TikTokTrackingParams): string => {
  const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${window.location.host}${baseUrl}`);
  
  if (params.campaign) url.searchParams.set('ttcampaign', params.campaign);
  if (params.source) url.searchParams.set('ttsource', params.source);
  if (params.medium) url.searchParams.set('ttmedium', params.medium);
  if (params.content) url.searchParams.set('ttcontent', params.content);
  
  return url.toString();
};

/**
 * Example usage:
 * 
 * // Use in components
 * import { createTikTokTrackingUrl } from '@/utils/trackingUtils';
 * 
 * const trackedUrl = createTikTokTrackingUrl('/pricing', {
 *   campaign: 'spring_promo',
 *   source: 'email',
 *   medium: 'newsletter',
 *   content: 'pricing_button'
 * });
 * 
 * // Then use trackedUrl in links or redirects
 */
