import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { createSupabaseServer } from "@/lib/supabase/server";

type StatCard = {
  label: string;
  value: number;
  href: string;
};

async function getCounts() {
  const supabase = await createSupabaseServer();

  const [notices, events, gallery, inquiries] = await Promise.all([
    supabase.from("notices").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("gallery").select("id", { count: "exact", head: true }),
    supabase.from("inquiries").select("id", { count: "exact", head: true }),
  ]);

  return {
    notices: notices.count ?? 0,
    events: events.count ?? 0,
    gallery: gallery.count ?? 0,
    inquiries: inquiries.count ?? 0,
  };
}

async function getRecents() {
  const supabase = await createSupabaseServer();

  const [latestNotices, upcomingEvents, recentInquiries] = await Promise.all([
    supabase
      .from("notices")
      .select("id,title,publish_date,created_at")
      .order("publish_date", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("events")
      .select("id,title,event_date,location,created_at")
      .order("event_date", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("inquiries")
      .select("id,student_name,email,phone,contacted,created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  return {
    latestNotices: latestNotices.data ?? [],
    upcomingEvents: upcomingEvents.data ?? [],
    recentInquiries: recentInquiries.data ?? [],
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const recents = await getRecents();

  const statCards: StatCard[] = [
    { label: "Notices", value: counts.notices, href: "/admin/notices" },
    { label: "Events", value: counts.events, href: "/admin/events" },
    { label: "Gallery images", value: counts.gallery, href: "/admin/gallery" },
    { label: "Inquiries", value: counts.inquiries, href: "/admin/inquiries" },
  ];

  return (
    <div className="bg-background">
      <Container className="py-8 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Dashboard</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {siteConfig.school.shortName} Admin
            </h1>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link href="/admin/notices/create">
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4" aria-hidden="true" />
                New notice
              </Button>
            </Link>
            <Link href="/" aria-label="Go to public site">
              <Button variant="outline" className="w-full sm:w-auto">
                View website
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Link key={card.label} href={card.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-sm text-muted-foreground">
                    {card.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold tracking-tight">{card.value}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-7">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              <Link href="/admin/events/create">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Create event
                </Button>
              </Link>
              <Link href="/admin/gallery">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Upload gallery images
                </Button>
              </Link>
              <Link href="/admin/inquiries">
                <Button variant="outline" className="w-full justify-start">
                  Review inquiries
                </Button>
              </Link>
              <Link href={siteConfig.links.notices}>
                <Button variant="outline" className="w-full justify-start">
                  Preview notices page
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="lg:col-span-5">
            <CardHeader>
              <CardTitle>Production-ready template</CardTitle>
            </CardHeader>
            <CardContent className="text-sm leading-6 text-muted-foreground">
              This admin dashboard is built with feature modules, reusable UI
              patterns, and a Supabase-backed data layer — designed to be reused
              across multiple school deployments.
            </CardContent>
          </Card>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Latest notices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recents.latestNotices.length === 0 ? (
                <p className="text-sm text-muted-foreground">No notices yet.</p>
              ) : (
                recents.latestNotices.map((n: any) => (
                  <Link
                    key={n.id}
                    href={`/admin/notices/${n.id}`}
                    className="block rounded-md border p-3 text-sm hover:bg-accent"
                  >
                    <p className="font-medium">{n.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(n.publish_date ?? n.created_at ?? "").toString().slice(0, 10)}
                    </p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Upcoming events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recents.upcomingEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No events yet.</p>
              ) : (
                recents.upcomingEvents.map((e: any) => (
                  <Link
                    key={e.id}
                    href={`/admin/events/${e.id}`}
                    className="block rounded-md border p-3 text-sm hover:bg-accent"
                  >
                    <p className="font-medium">{e.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(e.event_date ?? e.created_at ?? "").toString().slice(0, 10)} ·{" "}
                      {e.location ?? "Campus"}
                    </p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent inquiries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recents.recentInquiries.length === 0 ? (
                <p className="text-sm text-muted-foreground">No inquiries yet.</p>
              ) : (
                recents.recentInquiries.map((i: any) => (
                  <Link
                    key={i.id}
                    href="/admin/inquiries"
                    className="block rounded-md border p-3 text-sm hover:bg-accent"
                  >
                    <p className="font-medium">{i.student_name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {(i.created_at ?? "").toString().slice(0, 10)} ·{" "}
                      {i.contacted ? "Contacted" : "New"} · {i.email ?? i.phone ?? "—"}
                    </p>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}

