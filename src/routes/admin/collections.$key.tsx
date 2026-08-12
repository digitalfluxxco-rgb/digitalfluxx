import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor } from "@/components/admin/collection-editor";
import { findCollection, COLLECTIONS } from "@/lib/admin-collections";

export const Route = createFileRoute("/admin/collections/$key")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Content collection — Digitalfluxx CMS" },
      { name: "description", content: "Edit reusable content collections." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { key } = Route.useParams();
  const collection = findCollection(key);

  if (!collection) {
    return (
      <AdminShell title="Unknown collection">
        <p className="text-sm text-muted-foreground">
          Available collections: {COLLECTIONS.map((c) => c.key).join(", ")}.
        </p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={collection.title}>
      <CollectionEditor collection={collection} />
    </AdminShell>
  );
}
