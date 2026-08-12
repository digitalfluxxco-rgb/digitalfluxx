import { Reveal, Eyebrow, Section, TelegramLink } from "./primitives";
import { TELEGRAM_MESSAGES } from "@/lib/lead-message";

const FLOW = [
  "Creative",
  "Traffic",
  "Pre-Lander",
  "Qualification",
  "Tracking",
  "CRM",
  "Sales / FTD / Subscription",
];

export function HardVerticals() {
  return (
    <Section id="why-hard" className="bg-surface/40">
      <Reveal>
        <Eyebrow>The Real Problem</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          Difficult Markets Don&rsquo;t Fail For <span className="text-primary">One Reason.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          In high-friction verticals the break can sit anywhere along the path. Diagnosing one stage
          in isolation usually moves the problem instead of solving it.
        </p>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12 rounded-xl border border-border bg-background p-6 sm:p-9">
          <ol className="flex flex-wrap items-center gap-2">
            {FLOW.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <span
                  className={
                    i === FLOW.length - 1
                      ? "flow-node rounded-md border border-primary/50 bg-primary/10 px-3 py-2 text-[0.78rem] font-medium text-primary"
                      : "flow-node rounded-md border border-border bg-surface px-3 py-2 text-[0.78rem] font-medium"
                  }
                >
                  {step}
                </span>
                {i < FLOW.length - 1 && (
                  <span className="text-muted-foreground/50" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface/60 p-5">
              <p className="text-base font-semibold leading-relaxed">
                If the platform only sees the first conversion event, it can optimize for the wrong
                customer.
              </p>
            </div>
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
              <p className="text-base font-semibold leading-relaxed">
                The acquisition system needs feedback from further down the funnel.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 text-[0.78rem] text-primary/80">
            <span aria-hidden="true">↺</span>
            <span className="hairline h-px flex-1" aria-hidden="true" />
            <span>Qualified lead, FTD and subscription signals return to the ad platform</span>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

const WEAK = ["Clicks", "CTR", "Cheap leads", "Form fills"];
const STRONG = [
  "Qualified Leads",
  "FTDs",
  "Subscriptions",
  "Accepted Leads",
  "Bookings",
  "Pipeline",
  "Revenue Events",
];

export function OptimizeFor() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>What We Optimize For</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Cheap Traffic Isn&rsquo;t <span className="text-primary">the Goal.</span>
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The goal is making paid traffic produce a downstream action that matters commercially.
        </p>
      </Reveal>

      <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <Reveal>
          <div className="surface-card h-full p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Weak optimization
            </h3>
            <ul className="mt-5 space-y-3">
              {WEAK.map((w) => (
                <li key={w} className="flex gap-3 text-sm text-muted-foreground">
                  <span className="text-muted-foreground/40" aria-hidden="true">
                    ×
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">vs</span>
        </div>
        <Reveal delay={80}>
          <div className="surface-card h-full border-primary/30 bg-primary/[0.04] p-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
              Business optimization
            </h3>
            <ul className="mt-5 space-y-3">
              {STRONG.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-foreground">
                  <span className="text-primary" aria-hidden="true">
                    ✓
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const SIGNALS = [
  { value: "54", label: "simultaneous Forex campaigns" },
  { value: "4", label: "GEOs in one acquisition operation" },
  { value: "12", label: "Sweden funnels tested" },
  { value: "45+", label: "Snapchat geo campaigns" },
  { value: "5", label: "B2B FinTech markets" },
  { value: "4", label: "major advertising channels in one funnel" },
];

export function PerformanceSignals() {
  return (
    <Section className="bg-surface/40">
      <Reveal>
        <Eyebrow>Selected Performance Signals</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Operating Complexity, Not Testimonials.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          These are structural facts from real engagements — the scale of the systems we have
          actually run.
        </p>
      </Reveal>

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border lg:grid-cols-3">
        {SIGNALS.map((s) => (
          <div key={s.label} className="bg-background px-5 py-7">
            <dt className="text-3xl font-bold tracking-tight text-primary">{s.value}</dt>
            <dd className="mt-2 text-sm leading-snug text-muted-foreground">{s.label}</dd>
          </div>
        ))}
      </dl>

      <Reveal delay={80} className="mt-10">
        <TelegramLink source="signals_cta" message={TELEGRAM_MESSAGES.numbers}>
          Show Us Your Numbers →
        </TelegramLink>
      </Reveal>
    </Section>
  );
}
