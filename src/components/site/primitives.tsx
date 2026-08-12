import { useEffect, useRef, useState, type ReactNode } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { buildTelegramUrl, trackTelegram } from "@/lib/tracking";

/** Fade-up on section entry. GPU-light, respects reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      <span className="hairline inline-block h-px w-8" aria-hidden="true" />
      {children}
    </p>
  );
}

export function Section({
  id,
  children,
  className,
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 px-5 py-20 sm:px-8 md:py-28",
        bordered && "border-t border-border",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

/**
 * Every primary CTA ends at Telegram and fires TelegramClick first.
 * Pass `message` to open Telegram with a contextual draft already in the composer.
 */
export function TelegramLink({
  source,
  message,
  vertical,
  children,
  variant = "primary",
  className,
}: {
  source: string;
  message?: string;
  vertical?: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "text";
  className?: string;
}) {
  const base =
    "cta-arrow inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const styles = {
    primary:
      "shine bg-primary px-5 py-3 text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[var(--glow-accent)]",
    ghost:
      "border border-border-strong bg-transparent px-5 py-3 text-foreground hover:-translate-y-0.5 hover:border-primary/60",
    text: "text-primary hover:gap-3",
  }[variant];

  const label = typeof children === "string" ? children : undefined;

  return (
    <a
      href={buildTelegramUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackTelegram(source, { vertical, cta_label: label })}
      className={cn(base, styles, className)}
    >
      {children}
    </a>
  );
}

/** Desktop-only discreet floating Telegram action. */
export function FloatingTelegramButton({ message }: { message: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={buildTelegramUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackTelegram("floating_desktop", { cta_label: "Talk on Telegram" })}
      className={cn(
        "group fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full border border-primary/50 bg-surface/95 px-4 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow-elevated)] backdrop-blur transition-all duration-300 hover:border-primary hover:shadow-[var(--glow-accent)] md:inline-flex",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
      aria-label="Talk on Telegram"
    >
      <Send className="h-4 w-4 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[10rem] group-hover:opacity-100">
        Talk on Telegram
      </span>
    </a>
  );
}

/** Infinite marquee strip. Pauses on hover, freezes under reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-group" aria-hidden={copy === 1}>
            {items.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * Digitalfluxx wordmark.
 * Drop the supplied transparent-PNG/SVG logo at src/assets/digitalfluxx-logo.png,
 * import it, and swap the markup below for <img src={logo} ... /> — do not redraw it.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "select-none text-[1.05rem] font-extrabold tracking-tight text-foreground",
        className,
      )}
    >
      digital<span className="text-primary">fluxx</span>
    </span>
  );
}
