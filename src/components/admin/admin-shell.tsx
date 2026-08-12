import { useEffect, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  BriefcaseBusiness,
  FileText,
  HelpCircle,
  ListChecks,
  Inbox,
  Image as ImageIcon,
  Settings,
  LogOut,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  params?: { key: string };
  exact?: boolean;
};

export const ADMIN_NAV: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/content", label: "Page Content", icon: Sparkles },
  { to: "/admin/collections/$key", params: { key: "services" }, label: "Services", icon: BriefcaseBusiness },
  { to: "/admin/collections/$key", params: { key: "verticals" }, label: "Verticals", icon: Layers },
  { to: "/admin/case-studies", label: "Case Studies", icon: FileText },
  { to: "/admin/collections/$key", params: { key: "faqs" }, label: "FAQs", icon: HelpCircle },
  { to: "/admin/collections/$key", params: { key: "navigation_items" }, label: "Navigation", icon: ListChecks },
  { to: "/admin/media", label: "Media", icon: ImageIcon },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        navigate({ to: "/admin/login", replace: true });
        return;
      }
      const { data: admin } = await supabase
        .from("admin_users")
        .select("username, display_name, is_active")
        .eq("auth_user_id", data.user.id)
        .maybeSingle();
      if (!admin || !admin.is_active) {
        await supabase.auth.signOut();
        navigate({ to: "/admin/login", replace: true });
        return;
      }
      if (!cancelled) {
        setUsername(admin.display_name || admin.username);
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login", replace: true });
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        Checking your session…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-surface/40 p-4 lg:block">
        <p className="px-2 text-sm font-bold tracking-tight">Digitalfluxx CMS</p>
        <p className="mt-1 px-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted-foreground">
          {username}
        </p>
        <nav className="mt-6 space-y-1">
          {ADMIN_NAV.map((item) => {
            const href = item.params ? item.to.replace("$key", item.params.key) : item.to;
            const active = item.exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                to={item.to}
                params={item.params as never}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors",
                  active
                    ? "bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={signOut}
          className="mt-8 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>

      <div className="flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <h1 className="text-lg font-bold tracking-tight">{title}</h1>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              View site ↗
            </a>
            <button
              type="button"
              onClick={signOut}
              className="text-xs text-muted-foreground hover:text-foreground lg:hidden"
            >
              Sign out
            </button>
          </div>
        </header>
        <div className="lg:hidden">
          <nav className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2">
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.params ? item.to + item.params.key : item.to}
                to={item.to}
                params={item.params as never}
                className="whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <main className="p-5">{children}</main>
      </div>
    </div>
  );
}
