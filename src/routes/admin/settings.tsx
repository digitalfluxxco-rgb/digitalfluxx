import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { SettingsEditor } from "@/components/admin/settings-editor";

export const Route = createFileRoute("/admin/settings")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Settings — Digitalfluxx CMS" },
      { name: "description", content: "SEO, tracking and notification settings." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AdminShell title="Settings">
      <SettingsEditor
        groups={[
          { key: "seo", title: "SEO", description: "Titles, descriptions and social preview." },
          { key: "tracking", title: "Tracking", description: "Pixel and analytics IDs." },
          {
            key: "notifications",
            title: "Lead notifications",
            description: "Telegram bot token and chat ID for new lead alerts.",
          },
        ]}
      />
    </AdminShell>
  );
}
