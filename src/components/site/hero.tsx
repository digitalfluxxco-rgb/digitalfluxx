import { Reveal, Eyebrow, TelegramLink, Marquee } from "./primitives";
import { QualifierCard } from "./qualifier";
import { TELEGRAM_MESSAGES } from "@/lib/lead-message";
import { CountUp } from "./metrics";
import { useSiteContent, useSettings } from "@/lib/site-content";

type HeroSettings = {
  eyebrow: string;
  headline_line_1: string;
  headline_line_2: string;
  kicker: string;
  description_primary: string;
  description_secondary: string;
  primary_cta_label: string;
  primary_cta_message: string;
  secondary_cta_label: string;
  marquee_title: string;
  form_enabled: boolean;
};

const HERO_FALLBACK: HeroSettings = {
  eyebrow: "Restricted Verticals \u00b7 Paid Acquisition \u00b7 Funnels \u00b7 Attribution",
  headline_line_1: "Performance Acquisition",
  headline_line_2: "For Markets That Aren\u2019t Easy.",
  kicker: "Forex. Affiliate. iGaming. Crypto. Subscriptions. Complex funnels. Multi-geo campaigns.",
  description_primary: "",
  description_secondary: "",
  primary_cta_label: "Discuss Your Campaign \u2192",
  primary_cta_message: "",
  secondary_cta_label: "View Case Studies \u2193",
  marquee_title: "Experience across",
  form_enabled: true,
};

const STATUS = ["Multi-Geo", "Lead Quality", "Attribution", "Conversion Feedback"];

export function Hero() {
  const { heroMetrics, marquee } = useSiteContent();
  const hero = useSettings<HeroSettings>("hero", HERO_FALLBACK);
  const METRICS = heroMetrics.map((m) => ({
    value: m.value,
    label: m.label,
    count: m.animate ? (m.count_to ?? undefined) : undefined,
    suffix: m.suffix,
  }));
  const EXPERIENCE = marquee.map((m) => m.label);

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-14 pt-24 sm:px-8 md:pb-16 md:pt-36"
    >
      <div
        aria-hidden="true"
        className="grid-bg hero-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]"
      />
      <div aria-hidden="true" className="hero-spotlight pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-scan pointer-events-none absolute inset-x-0 top-0" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-10 xl:grid-cols-[1.55fr_1fr]">
        <div>
          <div className="hero-line hero-line-1">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1 className="mt-6 text-[2.25rem] font-extrabold leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.9rem]">
            <span className="hero-line hero-line-2 block">{hero.headline_line_1}</span>
            <span className="hero-line hero-line-3 block text-primary">{hero.headline_line_2}</span>
          </h1>

          <p className="hero-line hero-line-4 mt-5 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-muted-foreground">
            {hero.kicker}
          </p>

          <div className="hero-line hero-line-5">
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.description_primary}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground/80">
              {hero.description_secondary}
            </p>
          </div>

          <div className="hero-line hero-line-6 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TelegramLink
              source="hero"
              message={hero.primary_cta_message || TELEGRAM_MESSAGES.hero}
              className="w-full sm:w-auto"
            >
              {hero.primary_cta_label}
            </TelegramLink>
            <a
              href="#case-studies"
              className="inline-flex w-full items-center justify-center rounded-md border border-border-strong px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 sm:w-auto"
            >
              {hero.secondary_cta_label}
            </a>
          </div>

          {/* Mobile: qualifier appears directly after the primary CTA, before metrics. */}
          <div className="mt-8 lg:hidden">
            <QualifierCard variant="hero" source="hero_qualifier" />
          </div>

          <div className="hero-line hero-line-7 mt-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
              Systems built for
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {STATUS.map((s, i) => (
                <li
                  key={s}
                  className="flex items-center gap-2 text-[0.78rem] text-muted-foreground"
                >
                  <span
                    className="status-dot h-1.5 w-1.5 rounded-full bg-primary"
                    style={{ animationDelay: `${i * 700}ms` }}
                    aria-hidden="true"
                  />
                  {s}
                </li>
              ))}
            </ul>

            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-4">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-surface px-4 py-5">
                  <dt className="text-xl font-bold tracking-tight sm:text-2xl">
                    {m.count ? <CountUp to={m.count} suffix={m.suffix ?? ""} /> : m.value}
                  </dt>
                  <dd className="mt-1.5 text-[0.75rem] leading-snug text-muted-foreground">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Desktop: dominant intake panel on the right. */}
        <div className="hero-line hero-line-form hidden lg:block">
          <div className="sticky top-24">
            <QualifierCard variant="hero" source="hero_qualifier" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-14 w-full max-w-6xl border-y border-border py-5">
        <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
          {hero.marquee_title}
        </p>
        <Marquee items={EXPERIENCE} />
      </div>
    </section>
  );
}
