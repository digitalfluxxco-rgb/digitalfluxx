import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SiteNav, StickyMobileCTA } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { HardVerticals, OptimizeFor, PerformanceSignals } from "@/components/site/insight";
import { Services, Verticals } from "@/components/site/services";
import { CaseStudies } from "@/components/site/case-studies";
import { Process, TechStack, FitSection } from "@/components/site/process";
import { Qualifier } from "@/components/site/qualifier";
import { TelegramCTA, FAQ, FinalCTA, SiteFooter } from "@/components/site/closing";
import { FloatingContactButtons } from "@/components/site/floating-contact";
import { SiteContentProvider, siteContentQuery } from "@/lib/site-content";
import { captureAttribution, track } from "@/lib/tracking";

const TITLE = "Digitalfluxx | Performance Acquisition for Forex, iGaming & Complex Verticals";
const DESCRIPTION =
  "Digitalfluxx builds paid acquisition, funnels, attribution and multi-geo growth systems for Forex, affiliate, FinTech, iGaming, crypto and other high-friction verticals.";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Digitalfluxx",
          description: DESCRIPTION,
          serviceType: "Performance acquisition for restricted and high-compliance verticals",
          areaServed: "Worldwide",
          sameAs: ["https://t.me/Gs_sells"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: content } = useSuspenseQuery(siteContentQuery);

  useEffect(() => {
    captureAttribution();
    track("PageView");
    let fired50 = false;
    let fired90 = false;
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      if (!fired50 && pct >= 50) {
        fired50 = true;
        track("Scroll50");
      }
      if (!fired90 && pct >= 90) {
        fired90 = true;
        track("Scroll90");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SiteContentProvider value={content}>
      <div className="min-h-screen bg-background">
        <SiteNav />
        <main>
          <Hero />
          <Verticals />
          <CaseStudies />
          <HardVerticals />
          <Services />
          <OptimizeFor />
          <Process />
          <TechStack />
          <PerformanceSignals />
          <FitSection />
          <Qualifier />
          <TelegramCTA />
          <FAQ />
          <FinalCTA />
        </main>
        <SiteFooter />
        <StickyMobileCTA />
        <FloatingContactButtons />
      </div>
    </SiteContentProvider>
  );
}
