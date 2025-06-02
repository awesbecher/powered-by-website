
/**
 * Utilities for working with API specifications and conversions
 */

/**
 * Attempts to parse a cURL command into structured data
 */
export function parseCurlCommand(curlCommand: string) {
  // This is a placeholder for actual implementation
  // In a real implementation, this would parse the cURL command and extract:
  // - HTTP method
  // - URL
  // - Headers
  // - Body data
  return {
    method: extractMethod(curlCommand),
    url: extractUrl(curlCommand),
    headers: extractHeaders(curlCommand),
    data: extractData(curlCommand)
  };
}

/**
 * Extracts the HTTP method from a cURL command
 */
function extractMethod(curlCommand: string): string {
  const methodMatch = curlCommand.match(/-X\s+([A-Z]+)/i);
  if (methodMatch && methodMatch[1]) {
    return methodMatch[1].toUpperCase();
  }
  return curlCommand.includes("-d") || curlCommand.includes("--data") ? "POST" : "GET";
}

/**
 * Extracts the URL from a cURL command
 */
function extractUrl(curlCommand: string): string {
  // This is a simplified version - a real parser would be more robust
  const urlMatch = curlCommand.match(/curl\s+(?:-X\s+[A-Z]+\s+)?["']?(https?:\/\/[^"'\s]+)["']?/i);
  return urlMatch ? urlMatch[1] : "";
}

/**
 * Extracts headers from a cURL command
 */
function extractHeaders(curlCommand: string): Record<string, string> {
  const headers: Record<string, string> = {};
  const headerMatches = curlCommand.matchAll(/-H\s+["']([^:]+):\s*([^'"]+)["']/gi);
  
  for (const match of headerMatches) {
    if (match[1] && match[2]) {
      headers[match[1].trim()] = match[2].trim();
    }
  }
  
  return headers;
}

/**
 * Extracts data payload from a cURL command
 */
function extractData(curlCommand: string): string {
  const dataMatch = curlCommand.match(/-d\s+['"](.+?)['"]/s);
  return dataMatch ? dataMatch[1] : "";
}

/**
 * Parse API endpoint URL to extract path parameters and query parameters
 */
export function parseApiUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
    const searchParams = Array.from(parsedUrl.searchParams.entries());
    
    return {
      baseUrl: `${parsedUrl.protocol}//${parsedUrl.host}`,
      path: parsedUrl.pathname,
      pathParts,
      queryParams: searchParams,
      hasApiKey: searchParams.some(([key]) => key.toLowerCase().includes('key') || key.toLowerCase() === 'apikey')
    };
  } catch (error) {
    console.error("Error parsing URL:", error);
    return null;
  }
}

/**
 * Validate if a string is a valid JSON
 */
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}
