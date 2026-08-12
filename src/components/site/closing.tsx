import { useSiteContent } from "@/lib/site-content";
import { Reveal, Eyebrow, Section, TelegramLink, Logo } from "./primitives";
import { TELEGRAM_HANDLE } from "@/lib/tracking";
import { TELEGRAM_MESSAGES } from "@/lib/lead-message";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function TelegramCTA() {
  return (
    <Section className="relative overflow-hidden bg-surface/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-[110px]"
      />
      <Reveal className="relative">
        <Eyebrow>Direct Conversation</Eyebrow>
        <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
          Show Us Your Current Funnel.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Send the vertical, GEO, traffic source and current numbers. We will identify where
          acquisition is leaking and whether Digitalfluxx is the right fit.
        </p>
        <div className="mt-8">
          <TelegramLink source="telegram_section" message={TELEGRAM_MESSAGES.numbers}>
            Message Digitalfluxx on Telegram →
          </TelegramLink>
          <p className="mt-3 font-mono text-xs text-muted-foreground">
            Telegram · {TELEGRAM_HANDLE}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

export function FAQ() {
  const { faqs } = useSiteContent();
  const FAQS = faqs.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <Section id="faq">
      <Reveal>
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">Common Questions</h2>
      </Reveal>

      <Reveal delay={80}>
        <Accordion type="single" collapsible className="mt-10 border-t border-border">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="max-w-3xl pb-6 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

export function FinalCTA() {
  return (
    <Section>
      <Reveal>
        <Eyebrow>Have Traffic. Need Better Economics?</Eyebrow>
        <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          Show Us What <span className="text-primary">You&rsquo;re Running.</span>
        </h2>
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            Send the vertical, GEO, traffic source and current numbers. We&rsquo;ll start with the
            acquisition path — not a generic agency pitch.
          </p>
        </div>
        <div className="mt-8">
          <TelegramLink source="final_cta" message={TELEGRAM_MESSAGES.numbers}>
            Start on Telegram →
          </TelegramLink>
          <p className="mt-3 font-mono text-xs text-muted-foreground">Direct · {TELEGRAM_HANDLE}</p>
        </div>
      </Reveal>
    </Section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border px-5 pb-24 pt-14 sm:px-8 md:pb-14">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="text-lg" />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Performance acquisition for restricted verticals. Funnels. Attribution. Multi-geo
            scaling.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="eyebrow">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              ["#services", "Services"],
              ["#expertise", "Verticals"],
              ["#case-studies", "Case Studies"],
              ["#process", "Process"],
              ["#faq", "FAQ"],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow">Contact</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Telegram:{" "}
            <TelegramLink
              source="footer"
              message={TELEGRAM_MESSAGES.generic}
              variant="text"
              className="font-semibold"
            >
              {TELEGRAM_HANDLE}
            </TelegramLink>
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-6xl border-t border-border pt-6">
        <p className="max-w-4xl text-xs leading-relaxed text-muted-foreground/70">
          Digitalfluxx provides marketing, funnel, analytics and acquisition services. References to
          past campaign performance describe specific historical engagements and do not guarantee
          future results. Clients remain responsible for ensuring their products, offers and
          advertising comply with applicable laws, licensing requirements and platform policies in
          their target markets.
        </p>
        <p className="mt-4 text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Digitalfluxx. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
