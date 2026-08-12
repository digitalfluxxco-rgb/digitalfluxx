export type FieldKind = "text" | "textarea" | "number" | "boolean" | "tags" | "select";

export type Field = {
  name: string;
  label: string;
  kind: FieldKind;
  options?: string[];
  help?: string;
};

export type Collection = {
  key: string;
  table: string;
  title: string;
  description: string;
  titleField: string;
  fields: Field[];
  defaults: Record<string, unknown>;
};

const enabledField: Field = { name: "enabled", label: "Visible on site", kind: "boolean" };
const sortField: Field = { name: "sort_order", label: "Order", kind: "number" };

export const COLLECTIONS: Collection[] = [
  {
    key: "services",
    table: "services",
    title: "Services",
    description: "The capability cards in the “What We Build” section.",
    titleField: "title",
    fields: [
      { name: "number_label", label: "Number", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "short_description", label: "Description", kind: "textarea" },
      { name: "tags", label: "Bullet items", kind: "tags" },
      { name: "cta_label", label: "CTA label", kind: "text" },
      { name: "telegram_message", label: "Telegram message", kind: "textarea" },
      { name: "whatsapp_message", label: "WhatsApp message", kind: "textarea" },
      { name: "featured", label: "Featured", kind: "boolean" },
      enabledField,
      sortField,
    ],
    defaults: { number_label: "", title: "", short_description: "", tags: [], enabled: true },
  },
  {
    key: "verticals",
    table: "verticals",
    title: "Verticals",
    description: "The markets shown in “The Verticals We Know”.",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", kind: "text" },
      { name: "description", label: "Description", kind: "textarea" },
      { name: "tags", label: "Tags", kind: "tags" },
      { name: "cta_label", label: "CTA label", kind: "text" },
      { name: "telegram_message", label: "Telegram message", kind: "textarea" },
      { name: "whatsapp_message", label: "WhatsApp message", kind: "textarea" },
      enabledField,
      sortField,
    ],
    defaults: { title: "", description: "", tags: [], enabled: true },
  },
  {
    key: "faqs",
    table: "faqs",
    title: "FAQs",
    description: "Questions and answers in the FAQ accordion.",
    titleField: "question",
    fields: [
      { name: "question", label: "Question", kind: "text" },
      { name: "answer", label: "Answer", kind: "textarea" },
      enabledField,
      sortField,
    ],
    defaults: { question: "", answer: "", enabled: true },
  },
  {
    key: "navigation_items",
    table: "navigation_items",
    title: "Navigation",
    description: "Header and footer links.",
    titleField: "label",
    fields: [
      { name: "label", label: "Label", kind: "text" },
      { name: "href", label: "Link", kind: "text" },
      {
        name: "location",
        label: "Placement",
        kind: "select",
        options: ["header", "footer"],
      },
      { name: "open_new_tab", label: "Open in new tab", kind: "boolean" },
      enabledField,
      sortField,
    ],
    defaults: { label: "", href: "", location: "header", enabled: true },
  },
  {
    key: "hero_metrics",
    table: "hero_metrics",
    title: "Hero metrics",
    description: "The four stat tiles under the hero copy.",
    titleField: "label",
    fields: [
      { name: "value", label: "Value", kind: "text" },
      { name: "label", label: "Label", kind: "text" },
      { name: "count_to", label: "Count up to", kind: "number" },
      { name: "prefix", label: "Prefix", kind: "text" },
      { name: "suffix", label: "Suffix", kind: "text" },
      { name: "animate", label: "Animate", kind: "boolean" },
      enabledField,
      sortField,
    ],
    defaults: { value: "", label: "", animate: false, enabled: true },
  },
  {
    key: "marquee_items",
    table: "marquee_items",
    title: "Marquee items",
    description: "The scrolling “Experience across” strip.",
    titleField: "label",
    fields: [{ name: "label", label: "Label", kind: "text" }, enabledField, sortField],
    defaults: { label: "", enabled: true },
  },
  {
    key: "process_steps",
    table: "process_steps",
    title: "Process steps",
    description: "Diagnose → Build → Validate → Scale.",
    titleField: "title",
    fields: [
      { name: "step_label", label: "Step number", kind: "text" },
      { name: "title", label: "Title", kind: "text" },
      { name: "lead", label: "Intro line", kind: "text" },
      { name: "items", label: "Bullet items", kind: "tags" },
      enabledField,
      sortField,
    ],
    defaults: { step_label: "", title: "", lead: "", items: [], enabled: true },
  },
  {
    key: "tech_categories",
    table: "tech_categories",
    title: "Operating stack",
    description: "Tooling groups in the infrastructure section.",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", kind: "text" },
      { name: "items", label: "Items", kind: "tags" },
      enabledField,
      sortField,
    ],
    defaults: { title: "", items: [], enabled: true },
  },
  {
    key: "ctas",
    table: "ctas",
    title: "Call-to-action buttons",
    description: "Reusable Telegram and WhatsApp buttons.",
    titleField: "name",
    fields: [
      { name: "name", label: "Internal name", kind: "text" },
      { name: "location", label: "Placement", kind: "text" },
      { name: "label", label: "Button label", kind: "text" },
      {
        name: "channel",
        label: "Channel",
        kind: "select",
        options: ["telegram", "whatsapp", "link"],
      },
      { name: "url", label: "Custom URL", kind: "text" },
      { name: "prefilled_message", label: "Prefilled message", kind: "textarea" },
      { name: "tracking_source", label: "Tracking source", kind: "text" },
      enabledField,
      sortField,
    ],
    defaults: { name: "", label: "", channel: "telegram", enabled: true },
  },
  {
    key: "homepage_sections",
    table: "homepage_sections",
    title: "Homepage sections",
    description: "Turn sections on or off and reorder them.",
    titleField: "label",
    fields: [
      { name: "section_key", label: "Key", kind: "text" },
      { name: "label", label: "Label", kind: "text" },
      enabledField,
      sortField,
    ],
    defaults: { section_key: "", label: "", enabled: true },
  },
];

export function findCollection(key: string) {
  return COLLECTIONS.find((c) => c.key === key);
}
