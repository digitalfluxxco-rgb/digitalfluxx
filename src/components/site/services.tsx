import { Reveal, Eyebrow, Section, TelegramLink } from "./primitives";
import { track } from "@/lib/tracking";
import { TELEGRAM_MESSAGES } from "@/lib/lead-message";
import { useSiteContent, asStringArray } from "@/lib/site-content";

export function Services() {
  const { services } = useSiteContent();
  const SERVICES = services.map((s) => ({
    n: s.number_label,
    title: s.title,
    desc: s.short_description,
    items: asStringArray(s.tags),
    cta: s.cta_label,
    message: s.telegram_message,
  }));

  return (
    <Section id="services">
      <Reveal>
        <Eyebrow>Capabilities</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">What We Build</h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Acquisition infrastructure for difficult-to-advertise markets — compliant campaign
          structure, funnels, measurement and optimization.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={(i % 3) * 70} as="article">
            <div
              onMouseEnter={() => track("ServiceView", { service: s.title })}
              className="surface-card group flex h-full flex-col p-6 hover:-translate-y-1 hover:border-primary/50"
            >
              <span className="font-mono text-xs text-primary">{s.n}</span>
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight">{s.title}</h3>
              <span className="hairline mt-3 block h-px w-8 transition-all duration-500 group-hover:w-20" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <li
                    key={it}
                    className="rounded border border-border px-2 py-1 font-mono text-[0.68rem] text-muted-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex-1" />
              <TelegramLink
                source={`service_${s.n}`}
                message={s.message || TELEGRAM_MESSAGES.generic}
                variant="text"
                className="self-start"
              >
                {s.cta}
              </TelegramLink>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={80} className="mt-12">
        <div className="flex flex-col items-start justify-between gap-5 rounded-xl border border-border bg-surface/60 p-6 sm:flex-row sm:items-center sm:p-7">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Not sure which part of the stack is the bottleneck? Send the numbers and we&rsquo;ll
            start with the acquisition path.
          </p>
          <TelegramLink source="services_cta" message={TELEGRAM_MESSAGES.numbers}>
            Show Us Your Numbers →
          </TelegramLink>
        </div>
      </Reveal>
    </Section>
  );
}

export function Verticals() {
  const { verticals } = useSiteContent();
  const VERTICALS = verticals.map((v) => ({
    title: v.title,
    desc: v.description,
    tags: asStringArray(v.tags),
    cta: v.cta_label,
    message: v.telegram_message,
  }));

  return (
    <Section id="expertise" className="bg-surface/40">
      <Reveal>
        <Eyebrow>Verticals</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          The Verticals We Know
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Different verticals require different acquisition economics, messaging, funnels and
          attribution. These are the environments we have actually worked in.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {VERTICALS.map((v, i) => (
          <Reveal key={v.title} delay={(i % 3) * 60} as="article">
            <div className="surface-card group flex h-full flex-col p-6 hover:-translate-y-1 hover:border-primary/40">
              <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
              <span className="hairline mt-2.5 block h-px w-8 transition-all duration-500 group-hover:w-20" />
              <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {v.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded border border-border px-2 py-1 font-mono text-[0.68rem] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex-1" />
              {v.cta && (
                <TelegramLink
                  source={`vertical_${v.title.toLowerCase().replace(/[^a-z]+/g, "_")}`}
                  message={v.message || TELEGRAM_MESSAGES.generic}
                  vertical={v.title}
                  variant="text"
                  className="self-start"
                >
                  {v.cta}
                </TelegramLink>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
