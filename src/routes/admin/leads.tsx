import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/leads")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Leads — Digitalfluxx CMS" },
      { name: "description", content: "Every enquiry submitted through the qualifier form." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadsPage,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Lead = Record<string, any>;

const STATUSES = ["new", "contacted", "qualified", "won", "lost"];

const list = (value: unknown) => (Array.isArray(value) ? value.join(", ") : String(value ?? ""));

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await db
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      setLeads((data ?? []) as Lead[]);
    })();
  }, []);

  const patch = async (id: string, values: Lead) => {
    setStatus("Saving…");
    const { error } = await db.from("leads").update(values).eq("id", id);
    setStatus(error ? error.message : "Saved");
    if (!error) {
      setLeads((prev) => prev.map((l) => (l["id"] === id ? { ...l, ...values } : l)));
      setTimeout(() => setStatus(""), 1200);
    }
  };

  const exportCsv = () => {
    const cols = [
      "created_at",
      "name",
      "company",
      "website",
      "vertical",
      "services_needed",
      "traffic_sources",
      "monthly_spend",
      "main_issue",
      "target_geo",
      "status",
      "utm_source",
      "utm_campaign",
    ];
    const rows = [cols.join(",")].concat(
      visible.map((l) =>
        cols
          .map((c) => `"${list(l[c]).replace(/"/g, '""')}"`)
          .join(","),
      ),
    );
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "digitalfluxx-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const visible = filter === "all" ? leads : leads.filter((l) => l["status"] === filter);

  return (
    <AdminShell title="Leads">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setFilter(s)}
              className={cn(
                "rounded-md border border-border px-2.5 py-1.5 text-xs capitalize",
                filter === s ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {status ? <span className="text-xs text-muted-foreground">{status}</span> : null}
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">No leads in this view.</p>
        ) : (
          visible.map((lead) => {
            const open = openId === lead["id"];
            return (
              <div key={lead["id"]} className="rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : lead["id"])}
                  className="flex w-full flex-wrap items-center gap-2 px-3 py-2.5 text-left text-sm"
                >
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
                  />
                  <span className="font-medium">
                    {lead["name"]} · {lead["company"]}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {lead["status"]} · {new Date(lead["created_at"]).toLocaleString()}
                  </span>
                </button>
                {open ? (
                  <div className="space-y-3 border-t border-border p-4 text-sm">
                    <dl className="grid gap-2 sm:grid-cols-2">
                      {[
                        ["Website", lead["website"]],
                        ["Vertical", list(lead["vertical"])],
                        ["Needs", list(lead["services_needed"])],
                        ["Traffic sources", list(lead["traffic_sources"])],
                        ["Monthly spend", list(lead["monthly_spend"])],
                        ["Main issue", list(lead["main_issue"])],
                        ["Target GEO", lead["target_geo"]],
                        ["Destination", lead["contact_destination"]],
                        ["Source", lead["source"]],
                        ["Landing page", lead["landing_url"]],
                        ["Referrer", lead["referrer"]],
                        ["UTM source", lead["utm_source"]],
                        ["UTM campaign", lead["utm_campaign"]],
                      ].map(([label, value]) => (
                        <div key={String(label)}>
                          <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                            {label}
                          </dt>
                          <dd className="break-words">{String(value || "—")}</dd>
                        </div>
                      ))}
                    </dl>
                    {lead["message"] ? (
                      <pre className="whitespace-pre-wrap rounded-md bg-muted p-3 text-xs">
                        {lead["message"]}
                      </pre>
                    ) : null}
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        className="rounded-md border border-border bg-background px-2.5 py-1.5 text-sm"
                        value={lead["status"] ?? "new"}
                        onChange={(e) => patch(lead["id"], { status: e.target.value })}
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <input
                        placeholder="Internal note"
                        defaultValue={lead["notes"] ?? ""}
                        onBlur={(e) => patch(lead["id"], { notes: e.target.value })}
                        className="min-w-[12rem] flex-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </AdminShell>
  );
}
