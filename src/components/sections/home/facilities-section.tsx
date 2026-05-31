"use client";

import {
  Atom,
  BookOpen,
  Dumbbell,
  GraduationCap,
  MonitorSmartphone,
  Palette,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Facility } from "./types";

const facilities: Facility[] = [
  {
    title: "Smart Classrooms",
    description:
      "Interactive boards, curated digital content, and concept-first teaching.",
    icon: MonitorSmartphone,
  },
  {
    title: "Science Labs",
    description: "Well-equipped labs for hands-on physics, chemistry, and biology.",
    icon: Atom,
  },
  {
    title: "Library & Reading",
    description: "A calm space with diverse collections and guided reading programs.",
    icon: BookOpen,
  },
  {
    title: "Sports Complex",
    description:
      "Training for teamwork, stamina, and confidence with certified coaches.",
    icon: Dumbbell,
  },
  {
    title: "Arts & Creativity",
    description: "Music, dance, and visual arts studios to explore expression.",
    icon: Palette,
  },
  {
    title: "Career Guidance",
    description: "Mentorship, workshops, and skill-building for future pathways.",
    icon: GraduationCap,
  },
];

export function FacilitiesSection() {
  return (
    <section aria-label="Facilities" className="border-b">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Reveal as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Facilities that power everyday excellence
            </Reveal>
            <Reveal
              as="p"
              delay={0.05}
              className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
            >
              Premium infrastructure, thoughtfully designed — so learning feels
              inspiring from the first step into campus.
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <Reveal key={facility.title} delay={0.04 + idx * 0.03}>
                <Card
                  className={cn(
                    "group h-full overflow-hidden transition-shadow hover:shadow-md"
                  )}
                >
                  <CardHeader className="flex-row items-start justify-between gap-3">
                    <div className="space-y-1">
                      <CardTitle className="text-base">{facility.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {facility.description}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-accent/40 p-3 transition-colors group-hover:bg-accent">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div className="h-full w-0 bg-primary transition-all duration-500 group-hover:w-2/3" />
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

