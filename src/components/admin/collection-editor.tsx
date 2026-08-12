import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Collection, Field } from "@/lib/admin-collections";
import { cn } from "@/lib/utils";
import { Plus, Trash2, ChevronDown } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Row = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const db = supabase as any;

export function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (v: any) => void;
}) {
  const base =
    "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  if (field.kind === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-primary"
        />
        {field.label}
      </label>
    );
  }

  return (
    <label className="block space-y-1.5">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
        {field.label}
      </span>
      {field.kind === "textarea" ? (
        <textarea
          rows={3}
          className={base}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.kind === "select" ? (
        <select className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : field.kind === "number" ? (
        <input
          type="number"
          className={base}
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      ) : field.kind === "tags" ? (
        <textarea
          rows={3}
          className={base}
          value={Array.isArray(value) ? value.join("\n") : (value ?? "")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            )
          }
        />
      ) : (
        <input className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.kind === "tags" ? (
        <span className="block text-[0.7rem] text-muted-foreground">One item per line.</span>
      ) : null}
      {field.help ? (
        <span className="block text-[0.7rem] text-muted-foreground">{field.help}</span>
      ) : null}
    </label>
  );
}

export function CollectionEditor({ collection }: { collection: Collection }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useMemo(
    () => async () => {
      setLoading(true);
      const { data, error } = await db
        .from(collection.table)
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) setStatus(error.message);
      setRows((data ?? []) as Row[]);
      setLoading(false);
    },
    [collection.table],
  );

  useEffect(() => {
    void load();
  }, [load]);

  const update = (id: string, key: string, value: unknown) =>
    setRows((prev) => prev.map((r) => (r["id"] === id ? { ...r, [key]: value } : r)));

  const save = async (row: Row) => {
    setStatus("Saving…");
    const payload: Row = {};
    for (const f of collection.fields) payload[f.name] = row[f.name] ?? null;
    const { error } = await db.from(collection.table).update(payload).eq("id", row["id"]);
    setStatus(error ? error.message : "Saved");
    if (!error) setTimeout(() => setStatus(""), 1500);
  };

  const create = async () => {
    setStatus("Creating…");
    const next = {
      ...collection.defaults,
      sort_order: (rows[rows.length - 1]?.["sort_order"] ?? 0) + 1,
    };
    const { data, error } = await db.from(collection.table).insert(next).select("*").single();
    if (error) {
      setStatus(error.message);
      return;
    }
    setStatus("");
    setRows((prev) => [...prev, data as Row]);
    setOpenId((data as Row)["id"]);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this item permanently?")) return;
    const { error } = await db.from(collection.table).delete().eq("id", id);
    if (error) {
      setStatus(error.message);
      return;
    }
    setRows((prev) => prev.filter((r) => r["id"] !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-muted-foreground">{collection.description}</p>
        <div className="flex items-center gap-3">
          {status ? <span className="text-xs text-muted-foreground">{status}</span> : null}
          <button
            type="button"
            onClick={create}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> New item
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing here yet.</p>
      ) : (
        <div className="space-y-2">
          {rows.map((row) => {
            const open = openId === row["id"];
            return (
              <div key={row["id"]} className="rounded-lg border border-border">
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : row["id"])}
                    className="flex flex-1 items-center gap-2 text-left text-sm"
                  >
                    <ChevronDown
                      className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
                    />
                    <span className="truncate">{row[collection.titleField] || "Untitled"}</span>
                    {row["enabled"] === false ? (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
                        hidden
                      </span>
                    ) : null}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(row["id"])}
                    className="rounded p-1.5 text-muted-foreground hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                {open ? (
                  <div className="space-y-3 border-t border-border p-4">
                    {collection.fields.map((f) => (
                      <FieldInput
                        key={f.name}
                        field={f}
                        value={row[f.name]}
                        onChange={(v) => update(row["id"], f.name, v)}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => save(row)}
                      className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                    >
                      Save changes
                    </button>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
