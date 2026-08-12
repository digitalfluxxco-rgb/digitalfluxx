import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor } from "@/components/admin/collection-editor";
import type { Collection } from "@/lib/admin-collections";

export const Route = createFileRoute("/admin/media")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Media — Digitalfluxx CMS" },
      { name: "description", content: "Image URLs used across the site." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: MediaPage,
});

const collection: Collection = {
  key: "media_assets",
  table: "media_assets",
  title: "Media library",
  description: "Register image URLs here, then reference them in content fields.",
  titleField: "file_name",
  fields: [
    { name: "file_name", label: "Name", kind: "text" },
    { name: "public_url", label: "Image URL", kind: "text" },
    { name: "alt_text", label: "Alt text", kind: "text" },
    { name: "category", label: "Category", kind: "text" },
  ],
  defaults: { file_name: "", public_url: "", file_path: "external", category: "general" },
};

function MediaPage() {
  return (
    <AdminShell title="Media">
      <CollectionEditor collection={collection} />
    </AdminShell>
  );
}
