"use client";

import { createSupabaseBrowser } from "@/lib/supabase/browser";

export async function adminSignInWithPassword(input: {
  email: string;
  password: string;
}) {
  const supabase = createSupabaseBrowser();
  return supabase.auth.signInWithPassword(input);
}

export async function adminSignOut() {
  const supabase = createSupabaseBrowser();
  return supabase.auth.signOut();
}

