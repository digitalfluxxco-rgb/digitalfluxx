import { createContext, useContext, type ReactNode } from "react";
import { queryOptions } from "@tanstack/react-query";
import { getSiteContent, type SiteContent } from "./site-content.functions";

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
});

const SiteContentContext = createContext<SiteContent | null>(null);

export function SiteContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: ReactNode;
}) {
  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContent {
  const ctx = useContext(SiteContentContext);
  if (!ctx) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return ctx;
}

/** Read a settings group (brand, contact, hero, form, footer, seo, tracking, design). */
export function useSettings<T = Record<string, unknown>>(group: string, fallback: T): T {
  const { settings } = useSiteContent();
  const value = settings[group];
  if (!value || typeof value !== "object") return fallback;
  return { ...fallback, ...(value as Record<string, unknown>) } as T;
}

export function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}
