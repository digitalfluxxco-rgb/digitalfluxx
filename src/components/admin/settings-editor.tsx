import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

type Group = { key: string; title: string; description: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = Record<string, any>;

const humanize = (key: string) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export function SettingsEditor({ groups }: { groups: Group[] }) {
  const [values, setValues] = useState<Record<string, Value>>({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await db
        .from("site_settings")
        .select("key, value")
        .in(
          "key",
          groups.map((g) => g.key),
        );
      const next: Record<string, Value> = {};
      for (const row of (data ?? []) as { key: string; value: Value }[]) {
        next[row.key] = row.value ?? {};
      }
      setValues(next);
      setLoading(false);
    })();
  }, [groups]);

  const save = async (key: string) => {
    setStatus("Saving…");
    const { error } = await db
      .from("site_settings")
      .update({ value: values[key] ?? {} })
      .eq("key", key);
    setStatus(error ? error.message : "Saved");
    if (!error) setTimeout(() => setStatus(""), 1500);
  };

  const base =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  if (loading) return <p className="text-sm text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-6">
      {status ? <p className="text-xs text-muted-foreground">{status}</p> : null}
      {groups.map((group) => {
        const value = values[group.key] ?? {};
        const entries = Object.entries(value);
        return (
          <section key={group.key} className="rounded-lg border border-border p-4">
            <h2 className="text-sm font-semibold">{group.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{group.description}</p>
            {entries.length === 0 ? (
              <p className="mt-3 text-xs text-muted-foreground">No fields configured.</p>
            ) : (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {entries.map(([field, fieldValue]) => {
                  const setField = (v: unknown) =>
                    setValues((prev) => ({
                      ...prev,
                      [group.key]: { ...(prev[group.key] ?? {}), [field]: v },
                    }));

                  if (typeof fieldValue === "boolean") {
                    return (
                      <label key={field} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          className="h-4 w-4 accent-primary"
                          checked={fieldValue}
                          onChange={(e) => setField(e.target.checked)}
                        />
                        {humanize(field)}
                      </label>
                    );
                  }

                  if (typeof fieldValue === "number") {
                    return (
                      <label key={field} className="block space-y-1.5">
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                          {humanize(field)}
                        </span>
                        <input
                          type="number"
                          className={base}
                          value={fieldValue}
                          onChange={(e) => setField(Number(e.target.value))}
                        />
                      </label>
                    );
                  }

                  if (Array.isArray(fieldValue) || (fieldValue && typeof fieldValue === "object")) {
                    return (
                      <label key={field} className="block space-y-1.5 md:col-span-2">
                        <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                          {humanize(field)}
                        </span>
                        <textarea
                          rows={4}
                          className={`${base} font-mono text-xs`}
                          defaultValue={JSON.stringify(fieldValue, null, 2)}
                          onChange={(e) => {
                            try {
                              setField(JSON.parse(e.target.value));
                            } catch {
                              /* keep last valid value until JSON is complete */
                            }
                          }}
                        />
                      </label>
                    );
                  }

                  const long = String(fieldValue ?? "").length > 70;
                  return (
                    <label
                      key={field}
                      className={`block space-y-1.5 ${long ? "md:col-span-2" : ""}`}
                    >
                      <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {humanize(field)}
                      </span>
                      {long ? (
                        <textarea
                          rows={3}
                          className={base}
                          value={String(fieldValue ?? "")}
                          onChange={(e) => setField(e.target.value)}
                        />
                      ) : (
                        <input
                          className={base}
                          value={String(fieldValue ?? "")}
                          onChange={(e) => setField(e.target.value)}
                        />
                      )}
                    </label>
                  );
                })}
              </div>
            )}
            <button
              type="button"
              onClick={() => save(group.key)}
              className="mt-4 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              Save {group.title.toLowerCase()}
            </button>
          </section>
        );
      })}
    </div>
  );
}
