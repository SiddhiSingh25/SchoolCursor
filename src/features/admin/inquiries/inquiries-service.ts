"use client";

import { throwWithDevLog } from "@/lib/dev-error";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { InquiryRow } from "./types";

export type InquiryListParams = {
  q?: string;
  contacted?: "all" | "yes" | "no";
  page?: number;
  pageSize?: number;
};

export async function listInquiries(params: InquiryListParams) {
  const supabase = createSupabaseBrowser();
  const pageSize = params.pageSize ?? 10;
  const page = params.page ?? 1;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("inquiries")
    .select(
      "id,student_name,parent_name,phone,email,class,message,contacted,created_at,updated_at",
      { count: "exact" }
    )
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.q?.trim()) {
    const q = params.q.trim();
    query = query.or(`student_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%`);
  }

  if (params.contacted === "yes") query = query.eq("contacted", true);
  if (params.contacted === "no") query = query.eq("contacted", false);

  const { data, error, count } = await query;
  if (error) throwWithDevLog("inquiries.list", error);

  return { rows: (data ?? []) as InquiryRow[], count: count ?? 0, page, pageSize };
}

export async function setInquiryContacted(id: string, contacted: boolean) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.from("inquiries").update({ contacted }).eq("id", id);
  if (error) throwWithDevLog("inquiries.update", error);
}

export async function deleteInquiry(id: string) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.from("inquiries").delete().eq("id", id);
  if (error) throwWithDevLog("inquiries.delete", error);
}
