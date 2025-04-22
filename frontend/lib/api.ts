// lib/api.ts
import qs from "qs";

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = ""): string {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

/**
 * Get full media URL from Strapi
 * @param {any} media Strapi media object
 * @returns {string | null} Full media URL or null if media is undefined
 */
export function getStrapiMedia(media: any): string {
  if (!media || !media.data || !media.data.attributes) {
    return "/placeholder.svg"; // Default fallback image
  }
  
  const { url } = media.data.attributes;
  return url.startsWith("/") ? getStrapiURL(url) : url;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns {Promise<any>} Parsed API call response
 */
export async function fetchAPI(
  path: string, 
  urlParamsObject: Record<string, any> = {}, 
  options: RequestInit = {}
): Promise<any> {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true, // prettify URL
  });
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occurred please try again`);
  }
  const data = await response.json();
  return data;
}