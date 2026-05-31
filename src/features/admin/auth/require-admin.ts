import { redirect } from "next/navigation";

import { createSupabaseServer } from "@/lib/supabase/server";

export async function requireAdminUser() {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/admin/login");
  }

  return data.user;
}

