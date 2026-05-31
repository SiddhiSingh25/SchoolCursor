import { createSupabaseServer } from "@/lib/supabase/server";
import type { Event, Notice } from "./types";

function isoNowMinus(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export async function getLatestNotices(limit = 3): Promise<Notice[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("notices")
      .select("id,title,excerpt,published_at,created_at")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    if (!data) return [];

    return data.map((row: any) => ({
      id: String(row.id),
      title: String(row.title ?? "Notice"),
      excerpt: row.excerpt ?? null,
      publishedAt: String(row.published_at ?? row.created_at ?? new Date().toISOString()),
    }));
  } catch {
    // Dummy data fallback (temporary).
    return [
      {
        id: "notice-1",
        title: "Admissions open for 2026–27",
        excerpt: "Applications are now open. Schedule a campus visit this week.",
        publishedAt: isoNowMinus(2),
      },
      {
        id: "notice-2",
        title: "Parent–Teacher meeting schedule",
        excerpt: "Slots available for all grades. Please book via the portal.",
        publishedAt: isoNowMinus(6),
      },
      {
        id: "notice-3",
        title: "Summer camp registrations",
        excerpt: "STEM + arts workshops designed for joyful, hands-on learning.",
        publishedAt: isoNowMinus(10),
      },
    ].slice(0, limit);
  }
}

export async function getUpcomingEvents(limit = 3): Promise<Event[]> {
  try {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase
      .from("events")
      .select("id,title,location,starts_at,created_at")
      .order("starts_at", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    if (!data) return [];

    return data.map((row: any) => ({
      id: String(row.id),
      title: String(row.title ?? "Event"),
      location: row.location ?? null,
      startsAt: String(row.starts_at ?? row.created_at ?? new Date().toISOString()),
    }));
  } catch {
    // Dummy data fallback (temporary).
    const now = Date.now();
    return [
      {
        id: "event-1",
        title: "Open House & Campus Tour",
        location: "Main Auditorium",
        startsAt: new Date(now + 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "event-2",
        title: "Inter-school Sports Meet",
        location: "Sports Ground",
        startsAt: new Date(now + 11 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "event-3",
        title: "Annual Day Rehearsals",
        location: "Performing Arts Studio",
        startsAt: new Date(now + 18 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ].slice(0, limit);
  }
}

