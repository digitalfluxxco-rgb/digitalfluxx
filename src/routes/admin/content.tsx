import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsEditor } from "@/components/admin/settings-editor";
import { Link } from "@tanstack/react-router";
import { COLLECTIONS } from "@/lib/admin-collections";

export const Route = createFileRoute("/admin/content")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Page content — Digitalfluxx CMS" },
      { name: "description", content: "Edit the copy shown across the Digitalfluxx homepage." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ContentPage,
});

function ContentPage() {
  return (
    <AdminShell title="Page Content">
      <SettingsEditor
        groups={[
          { key: "brand", title: "Brand", description: "Site name, tagline and logo." },
          { key: "hero", title: "Hero", description: "Headline, sub-copy and buttons." },
          { key: "sections", title: "Section headings", description: "Eyebrows and intros." },
          { key: "contact", title: "Contact channels", description: "Telegram and WhatsApp." },
          { key: "footer", title: "Footer", description: "Footer copy and legal lines." },
        ]}
      />

      <section className="mt-8">
        <h2 className="text-sm font-semibold">Content collections</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.key}
              to="/admin/collections/$key"
              params={{ key: c.key }}
              className="rounded-lg border border-border p-3 text-sm hover:border-primary"
            >
              <span className="font-medium">{c.title}</span>
              <span className="mt-1 block text-xs text-muted-foreground">{c.description}</span>
            </Link>
          ))}
        </div>
      </section>
    </AdminShell>
  );
}
