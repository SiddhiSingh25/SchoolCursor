"use client";

import { throwWithDevLog } from "@/lib/dev-error";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { NoticeRow } from "./types";
import type { NoticeValues } from "./schemas";

export type NoticeListParams = {
  q?: string;
  page?: number;
  pageSize?: number;
};

export async function listNotices(params: NoticeListParams) {
  const supabase = createSupabaseBrowser();
  const pageSize = params.pageSize ?? 10;
  const page = params.page ?? 1;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("notices")
    .select("id,title,description,publish_date,created_at,updated_at", { count: "exact" })
    .order("publish_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.q?.trim()) {
    query = query.ilike("title", `%${params.q.trim()}%`);
  }

  const { data, error, count } = await query;
  if (error) throwWithDevLog("notices.list", error);

  return { rows: (data ?? []) as NoticeRow[], count: count ?? 0, page, pageSize };
}

export async function getNotice(id: string) {
  const supabase = createSupabaseBrowser();
  const { data, error } = await supabase
    .from("notices")
    .select("id,title,description,publish_date,created_at,updated_at")
    .eq("id", id)
    .maybeSingle();

  if (error) throwWithDevLog("notices.get", error);
  if (!data) throw new Error("Notice not found");
  return data as NoticeRow;
}

export async function createNotice(values: NoticeValues) {
  const supabase = createSupabaseBrowser();
  const { data, error } = await supabase
    .from("notices")
    .insert({
      title: values.title,
      description: values.description,
      publish_date: values.publish_date,
    })
    .select("id")
    .single();

  if (error) throwWithDevLog("notices.create", error);
  return data as { id: string };
}

export async function updateNotice(id: string, values: NoticeValues) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase
    .from("notices")
    .update({
      title: values.title,
      description: values.description,
      publish_date: values.publish_date,
    })
    .eq("id", id);

  if (error) throwWithDevLog("notices.update", error);
}

export async function deleteNotice(id: string) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.from("notices").delete().eq("id", id);
  if (error) throwWithDevLog("notices.delete", error);
}
