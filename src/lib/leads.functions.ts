import { createServerFn } from "@tanstack/react-start";

export type LeadInput = {
  name: string;
  company: string;
  website?: string;
  vertical?: string[];
  services_needed?: string[];
  traffic_sources?: string[];
  monthly_spend?: string;
  main_issue?: string;
  target_geo?: string;
  message?: string;
  landing_url?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  fbclid?: string;
  ttclid?: string;
  scclid?: string;
  contact_destination?: string;
  source?: string;
};

function clean(value: string | undefined, max = 500) {
  return (value ?? "").toString().trim().slice(0, max);
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: LeadInput) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const row = {
      name: clean(data.name, 120),
      company: clean(data.company, 160),
      website: clean(data.website, 300),
      vertical: (data.vertical ?? []).slice(0, 20).map((v) => clean(v, 80)),
      services_needed: (data.services_needed ?? []).slice(0, 20).map((v) => clean(v, 80)),
      traffic_sources: (data.traffic_sources ?? []).slice(0, 20).map((v) => clean(v, 80)),
      monthly_spend: clean(data.monthly_spend, 80),
      main_issue: clean(data.main_issue, 160),
      target_geo: clean(data.target_geo, 160),
      message: clean(data.message, 4000),
      landing_url: clean(data.landing_url, 500),
      referrer: clean(data.referrer, 500),
      utm_source: clean(data.utm_source, 160),
      utm_medium: clean(data.utm_medium, 160),
      utm_campaign: clean(data.utm_campaign, 160),
      utm_content: clean(data.utm_content, 160),
      utm_term: clean(data.utm_term, 160),
      fbclid: clean(data.fbclid, 300),
      ttclid: clean(data.ttclid, 300),
      scclid: clean(data.scclid, 300),
      contact_destination: clean(data.contact_destination, 40) || "telegram",
      source: clean(data.source, 80) || "website",
    };

    if (!row.name || !row.company) {
      return { ok: false as const, error: "Name and company are required." };
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("leads")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("lead insert failed", error);
      return { ok: false as const, error: "Could not save your details." };
    }

    // Optional Telegram bot notification, configured in the admin panel.
    try {
      const { data: setting } = await supabaseAdmin
        .from("site_settings")
        .select("value")
        .eq("key", "notifications")
        .maybeSingle();

      const cfg = (setting?.value ?? {}) as {
        telegram_bot_token?: string;
        telegram_chat_id?: string;
        enabled?: boolean;
      };

      if (cfg.enabled !== false && cfg.telegram_bot_token && cfg.telegram_chat_id) {
        const text = [
          "New Digitalfluxx lead",
          `Name: ${row.name}`,
          `Brand: ${row.company}`,
          row.website ? `Website: ${row.website}` : "",
          row.vertical.length ? `Vertical: ${row.vertical.join(", ")}` : "",
          row.services_needed.length ? `Needs: ${row.services_needed.join(", ")}` : "",
          row.traffic_sources.length ? `Sources: ${row.traffic_sources.join(", ")}` : "",
          row.monthly_spend ? `Spend: ${row.monthly_spend}` : "",
          row.main_issue ? `Issue: ${row.main_issue}` : "",
          row.target_geo ? `GEO: ${row.target_geo}` : "",
          row.utm_source ? `UTM: ${row.utm_source} / ${row.utm_campaign}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        await fetch(`https://api.telegram.org/bot${cfg.telegram_bot_token}/sendMessage`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ chat_id: cfg.telegram_chat_id, text }),
        });
      }
    } catch (notifyError) {
      console.error("telegram notification failed", notifyError);
    }

    return { ok: true as const, id: inserted.id };
  });
