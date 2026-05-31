"use client";

import { useQuery } from "@tanstack/react-query";

import { createSupabaseBrowser } from "@/lib/supabase/browser";

export function useAdminUser() {
  return useQuery({
    queryKey: ["admin", "user"],
    queryFn: async () => {
      const supabase = createSupabaseBrowser();
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data.user;
    },
  });
}

