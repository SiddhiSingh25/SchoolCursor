"use client";

import Link from "next/link";
import { Camera, ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import type { GalleryPreviewItem } from "./types";

const galleryItems: GalleryPreviewItem[] = [
  {
    id: "campus",
    title: "Campus life",
    subtitle: "Vibrant learning spaces",
    gradientClassName: "from-primary/35 via-accent/20 to-transparent",
  },
  {
    id: "sports",
    title: "Sports & teams",
    subtitle: "Confidence and collaboration",
    gradientClassName: "from-emerald-500/30 via-primary/15 to-transparent",
  },
  {
    id: "arts",
    title: "Arts & culture",
    subtitle: "Creativity on display",
    gradientClassName: "from-fuchsia-500/25 via-accent/20 to-transparent",
  },
  {
    id: "labs",
    title: "Labs & innovation",
    subtitle: "Hands-on discovery",
    gradientClassName: "from-sky-500/30 via-primary/15 to-transparent",
  },
  {
    id: "events",
    title: "School events",
    subtitle: "Celebrations and milestones",
    gradientClassName: "from-amber-500/25 via-accent/20 to-transparent",
  },
  {
    id: "classrooms",
    title: "Classrooms",
    subtitle: "Focused, modern learning",
    gradientClassName: "from-indigo-500/25 via-primary/15 to-transparent",
  },
];

export function GalleryPreviewSection() {
  return (
    <section aria-label="Gallery preview" className="border-b">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Reveal as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              A glimpse of life at Springfield
            </Reveal>
            <Reveal
              as="p"
              delay={0.05}
              className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
            >
              A modern campus experience — academics, sports, and community moments.
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <Link href={siteConfig.links.gallery} aria-label="View full gallery">
              <Button variant="outline" className="w-full sm:w-auto">
                <Camera className="h-4 w-4" aria-hidden="true" />
                View gallery
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-12">
          {galleryItems.map((item, idx) => {
            const isLarge = idx === 0 || idx === 3;
            return (
              <Reveal key={item.id} delay={0.03 + idx * 0.03}>
                <Card
                  className={[
                    "group relative overflow-hidden",
                    "min-h-36 sm:min-h-44",
                    "lg:min-h-48",
                    isLarge ? "lg:col-span-7" : "lg:col-span-5",
                  ].join(" ")}
                >
                  <div
                    aria-hidden="true"
                    className={[
                      "absolute inset-0 bg-gradient-to-br",
                      item.gradientClassName,
                    ].join(" ")}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(600px_260px_at_20%_20%,rgba(255,255,255,0.12),transparent_60%)]"
                  />
                  <div className="relative flex h-full flex-col justify-end p-5">
                    <p className="text-sm font-semibold tracking-tight">{item.title}</p>
                    {item.subtitle ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.subtitle}
                      </p>
                    ) : null}
                    <div className="mt-4 h-1 w-12 rounded-full bg-foreground/20 transition-all group-hover:w-16" />
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-5 text-xs text-muted-foreground">
          Images are placeholders for now — connect Supabase Storage later for real
          uploads.
        </p>
      </Container>
    </section>
  );
}

