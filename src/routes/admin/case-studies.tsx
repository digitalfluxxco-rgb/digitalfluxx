import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { CollectionEditor } from "@/components/admin/collection-editor";
import type { Collection } from "@/lib/admin-collections";

export const Route = createFileRoute("/admin/case-studies")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Case studies — Digitalfluxx CMS" },
      { name: "description", content: "Edit the proof-of-work case studies." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CaseStudiesPage,
});

const collection: Collection = {
  key: "case_studies",
  table: "case_studies",
  title: "Case studies",
  description: "Proof-of-work stories shown on the homepage.",
  titleField: "name",
  fields: [
    { name: "slug", label: "Slug", kind: "text" },
    { name: "name", label: "Internal name", kind: "text" },
    { name: "eyebrow", label: "Eyebrow", kind: "text" },
    { name: "title", label: "Title", kind: "text" },
    { name: "subtitle", label: "Subtitle", kind: "text" },
    { name: "summary", label: "Summary", kind: "textarea" },
    { name: "industry", label: "Industry", kind: "text" },
    { name: "channels", label: "Channels", kind: "text" },
    { name: "timeline", label: "Timeline", kind: "text" },
    { name: "geos", label: "GEOs", kind: "text" },
    { name: "challenge", label: "Challenge", kind: "textarea" },
    { name: "role", label: "Our role", kind: "textarea" },
    { name: "next_chapter", label: "Next chapter", kind: "textarea" },
    { name: "disclaimer", label: "Disclaimer", kind: "textarea" },
    { name: "tags", label: "Tags", kind: "tags" },
    { name: "cta_label", label: "CTA label", kind: "text" },
    { name: "telegram_message", label: "Telegram message", kind: "textarea" },
    { name: "group_key", label: "Group", kind: "text" },
    { name: "status", label: "Status", kind: "select", options: ["published", "draft"] },
    { name: "featured_on_homepage", label: "Featured on homepage", kind: "boolean" },
    { name: "sort_order", label: "Order", kind: "number" },
  ],
  defaults: { slug: "", name: "", title: "", status: "draft", tags: [] },
};

function CaseStudiesPage() {
  return (
    <AdminShell title="Case studies">
      <CollectionEditor collection={collection} />
    </AdminShell>
  );
}
