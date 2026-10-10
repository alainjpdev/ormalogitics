/**
 * Google Ads & Google Analytics Lead Tracking Utility
 * Google Tag ID: AW-18503883672
 */

export const GOOGLE_TAG_ID = 'AW-18503883672';

// Safely send event to gtag
export function sendGtagEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
      // Also log for local debugging
      console.log(`[Google Ads Tracking] Event fired: ${eventName}`, params);
    } catch (err) {
      console.warn('[Google Ads Tracking] Error sending event:', err);
    }
  }
}

// Track WhatsApp Click as Lead
export function trackWhatsAppClick(source = 'General', details = {}) {
  sendGtagEvent('generate_lead', {
    event_category: 'Lead',
    event_label: `WhatsApp - ${source}`,
    method: 'WhatsApp',
    value: 1.0,
    currency: 'MXN',
    ...details
  });

  // Google Ads conversion action
  sendGtagEvent('conversion', {
    send_to: GOOGLE_TAG_ID,
    event_category: 'Lead',
    event_label: `WhatsApp - ${source}`,
    value: 1.0,
    currency: 'MXN'
  });
}

// Track Phone Call Click as Contact Lead
export function trackPhoneClick(source = 'General') {
  sendGtagEvent('contact', {
    event_category: 'Lead',
    event_label: `Phone Call - ${source}`,
    method: 'Phone',
    value: 1.0,
    currency: 'MXN'
  });

  sendGtagEvent('conversion', {
    send_to: GOOGLE_TAG_ID,
    event_category: 'Lead',
    event_label: `Phone Call - ${source}`,
    value: 1.0,
    currency: 'MXN'
  });
}

// Track Quote Form Submission
export function trackQuoteSubmit(serviceName = 'General', details = {}) {
  sendGtagEvent('generate_lead', {
    event_category: 'Quote Form',
    event_label: `Quote - ${serviceName}`,
    service: serviceName,
    value: 20.0,
    currency: 'MXN',
    ...details
  });

  sendGtagEvent('conversion', {
    send_to: GOOGLE_TAG_ID,
    event_category: 'Quote Form',
    event_label: `Quote - ${serviceName}`,
    value: 20.0,
    currency: 'MXN'
  });
}

// Global click listener to track ANY WhatsApp or tel: click across the site automatically
let isInitialized = false;
export function initGlobalTracking() {
  if (typeof window === 'undefined' || isInitialized) return;
  isInitialized = true;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) {
      trackPhoneClick('Link');
    } else if (href.includes('whatsapp.com') || href.includes('wa.me')) {
      trackWhatsAppClick('Link');
    }
  }, { passive: true });
}
