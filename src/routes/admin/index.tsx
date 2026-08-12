import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Overview — Digitalfluxx CMS" },
      { name: "description", content: "Content and lead overview for the Digitalfluxx site." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminOverview,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

function AdminOverview() {
  const [stats, setStats] = useState<{ label: string; value: number }[]>([]);
  const [recent, setRecent] = useState<
    { id: string; name: string; company: string; created_at: string; status: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      const tables = [
        ["Leads", "leads"],
        ["Services", "services"],
        ["Verticals", "verticals"],
        ["Case studies", "case_studies"],
        ["FAQs", "faqs"],
      ] as const;
      const counts = await Promise.all(
        tables.map(async ([label, table]) => {
          const { count } = await db.from(table).select("id", { count: "exact", head: true });
          return { label, value: count ?? 0 };
        }),
      );
      setStats(counts);

      const { data } = await db
        .from("leads")
        .select("id, name, company, created_at, status")
        .order("created_at", { ascending: false })
        .limit(5);
      setRecent(data ?? []);
    })();
  }, []);

  return (
    <AdminShell title="Overview">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-lg border border-border p-4">
            <p className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Latest leads</h2>
        <div className="mt-3 space-y-2">
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No leads yet.</p>
          ) : (
            recent.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border px-3 py-2.5 text-sm"
              >
                <span className="font-medium">
                  {lead.name} · {lead.company}
                </span>
                <span className="text-xs text-muted-foreground">
                  {lead.status} · {new Date(lead.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </AdminShell>
  );
}
