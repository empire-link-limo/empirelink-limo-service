'use client'

/**
 * Google Analytics event tracking utilities
 */

// Type-safe event names (customize for your business needs)
export type GAEventName = 
  | 'book_service'
  | 'contact_form_submit'
  | 'call_click'
  | 'quote_request'
  | 'service_selection'
  | 'vehicle_view'
  | 'newsletter_signup'
  | 'special_offer_click';

// Event parameters with TypeScript interface
export interface GAEventParams {
  // Common parameters
  event_category?: string;
  event_label?: string;
  value?: number;
  
  // Custom parameters
  [key: string]: any;
}

/**
 * Send an event to Google Analytics
 * 
 * @example
 * // Basic usage
 * trackEvent('book_service')
 * 
 * @example
 * // With parameters
 * trackEvent('service_selection', {
 *   event_category: 'airport_transfer',
 *   event_label: 'business_class',
 *   value: 1
 * })
 */
export function trackEvent(eventName: GAEventName, params?: GAEventParams): void {
  // Safety check for browser environment and GA initialization
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Send the event to GA
  window.gtag('event', eventName, params);
}

/**
 * Utility to track outbound link clicks
 */
export function trackOutboundLink(url: string, label?: string): void {
  trackEvent('click' as GAEventName, {
    event_category: 'outbound',
    event_label: label || url,
  });
}

// Add window interface augmentation for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      action: any,
      params?: any
    ) => void;
    dataLayer?: any[];
  }
}