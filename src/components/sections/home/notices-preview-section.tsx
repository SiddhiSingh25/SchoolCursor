import Link from "next/link";
import { Megaphone, ChevronRight } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Notice } from "./types";

function formatDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(siteConfig.school.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export type NoticesPreviewSectionProps = {
  notices: Notice[];
};

export function NoticesPreviewSection({ notices }: NoticesPreviewSectionProps) {
  return (
    <section aria-label="Latest notices" className="border-b">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Reveal as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Latest notices
            </Reveal>
            <Reveal
              as="p"
              delay={0.05}
              className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
            >
              Updates and announcements for parents and students.
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <Link href={siteConfig.links.notices} aria-label="View all notices">
              <Button variant="outline" className="w-full sm:w-auto">
                <Megaphone className="h-4 w-4" aria-hidden="true" />
                View all
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {notices.map((notice, idx) => (
            <Reveal key={notice.id} delay={0.03 + idx * 0.04}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary">Notice</Badge>
                    <p className="text-xs text-muted-foreground">
                      <time dateTime={notice.publishedAt}>
                        {formatDate(notice.publishedAt)}
                      </time>
                    </p>
                  </div>
                  <CardTitle className="text-base leading-6">{notice.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  {notice.excerpt ?? "Tap to read more details and updates."}
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

