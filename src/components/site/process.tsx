import { useSiteContent, asStringArray } from "@/lib/site-content";
import { Reveal, Eyebrow, Section, TelegramLink } from "./primitives";
import { TELEGRAM_MESSAGES } from "@/lib/lead-message";

const FUNNEL = [
  "Research",
  "Creative",
  "Paid Media",
  "Landing / Funnel",
  "Qualification",
  "CRM",
  "Sales",
  "Revenue Signal",
];

export function Process() {
  const { processSteps } = useSiteContent();
  const STEPS = processSteps.map((p) => ({
    n: p.step_label,
    title: p.title,
    lead: p.lead,
    items: asStringArray(p.items),
  }));

  return (
    <Section id="process" className="bg-surface/40">
      <Reveal>
        <Eyebrow>How We Operate</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Diagnose First. Scale Second.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          In restricted and high-compliance verticals, structure decides the outcome — campaign
          architecture, funnel logic, qualification and measurement before budget.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 70}>
            <div className="surface-card h-full bg-background p-6 hover:border-primary/40">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-primary">{s.n}</span>
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
              </div>
              <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground/70">
                {s.lead}
              </p>
              <ul className="mt-3 space-y-1.5">
                {s.items.map((it) => (
                  <li key={it} className="text-sm text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80}>
        <p className="mt-10 text-lg font-semibold sm:text-xl">
          Scale what works. Kill what does not.{" "}
          <span className="text-primary">Learn from both.</span>
        </p>
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-16 rounded-xl border border-border bg-background p-6 sm:p-9">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Full-Funnel System
          </h3>
          <ol className="mt-6 flex flex-wrap items-center gap-2">
            {FUNNEL.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={
                    i === FUNNEL.length - 1
                      ? "rounded-md border border-primary/50 bg-primary/10 px-3 py-2 text-[0.78rem] font-medium text-primary"
                      : "rounded-md border border-border bg-surface px-3 py-2 text-[0.78rem] font-medium"
                  }
                >
                  {step}
                </span>
                {i < FUNNEL.length - 1 && (
                  <span className="text-muted-foreground/50" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-5 flex items-center gap-3 text-[0.78rem] text-primary/80">
            <span aria-hidden="true">↺</span>
            <span className="hairline process-line h-px flex-1" aria-hidden="true" />
            <span>Revenue &amp; sales feedback returns to paid media</span>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            The algorithm should learn from business outcomes — not just clicks.
          </p>

          <div className="mt-8 border-t border-border pt-6">
            <TelegramLink source="process_cta" message={TELEGRAM_MESSAGES.attribution}>
              Fix My Attribution →
            </TelegramLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function TechStack() {
  const { techCategories } = useSiteContent();
  const STACK = techCategories.map((c) => ({ title: c.title, items: asStringArray(c.items) }));

  return (
    <Section>
      <Reveal>
        <Eyebrow>Operating Stack</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          The Infrastructure Behind the Ads
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((g, i) => (
          <Reveal key={g.title} delay={(i % 3) * 60}>
            <div className="h-full bg-background p-6">
              <h3 className="text-xs uppercase tracking-[0.16em] text-primary">{g.title}</h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="text-sm text-muted-foreground">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const GOOD = [
  "Forex / financial acquisition",
  "Affiliate lead operations",
  "iGaming / subscription funnels",
  "Multi-geo campaigns",
  "Brands spending enough to test properly",
  "Teams with downstream sales data",
  "Offers requiring custom funnel architecture",
  "Businesses that care about qualified conversions",
  "Operators entering difficult GEOs",
];

const BAD = [
  "Guaranteed-profit promises",
  "Fake ROAS claims",
  "No tracking access",
  "No willingness to test",
  "Pure vanity engagement campaigns",
  "Businesses expecting guaranteed platform approval",
];

export function FitSection() {
  return (
    <Section className="bg-surface/40">
      <Reveal>
        <Eyebrow>Fit</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Built For Performance-Driven Offers.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <div className="surface-card h-full bg-background p-7">
            <h3 className="text-lg font-semibold">Good Fit</h3>
            <ul className="mt-5 space-y-3">
              {GOOD.map((g) => (
                <li key={g} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-primary" aria-hidden="true">
                    ✓
                  </span>
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="surface-card h-full bg-background p-7">
            <h3 className="text-lg font-semibold">Probably Not a Fit</h3>
            <ul className="mt-5 space-y-3">
              {BAD.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-muted-foreground/50" aria-hidden="true">
                    ×
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
