/**
 * Analytics event layer + Telegram deep-link helpers.
 *
 * Tag placeholders (GTM / GA4 / Meta Pixel + CAPI / TikTok / Snapchat) are
 * intentionally NOT installed with real IDs. Add the container snippets in
 * src/routes/__root.tsx and map the event names below to your pixels.
 *
 * Event map (name -> suggested platform event):
 *   PageView              -> PageView
 *   ViewCaseStudy         -> ViewContent
 *   ServiceView           -> ViewContent
 *   QualificationStarted  -> InitiateCheckout / Lead step
 *   QualificationCompleted-> Lead (send server-side via Meta CAPI)
 *   TelegramClick         -> Contact
 *   PrimaryCTAClick       -> Lead intent
 *   Scroll50 / Scroll90   -> engagement
 */
export type TrackEvent =
  | "PageView"
  | "ViewCaseStudy"
  | "ServiceView"
  | "QualificationStarted"
  | "QualificationCompleted"
  | "TelegramClick"
  | "WhatsAppClick"
  | "LeadSubmitted"
  | "PrimaryCTAClick"
  | "Scroll50"
  | "Scroll90";


type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (name: string, data?: Payload) => void };
    snaptr?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export const TELEGRAM_USERNAME = "Gs_sells";
export const TELEGRAM_BASE_URL = `https://t.me/${TELEGRAM_USERNAME}`;
/** Kept for backwards compatibility with existing imports. */
export const TELEGRAM_URL = TELEGRAM_BASE_URL;
export const TELEGRAM_HANDLE = `@${TELEGRAM_USERNAME}`;

/** Single source of truth for Telegram deep links. Always encodes the message. */
export function buildTelegramUrl(message?: string) {
  if (!message?.trim()) return TELEGRAM_BASE_URL;
  return `${TELEGRAM_BASE_URL}?text=${encodeURIComponent(message.trim())}`;
}

export function track(event: TrackEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  const data = { event, ...payload };

  // Google Tag Manager (placeholder container — GTM-XXXXXXX)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);

  // GA4 (placeholder measurement id — G-XXXXXXXXXX)
  window.gtag?.("event", event, payload);
  // Meta Pixel (placeholder pixel id) — mirror to CAPI server-side
  window.fbq?.("trackCustom", event, payload);
  // TikTok Pixel (placeholder)
  window.ttq?.track(event, payload);
  // Snapchat Pixel (placeholder)
  window.snaptr?.("track", event, payload);
}

/** Fires TelegramClick + PrimaryCTAClick, then lets the browser open Telegram. */
export function trackTelegram(
  source: string,
  extra: { vertical?: string | undefined; cta_label?: string | undefined } = {},
) {
  const attribution = getAttribution();
  const payload: Payload = {
    source,
    ...(extra.vertical ? { vertical: extra.vertical } : {}),
    ...(extra.cta_label ? { cta_label: extra.cta_label } : {}),
    ...(attribution.utm_source ? { utm_source: attribution.utm_source } : {}),
    ...(attribution.utm_campaign ? { utm_campaign: attribution.utm_campaign } : {}),
  };
  track("TelegramClick", payload);
  track("PrimaryCTAClick", payload);
}

/* ------------------------------------------------------------------ *
 * Campaign attribution capture (sessionStorage, first landing only)
 * ------------------------------------------------------------------ */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "ttclid",
  "ScCid",
] as const;

export type Attribution = Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>;

const STORAGE_KEY = "dfx_attribution";

/** Call once on landing. Stores campaign params for the session. */
export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    const stored: Attribution = existing ? JSON.parse(existing) : {};
    const params = new URLSearchParams(window.location.search);
    let changed = false;
    for (const key of ATTRIBUTION_KEYS) {
      const value = params.get(key);
      if (value && !stored[key]) {
        stored[key] = value;
        changed = true;
      }
    }
    if (changed || !existing) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    return stored;
  } catch {
    return {};
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}
