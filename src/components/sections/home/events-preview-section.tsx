import Link from "next/link";
import { CalendarDays, ChevronRight, MapPin } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Event } from "./types";

function formatMonthDay(iso: string) {
  const date = new Date(iso);
  const month = new Intl.DateTimeFormat(siteConfig.school.locale, { month: "short" }).format(date);
  const day = new Intl.DateTimeFormat(siteConfig.school.locale, { day: "2-digit" }).format(date);
  return { month, day };
}

function formatFullDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(siteConfig.school.locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);
}

export type EventsPreviewSectionProps = {
  events: Event[];
};

export function EventsPreviewSection({ events }: EventsPreviewSectionProps) {
  return (
    <section aria-label="Upcoming events" className="border-b">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Reveal as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Upcoming events
            </Reveal>
            <Reveal
              as="p"
              delay={0.05}
              className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
            >
              Celebrations, competitions, and community events across the year.
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <Link href={siteConfig.links.events} aria-label="View all events">
              <Button variant="outline" className="w-full sm:w-auto">
                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                View all
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {events.map((event, idx) => {
            const md = formatMonthDay(event.startsAt);
            return (
              <Reveal key={event.id} delay={0.03 + idx * 0.04}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  <CardHeader className="flex-row items-start gap-4">
                    <div className="rounded-xl border bg-accent/40 px-3 py-2 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {md.month}
                      </p>
                      <p className="text-lg font-semibold leading-none">{md.day}</p>
                    </div>
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">Event</Badge>
                        <p className="text-xs text-muted-foreground">
                          <time dateTime={event.startsAt}>{formatFullDate(event.startsAt)}</time>
                        </p>
                      </div>
                      <CardTitle className="text-base leading-6">{event.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      <span className="truncate">
                        {event.location ?? "Campus"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

