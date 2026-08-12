import { getAttribution } from "./tracking";

export type LeadData = {
  vertical: string[];
  needs: string[];
  channels: string[];
  spend: string[];
  issue: string[];
  name: string;
  company: string;
  website: string;
  geo: string;
};

function block(label: string, values: string[]) {
  const clean = values.filter(Boolean);
  if (!clean.length) return [];
  return [label, ...clean, ""];
}

/**
 * Plain-text Telegram draft built from the qualifier answers.
 * Plain text only — Telegram composer does not render markdown here.
 */
export function buildLeadMessage(data: LeadData): string {
  const attribution = getAttribution();
  const sourceParts = [
    attribution.utm_source,
    attribution.utm_campaign,
    attribution.utm_content,
  ].filter(Boolean);

  const lines: string[] = [
    "Hello Digitalfluxx,",
    "",
    "I want to discuss an acquisition project.",
    "",
    ...block("VERTICAL", data.vertical),
    ...block("SERVICES NEEDED", data.needs),
    ...block("TRAFFIC SOURCES", data.channels),
    ...block("MONTHLY SPEND", data.spend),
    ...block("MAIN ISSUE", data.issue),
    ...block("TARGET GEO", [data.geo.trim()]),
    ...block("BRAND", [data.company.trim()]),
    ...block("WEBSITE", [data.website.trim()]),
    ...block("NAME", [data.name.trim()]),
    ...block("SOURCE", [sourceParts.join(" / ")]),
    "Can you review the setup and tell me what you would change?",
  ];

  return lines.join("\n");
}

/** Contextual prefilled drafts for section-level CTAs. */
export const TELEGRAM_MESSAGES = {
  generic: `Hello Digitalfluxx,

I came through your website and want to discuss an acquisition project.

Vertical:
GEO:
Current Spend:
Main Goal:`,
  hero: `Hello Digitalfluxx,

I came through your acquisition funnel and want to discuss a campaign.

Vertical:
Target GEO:
Current Monthly Spend:
Main Problem:

Can you review the opportunity with me?`,
  forex: `Hello Digitalfluxx,

I want to discuss a Forex acquisition project.

Type: Broker / Affiliate / Signals / Prop
Target GEO:
Current Spend:
Current CPL:
Current Qualified Lead / FTD Rate:

I would like you to review our current acquisition setup.`,
  igaming: `Hello Digitalfluxx,

I want to discuss a Casino / iGaming acquisition project.

Model: Operator / Affiliate / Subscription
Target GEO:
Traffic Source:
Current Spend:
Primary KPI:

Can you review the funnel and traffic strategy?`,
  crypto: `Hello Digitalfluxx,

I want to discuss a crypto acquisition campaign.

Product:
Target GEO:
Traffic Source:
Monthly Spend:
Primary Conversion Goal:

Can you review the acquisition setup?`,
  subscription: `Hello Digitalfluxx,

I want to discuss acquisition for a subscription-based offer.

Category:
Target GEO:
Traffic Source:
Current Spend:
Current CPA / Conversion Rate:

I would like to discuss the funnel and acquisition approach.`,
  affiliate: `Hello Digitalfluxx,

I want to discuss affiliate acquisition and lead quality.

Model: Forex affiliate / Casino affiliate / Other
Target GEO:
Traffic Source:
Current Volume:
Current Accepted / Qualified Lead Rate:

Can you review the routing and attribution setup?`,
  funnel: `Hello Digitalfluxx,

I would like you to review my funnel.

Vertical:
Funnel URL:
Traffic Source:
Current Conversion Rate:
Main Drop-Off Point:`,
  attribution: `Hello Digitalfluxx,

I have an attribution problem I want reviewed.

Vertical:
Platforms:
CRM:
What is currently tracked:
What is missing (Qualified Lead / FTD / Subscription):`,
  geo: `Hello Digitalfluxx,

I want to discuss expanding into new GEOs.

Vertical:
Current GEOs:
Target GEOs:
Current Spend:
Main Concern:`,
  creative: `Hello Digitalfluxx,

I want to build a structured creative testing system.

Vertical:
Traffic Source:
Current Creative Formats:
Monthly Spend:
Main Problem:`,
  nordic: `Hello Digitalfluxx,

I want to discuss Nordic / Swedish acquisition.

Vertical:
Target GEO:
Current Spend:
Current CPL:
Lead Quality Situation:`,
  snapchat: `Hello Digitalfluxx,

I want to discuss Snapchat acquisition.

Offer / Model:
Target GEOs:
Current Spend:
Primary Conversion Event:
Current CPA:`,
  fintech: `Hello Digitalfluxx,

I want to discuss B2B FinTech / payments acquisition.

Product:
Target Markets:
Channels:
Current Spend:
Pipeline Goal:`,
  numbers: `Hello Digitalfluxx,

Here are my current numbers and I would like a review.

Vertical:
GEO:
Traffic Source:
Monthly Spend:
CPL / CPA:
Qualified Lead / FTD / Subscription Rate:`,
} as const;

export type TelegramMessageKey = keyof typeof TELEGRAM_MESSAGES;
