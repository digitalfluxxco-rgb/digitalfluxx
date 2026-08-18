import { createServerFn } from "@tanstack/react-start";

type LoginInput = { username: string; password: string };

const normalize = (u: string) => u.trim().toLowerCase().slice(0, 60);

/** Deterministic internal identity address for a username-based admin. */
export function adminEmail(username: string) {
  return `${normalize(username).replace(/[^a-z0-9._-]/g, "")}@admin.digitalfluxx.local`;
}

export const adminHasAccounts = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count } = await supabaseAdmin
    .from("admin_users")
    .select("id", { count: "exact", head: true });
  return { hasAccounts: (count ?? 0) > 0 };
});

/** First-run bootstrap: only possible while no admin account exists. */
export const adminBootstrap = createServerFn({ method: "POST" })
  .inputValidator((data: LoginInput & { displayName?: string }) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const username = normalize(data.username);
    if (username.length < 3) return { ok: false as const, error: "Username is too short." };
    if (data.password.length < 10)
      return { ok: false as const, error: "Password must be at least 10 characters." };

    const { count } = await supabaseAdmin
      .from("admin_users")
      .select("id", { count: "exact", head: true });
    if ((count ?? 0) > 0) return { ok: false as const, error: "An admin account already exists." };

    const created = await supabaseAdmin.auth.admin.createUser({
      email: adminEmail(username),
      password: data.password,
      email_confirm: true,
      user_metadata: { username },
    });
    if (created.error || !created.data.user) {
      return {
        ok: false as const,
        error: created.error?.message ?? "Could not create the account.",
      };
    }

    const { error } = await supabaseAdmin.from("admin_users").insert({
      auth_user_id: created.data.user.id,
      username,
      display_name: data.displayName?.trim() || username,
      role: "owner",
      is_active: true,
    });
    if (error) return { ok: false as const, error: error.message };

    return { ok: true as const };
  });

/** Username + password sign-in. Returns a session for the client to adopt. */
export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: LoginInput) => data)
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { createClient } = await import("@supabase/supabase-js");

    const username = normalize(data.username);
    const { data: admin } = await supabaseAdmin
      .from("admin_users")
      .select("id, username, is_active")
      .eq("username", username)
      .maybeSingle();

    if (!admin || !admin.is_active) {
      return { ok: false as const, error: "Invalid username or password." };
    }

const authClient = createClient(
  process.env["SUPABASE_URL"]!,
  process.env["SUPABASE_PUBLISHABLE_KEY"]!,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  },
);

    console.log("SUPABASE_URL:", process.env["SUPABASE_URL"]);
console.log(
  "PUBLISHABLE_KEY_PREFIX:",
  process.env["SUPABASE_PUBLISHABLE_KEY"]?.slice(0, 25),
);
console.log(
  "PUBLISHABLE_KEY_LENGTH:",
  process.env["SUPABASE_PUBLISHABLE_KEY"]?.length,
);
    const signIn = await authClient.auth.signInWithPassword({
      email: adminEmail(username),
      password: data.password,
    });

if (signIn.error || !signIn.data.session) {
  console.error("ADMIN LOGIN ERROR:", signIn.error);

  return {
    ok: false as const,
    error: signIn.error?.message ?? "No session returned from Supabase.",
  };
}

    await supabaseAdmin
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", admin.id);
    await supabaseAdmin
      .from("admin_activity")
      .insert({ admin_username: username, action: "login", resource: "admin" });

    return {
      ok: true as const,
      access_token: signIn.data.session.access_token,
      refresh_token: signIn.data.session.refresh_token,
    };
  });
