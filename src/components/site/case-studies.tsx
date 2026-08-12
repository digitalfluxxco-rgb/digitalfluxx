import { useState } from "react";
import { Reveal, Eyebrow, Section, TelegramLink } from "./primitives";
import { track } from "@/lib/tracking";
import { TELEGRAM_MESSAGES } from "@/lib/lead-message";
import { useSiteContent, asStringArray } from "@/lib/site-content";
import { cn } from "@/lib/utils";

type Metric = { value: string; label: string };
type CaseStudy = {
  id: string;
  label: string;
  title: string;
  subtitle?: string | undefined;
  summary: string;
  metrics: Metric[];
  challenge: string;
  changed: string[];
  outcome: string[];
  role: string;
  cta: string;
  message: string;
  tags?: string[] | undefined;
  screenshot?: string | undefined;
};

/** Dashboard frame. Real supplied screenshots drop in here — never fabricated. */
function ProofFrame({ caption, onExpand }: { caption: string; onExpand: () => void }) {
  return (
    <figure className="proof-frame mt-4 overflow-hidden rounded-lg border border-border bg-background">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        <span className="ml-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
          Ads Manager
        </span>
      </div>
      <button
        type="button"
        onClick={onExpand}
        className="proof-media block w-full text-left"
        aria-label={`Enlarge: ${caption}`}
      >
        {/* Drop the supplied Ads Manager screenshot here (src/assets) — do not alter values. */}
        <span className="flex h-28 items-center justify-center bg-surface px-4 text-center text-[0.7rem] text-muted-foreground">
          {caption}
        </span>
      </button>
      <figcaption className="border-t border-border px-3 py-2 text-[0.68rem] text-muted-foreground/80">
        {caption} — tap to enlarge
      </figcaption>
    </figure>
  );
}

function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const alt = index % 2 === 1;

  return (
    <Reveal as="article">
      <div className="case-card surface-card overflow-hidden hover:-translate-y-1 hover:border-primary/40">
        <div className={cn("grid gap-8 p-6 sm:p-9 lg:grid-cols-2 lg:gap-12")}>
          <div className={cn(alt && "lg:order-2")}>
            <p className="eyebrow text-primary">{study.label}</p>
            <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              {study.title}
            </h3>
            {study.subtitle && (
              <p className="mt-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-muted-foreground">
                {study.subtitle}
              </p>
            )}
            <span className="accent-line mt-4 block h-px w-10" aria-hidden="true" />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>

            {study.tags && study.tags.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {study.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-border px-2 py-1 font-mono text-[0.66rem] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <TelegramLink
                source={`case_${study.id}`}
                message={study.message || TELEGRAM_MESSAGES.generic}
                vertical={study.label}
              >
                {study.cta}
              </TelegramLink>
              <button
                type="button"
                onClick={() => {
                  setOpen((v) => !v);
                  if (!open) track("ViewCaseStudy", { case: study.id });
                }}
                aria-expanded={open}
                className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {open ? "Hide Breakdown ↑" : "View Full Breakdown ↓"}
              </button>
            </div>
          </div>

          <div className={cn(alt && "lg:order-1")}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
              {study.metrics.map((m) => (
                <div key={m.label} className="bg-background px-4 py-5">
                  <dt className="text-lg font-bold leading-tight tracking-tight sm:text-2xl">
                    {m.value}
                  </dt>
                  <dd className="mt-1 text-[0.72rem] leading-snug text-muted-foreground">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>

            {study.screenshot && (
              <ProofFrame caption={study.screenshot} onExpand={() => setModal(true)} />
            )}
          </div>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-500 ease-out",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t border-border bg-background/60 p-6 sm:p-9">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="eyebrow">Challenge</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {study.challenge}
                  </p>
                  <h4 className="eyebrow mt-7">Our Role</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{study.role}</p>
                </div>
                <div>
                  <h4 className="eyebrow">Architecture &amp; What We Tested</h4>
                  <ul className="mt-3 space-y-2">
                    {study.changed.map((c) => (
                      <li key={c} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary" aria-hidden="true">
                          —
                        </span>
                        {c}
                      </li>
                    ))}
                  </ul>
                  <h4 className="eyebrow mt-7">Outcome</h4>
                  <ul className="mt-3 space-y-2">
                    {study.outcome.map((o) => (
                      <li key={o} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary" aria-hidden="true">
                          —
                        </span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <TelegramLink
                source={`case_${study.id}_expanded`}
                message={study.message || TELEGRAM_MESSAGES.generic}
                className="mt-8"
              >
                {study.cta}
              </TelegramLink>
            </div>
          </div>
        </div>
      </div>

      {modal && study.screenshot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={study.screenshot}
          onClick={() => setModal(false)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-5 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-semibold">{study.screenshot}</p>
              <button
                type="button"
                onClick={() => setModal(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 flex h-64 items-center justify-center rounded-lg border border-border bg-background px-6 text-center text-sm text-muted-foreground">
              {study.screenshot} — supplied campaign screenshot renders here at full size.
            </div>
          </div>
        </div>
      )}
    </Reveal>
  );
}

function toCase(c: ReturnType<typeof useSiteContent>["caseStudies"][number]): CaseStudy {
  return {
    id: c.slug,
    label: c.eyebrow,
    title: c.title,
    subtitle: c.subtitle || undefined,
    summary: c.summary,
    metrics: c.metrics.map((m) => ({ value: m.value, label: m.label })),
    challenge: c.challenge,
    changed: c.steps.map((s) => s.heading),
    outcome: asStringArray(c.outcome),
    role: c.role,
    cta: c.cta_label,
    message: c.telegram_message,
    tags: asStringArray(c.tags),
    screenshot: c.images[0]?.caption || undefined,
  };
}

export function CaseStudies() {
  const { caseStudies } = useSiteContent();
  const CASES = caseStudies.filter((c) => c.group_key !== "additional").map(toCase);
  const ADDITIONAL = caseStudies.filter((c) => c.group_key === "additional").map(toCase);

  return (
    <Section id="case-studies">
      <Reveal>
        <Eyebrow>Selected Performance Work</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Proof Before Promises.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Restricted verticals, regulated finance and multi-geo acquisition — diagnosed as full
          systems before anything was scaled.
        </p>
      </Reveal>

      <div className="mt-12 space-y-5">
        {CASES.map((c, i) => (
          <CaseCard key={c.id} study={c} index={i} />
        ))}
      </div>

      <Reveal className="mt-20">
        <Eyebrow>Additional Performance Work</Eyebrow>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Outside the restricted verticals, the same diagnostic approach has been applied to DTC,
          clinic and real-estate acquisition.
        </p>
      </Reveal>

      <div className="mt-8 space-y-5">
        {ADDITIONAL.map((c, i) => (
          <CaseCard key={c.id} study={c} index={i} />
        ))}
      </div>
    </Section>
  );
}
