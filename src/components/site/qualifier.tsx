import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Copy, Send } from "lucide-react";
import { Reveal, Eyebrow, Section } from "./primitives";
import { cn } from "@/lib/utils";
import { TELEGRAM_HANDLE, buildTelegramUrl, track, trackTelegram } from "@/lib/tracking";
import { buildLeadMessage, type LeadData } from "@/lib/lead-message";
import { useSiteContent } from "@/lib/site-content";
import { submitLead } from "@/lib/leads.functions";
import { getAttribution } from "@/lib/tracking";

type Step = {
  key: keyof Pick<LeadData, "vertical" | "needs" | "channels" | "spend" | "issue">;
  question: string;
  multi: boolean;
  options: readonly string[];
};

const EMPTY: LeadData = {
  vertical: [],
  needs: [],
  channels: [],
  spend: [],
  issue: [],
  name: "",
  company: "",
  website: "",
  geo: "",
};

/**
 * Single qualifier implementation used in two placements:
 *  - variant="hero"    → compact intake panel inside the hero grid
 *  - variant="section" → full-width section near the bottom of the funnel
 */
export function QualifierCard({
  variant = "hero",
  source,
  heading = "Tell Us What You're Running",
  subheading = "Answer 5 quick questions and continue directly on Telegram.",
}: {
  variant?: "hero" | "section";
  source: string;
  heading?: string;
  subheading?: string;
}) {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [data, setData] = useState<LeadData>(EMPTY);
  const [pulse, setPulse] = useState<string | null>(null);
  const [dir, setDir] = useState<"next" | "back">("next");
  const [draft, setDraft] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [touched, setTouched] = useState(false);
  const { formQuestions } = useSiteContent();
  const STEPS: Step[] = formQuestions.map((q) => ({
    key: q.question_key as Step["key"],
    question: q.label,
    multi: q.field_type === "multi_select",
    options: q.options.map((o) => o.label),
  }));

  const total = STEPS.length + 1;
  const active = STEPS[step];
  const isFinal = !active;

  const begin = () => {
    if (!started) {
      setStarted(true);
      track("QualificationStarted", { placement: source });
    }
  };

  const go = (next: number) => {
    setDir(next > step ? "next" : "back");
    setStep(Math.max(0, Math.min(next, STEPS.length)));
  };

  const choose = (key: Step["key"], option: string, multi: boolean) => {
    begin();
    setPulse(option);
    setTimeout(() => setPulse(null), 420);
    setData((prev) => {
      const current = prev[key];
      if (multi) {
        return {
          ...prev,
          [key]: current.includes(option)
            ? current.filter((o) => o !== option)
            : [...current, option],
        };
      }
      return { ...prev, [key]: [option] };
    });
    if (!multi) setTimeout(() => go(step + 1), 200);
  };

  const canSubmit = data.name.trim().length > 0 && data.company.trim().length > 0;

  const submit = () => {
    setTouched(true);
    if (!canSubmit) return;
    const message = buildLeadMessage(data);
    const attribution = getAttribution();
    void submitLead({
      data: {
        name: data.name,
        company: data.company,
        website: data.website,
        vertical: data.vertical,
        services_needed: data.needs,
        traffic_sources: data.channels,
        monthly_spend: data.spend[0] ?? "",
        main_issue: data.issue[0] ?? "",
        target_geo: data.geo,
        message,
        landing_url: typeof window !== "undefined" ? window.location.href : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
        ...attribution,
        contact_destination: "telegram",
        source: source,
      },
    }).catch(() => undefined);
    track("LeadSubmitted", { placement: source });
    setDraft(message);
    setCopied(false);
    track("QualificationCompleted", {
      placement: source,
      vertical: data.vertical.join(","),
      needs: data.needs.join(","),
      channels: data.channels.join(","),
      spend: data.spend.join(","),
      issue: data.issue.join(","),
    });
    trackTelegram(source, {
      vertical: data.vertical[0],
      cta_label: "Send Details on Telegram",
    });
    window.open(buildTelegramUrl(message), "_blank", "noopener,noreferrer");
  };

  const copyDraft = async () => {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft);
    } catch {
      /* clipboard unavailable — the message stays visible below for manual copy */
    }
    setCopied(true);
  };

  const optionGrid =
    variant === "hero"
      ? "grid grid-cols-1 gap-2 sm:grid-cols-2"
      : "grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div
      className={cn(
        "qualifier-panel relative rounded-xl border border-primary/30 bg-surface p-5 sm:p-7",
        variant === "section" && "sm:p-9",
      )}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3
          className={cn(
            "font-bold tracking-tight",
            variant === "hero" ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl",
          )}
        >
          {heading}
        </h3>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
          Takes ~30 seconds
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subheading}</p>

      <div className="mt-5 flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-0.5 flex-1 rounded-full transition-all duration-500",
              i <= step ? "bg-primary" : "bg-border",
            )}
          />
        ))}
      </div>
      <p className="mt-2.5 font-mono text-[0.68rem] text-muted-foreground">
        Step {step + 1} / {total}
      </p>

      <div key={step} className={dir === "next" ? "step-in-next" : "step-in-back"}>
        {active ? (
          <div className="mt-6">
            <h4 className="text-base font-semibold tracking-tight sm:text-lg">{active.question}</h4>
            {active.multi && (
              <p className="mt-1.5 text-xs text-muted-foreground">Select all that apply.</p>
            )}
            <div className={cn("mt-4", optionGrid)}>
              {active.options.map((o) => {
                const selected = data[active.key].includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => choose(active.key, o, active.multi)}
                    className={cn(
                      "flex min-h-[44px] items-center justify-between gap-2 rounded-lg border px-3.5 py-3 text-left text-sm transition-all duration-200",
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border text-muted-foreground hover:border-border-strong hover:bg-background/40 hover:text-foreground",
                      pulse === o && "option-pulse",
                    )}
                  >
                    <span>{o}</span>
                    {selected && <Check className="h-4 w-4 shrink-0 text-primary" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <h4 className="text-lg font-semibold tracking-tight sm:text-2xl">
              Where should we start?
            </h4>
            <div
              className={cn(
                "mt-5 grid gap-4",
                variant === "hero" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4",
              )}
            >
              {(
                [
                  ["name", "Name", true],
                  ["company", "Brand / Company", true],
                  ["website", "Website / Funnel (optional)", false],
                  ["geo", "Target GEO (optional)", false],
                ] as const
              ).map(([key, label, required]) => {
                const invalid = required && touched && !data[key].trim();
                return (
                  <label key={key} className="block">
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
                      {label}
                    </span>
                    <input
                      value={data[key]}
                      onChange={(e) => setData((d) => ({ ...d, [key]: e.target.value }))}
                      aria-invalid={invalid || undefined}
                      className={cn(
                        "mt-2 min-h-[44px] w-full rounded-md border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary",
                        invalid ? "border-primary" : "border-input",
                      )}
                      placeholder={label.replace(" (optional)", "")}
                    />
                  </label>
                );
              })}
            </div>

            {touched && !canSubmit && (
              <p className="mt-3 text-xs text-primary" role="alert">
                Name and brand are required so we know who we&rsquo;re reviewing.
              </p>
            )}

            <button
              type="button"
              onClick={submit}
              className="shine cta-arrow mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-primary px-6 text-sm font-bold uppercase tracking-[0.06em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--glow-accent)]"
            >
              <Send className="h-4 w-4" />
              Send Details on Telegram →
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              Opens Telegram with your campaign details already prepared.{" "}
              <span className="font-mono text-foreground">{TELEGRAM_HANDLE}</span>
            </p>

            {draft && (
              <div className="mt-5 rounded-lg border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold">Couldn&rsquo;t open Telegram automatically?</p>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  Your answers are saved below. Copy them and send to{" "}
                  <span className="font-mono text-foreground">{TELEGRAM_HANDLE}</span>.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={copyDraft}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold transition-colors hover:border-primary/60"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied" : "Copy Details"}
                  </button>
                  <a
                    href={buildTelegramUrl(draft)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackTelegram(`${source}_retry`)}
                    className="text-sm font-semibold text-primary"
                  >
                    Try Telegram again →
                  </a>
                </div>
                <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap break-words rounded border border-border bg-background p-3 text-[0.72rem] leading-relaxed text-muted-foreground">
                  {draft}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-7 flex min-h-[1.5rem] items-center justify-between gap-4 border-t border-border pt-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>
        ) : (
          <span className="font-mono text-[0.7rem] tracking-wider text-muted-foreground/70">
            NO OBLIGATION · NO SPAM
          </span>
        )}

        {active && active.multi && (
          <button
            type="button"
            onClick={() => {
              begin();
              go(step + 1);
            }}
            className="cta-arrow inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            Continue
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
        {isFinal && (
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground">
            No phone · No email · No signup
          </span>
        )}
      </div>
    </div>
  );
}

/** Full-width placement near the bottom of the funnel. */
export function Qualifier() {
  return (
    <Section id="qualify">
      <Reveal>
        <Eyebrow>Qualification</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Give Us the Numbers.</h2>
        <p className="mt-5 max-w-xl text-sm text-muted-foreground sm:text-base">
          30 seconds now can save a long back-and-forth later.
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <QualifierCard
          variant="section"
          source="qualifier"
          heading="Tell Us What You're Running"
          subheading="Answer the questions below and continue directly on Telegram with everything prepared."
        />
      </Reveal>
    </Section>
  );
}
