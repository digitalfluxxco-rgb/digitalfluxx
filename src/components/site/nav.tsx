import { useEffect, useState } from "react";
import { useSiteContent } from "@/lib/site-content";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo, TelegramLink } from "./primitives";
import { buildTelegramUrl, trackTelegram } from "@/lib/tracking";
import { TELEGRAM_MESSAGES } from "@/lib/lead-message";
import { Send } from "lucide-react";

export function SiteNav() {
  const { navigation } = useSiteContent();
  const LINKS = navigation
    .filter((n) => n.location === "header")
    .map((n) => ({ href: n.href, label: n.label }));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/90 shadow-[0_10px_30px_-20px_oklch(0_0_0)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="flex items-center py-2 pr-4" aria-label="Digitalfluxx home">
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <TelegramLink
            source="nav"
            message={TELEGRAM_MESSAGES.generic}
            className="px-4 py-2 text-[0.8rem]"
          >
            Talk to Digitalfluxx
          </TelegramLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border py-3.5 text-base text-muted-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href={buildTelegramUrl(TELEGRAM_MESSAGES.generic)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackTelegram("nav_mobile", { cta_label: "Talk to Digitalfluxx" });
                  setOpen(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Send className="h-4 w-4" />
                Talk to Digitalfluxx
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

/** Sticky mobile conversion bar — appears past the hero, never overlaps content. */
export function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <a
        href={buildTelegramUrl(TELEGRAM_MESSAGES.generic)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackTelegram("sticky_mobile", { cta_label: "Talk to Digitalfluxx" })}
        className="cta-arrow flex min-h-[48px] w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground"
      >
        <Send className="h-4 w-4" />
        Talk to Digitalfluxx →
      </a>
    </div>
  );
}
