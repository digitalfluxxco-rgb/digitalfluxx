import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { adminBootstrap, adminHasAccounts } from "@/lib/admin-auth.functions";

export const Route = createFileRoute("/admin/setup")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Create admin account — Digitalfluxx" },
      { name: "description", content: "One-time setup for the Digitalfluxx control panel." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminSetup,
});

function AdminSetup() {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(false);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void adminHasAccounts().then((r) => setLocked(r.hasAccounts));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    const result = await adminBootstrap({ data: { username, password, displayName } });
    setBusy(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate({ to: "/admin/login", replace: true });
  };

  const input =
    "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

  if (locked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <div className="max-w-sm space-y-3">
          <h1 className="text-xl font-bold tracking-tight">Setup already complete</h1>
          <p className="text-sm text-muted-foreground">
            An admin account exists. Sign in from the login page.
          </p>
          <a href="/admin/login" className="inline-block text-sm underline">
            Go to sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl border border-border p-6"
      >
        <h1 className="text-xl font-bold tracking-tight">Create your admin account</h1>
        <p className="text-xs text-muted-foreground">
          This is only possible once. Use a strong password of at least 10 characters.
        </p>
        <label className="block space-y-1.5">
          <span className="text-xs text-muted-foreground">Username</span>
          <input className={input} value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs text-muted-foreground">Display name</span>
          <input
            className={input}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs text-muted-foreground">Password</span>
          <input
            type="password"
            className={input}
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs text-muted-foreground">Confirm password</span>
          <input
            type="password"
            className={input}
            value={confirm}
            autoComplete="new-password"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Creating…" : "Create account"}
        </button>
      </form>
    </div>
  );
}
