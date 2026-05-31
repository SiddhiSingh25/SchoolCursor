"use client";

import { throwWithDevLog } from "@/lib/dev-error";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { EventRow } from "./types";
import type { EventValues } from "./schemas";

export type EventListParams = {
  q?: string;
  page?: number;
  pageSize?: number;
};

export async function listEvents(params: EventListParams) {
  const supabase = createSupabaseBrowser();
  const pageSize = params.pageSize ?? 10;
  const page = params.page ?? 1;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("events")
    .select("id,title,description,event_date,location,image_url,created_at,updated_at", {
      count: "exact",
    })
    .order("event_date", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (params.q?.trim()) query = query.ilike("title", `%${params.q.trim()}%`);

  const { data, error, count } = await query;
  if (error) throwWithDevLog("events.list", error);
  return { rows: (data ?? []) as EventRow[], count: count ?? 0, page, pageSize };
}

export async function getEvent(id: string) {
  const supabase = createSupabaseBrowser();
  const { data, error } = await supabase
    .from("events")
    .select("id,title,description,event_date,location,image_url,created_at,updated_at")
    .eq("id", id)
    .maybeSingle();
  if (error) throwWithDevLog("events.get", error);
  if (!data) throw new Error("Event not found");
  return data as EventRow;
}

export async function createEvent(values: EventValues) {
  const supabase = createSupabaseBrowser();
  const { data, error } = await supabase
    .from("events")
    .insert({
      title: values.title,
      description: values.description,
      event_date: values.event_date,
      location: values.location,
      image_url: values.image_url || null,
    })
    .select("id")
    .single();
  if (error) throwWithDevLog("events.create", error);
  return data as { id: string };
}

export async function updateEvent(id: string, values: EventValues) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase
    .from("events")
    .update({
      title: values.title,
      description: values.description,
      event_date: values.event_date,
      location: values.location,
      image_url: values.image_url || null,
    })
    .eq("id", id);
  if (error) throwWithDevLog("events.update", error);
}

export async function deleteEvent(id: string) {
  const supabase = createSupabaseBrowser();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throwWithDevLog("events.delete", error);
}

