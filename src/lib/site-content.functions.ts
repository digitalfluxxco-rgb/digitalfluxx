import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();

  const [
    settings,
    navigation,
    heroMetrics,
    marquee,
    services,
    verticals,
    cases,
    caseMetrics,
    caseSteps,
    caseImages,
    processSteps,
    tech,
    faqs,
    questions,
    options,
    ctas,
    sections,
  ] = await Promise.all([
    sb.from("site_settings").select("key, value").eq("is_public", true),
    sb.from("navigation_items").select("*").eq("enabled", true).order("sort_order"),
    sb.from("hero_metrics").select("*").eq("enabled", true).order("sort_order"),
    sb.from("marquee_items").select("*").eq("enabled", true).order("sort_order"),
    sb.from("services").select("*").eq("enabled", true).order("sort_order"),
    sb.from("verticals").select("*").eq("enabled", true).order("sort_order"),
    sb.from("case_studies").select("*").eq("status", "published").order("sort_order"),
    sb.from("case_study_metrics").select("*").eq("enabled", true).order("sort_order"),
    sb.from("case_study_steps").select("*").eq("enabled", true).order("sort_order"),
    sb.from("case_study_images").select("*").eq("enabled", true).order("sort_order"),
    sb.from("process_steps").select("*").eq("enabled", true).order("sort_order"),
    sb.from("tech_categories").select("*").eq("enabled", true).order("sort_order"),
    sb.from("faqs").select("*").eq("enabled", true).order("sort_order"),
    sb.from("form_questions").select("*").eq("enabled", true).order("sort_order"),
    sb.from("form_options").select("*").eq("enabled", true).order("sort_order"),
    sb.from("ctas").select("*").eq("enabled", true).order("sort_order"),
    sb.from("homepage_sections").select("*").eq("enabled", true).order("sort_order"),
  ]);

  const settingsMap: Record<string, Json> = {};
  for (const row of settings.data ?? []) settingsMap[row.key] = row.value;

  return {
    settings: settingsMap,
    navigation: navigation.data ?? [],
    heroMetrics: heroMetrics.data ?? [],
    marquee: marquee.data ?? [],
    services: services.data ?? [],
    verticals: verticals.data ?? [],
    caseStudies: (cases.data ?? []).map((c) => ({
      ...c,
      metrics: (caseMetrics.data ?? []).filter((m) => m.case_study_id === c.id),
      steps: (caseSteps.data ?? []).filter((s) => s.case_study_id === c.id),
      images: (caseImages.data ?? []).filter((i) => i.case_study_id === c.id),
    })),
    processSteps: processSteps.data ?? [],
    techCategories: tech.data ?? [],
    faqs: faqs.data ?? [],
    formQuestions: (questions.data ?? []).map((q) => ({
      ...q,
      options: (options.data ?? []).filter((o) => o.question_id === q.id),
    })),
    ctas: ctas.data ?? [],
    sections: sections.data ?? [],
  };
});

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;
