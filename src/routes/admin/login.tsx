import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminLogin, adminHasAccounts } from "@/lib/admin-auth.functions";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin sign in — Digitalfluxx" },
      { name: "description", content: "Private control panel for the Digitalfluxx website." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    void adminHasAccounts().then((r) => setNeedsSetup(!r.hasAccounts));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const result = await adminLogin({ data: { username, password } });
    if (!result.ok) {
      setError(result.error);
      setBusy(false);
      return;
    }
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    });
    if (sessionError) {
      setError(sessionError.message);
      setBusy(false);
      return;
    }
    navigate({ to: "/admin", replace: true });
  };

  const input =
    "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-border p-6"
      >
        <div>
          <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-foreground">
            Digitalfluxx
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight">Control panel</h1>
        </div>

        <label className="block space-y-1.5">
          <span className="text-xs text-muted-foreground">Username</span>
          <input
            className={input}
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs text-muted-foreground">Password</span>
          <input
            type="password"
            className={input}
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>

        {needsSetup ? (
          <p className="text-xs text-muted-foreground">
            No admin account exists yet.{" "}
            <a href="/admin/setup" className="underline">
              Create the first one
            </a>
            .
          </p>
        ) : null}
      </form>
    </div>
  );
}
