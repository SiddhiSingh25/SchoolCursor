"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Stat } from "./types";

export type HeroSectionProps = {
  headline: string;
  subheadline: string;
  stats: Stat[];
};

export function HeroSection({ headline, subheadline, stats }: HeroSectionProps) {
  return (
    <section aria-label="Hero" className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_20%,hsl(var(--primary)/0.20),transparent_60%),radial-gradient(900px_500px_at_80%_10%,hsl(var(--accent)/0.30),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background)),hsl(var(--background)/0.6),hsl(var(--background)))]" />
        <div className="absolute -top-24 left-1/2 h-[480px] w-[980px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-accent/20 to-transparent blur-3xl" />
      </div>

      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1" variant="secondary">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Premium learning experience
              </Badge>
              <Badge variant="outline" className="gap-1">
                <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
                {siteConfig.school.tagline}
              </Badge>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
            >
              {subheadline}
            </motion.p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href={siteConfig.links.admissions} aria-label="Apply for admission">
                <Button size="lg">
                  Apply now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href={siteConfig.links.contact} aria-label="Contact the school">
                <Button size="lg" variant="outline">
                  Book a campus tour
                </Button>
              </Link>
            </div>

            <dl className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border bg-background/60 p-4 backdrop-blur"
                >
                  <dt className="text-xs font-medium text-muted-foreground">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 text-lg font-semibold tracking-tight">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-accent/50 via-background to-background p-5 shadow-sm"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(600px_300px_at_20%_30%,hsl(var(--primary)/0.25),transparent_60%)]"
              />
              <div className="relative space-y-4">
                <p className="text-sm font-semibold tracking-tight">
                  A modern campus, built for excellence
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  From smart classrooms to creative studios, Springfield is designed
                  to help students discover, build, and lead.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border bg-background/70 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Learning model
                    </p>
                    <p className="mt-1 text-sm font-semibold">Concept-first + skills</p>
                  </div>
                  <div className="rounded-xl border bg-background/70 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Student support
                    </p>
                    <p className="mt-1 text-sm font-semibold">Mentors & counselors</p>
                  </div>
                  <div className="rounded-xl border bg-background/70 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Activities
                    </p>
                    <p className="mt-1 text-sm font-semibold">Sports, arts, clubs</p>
                  </div>
                  <div className="rounded-xl border bg-background/70 p-4">
                    <p className="text-xs font-medium text-muted-foreground">
                      Safety
                    </p>
                    <p className="mt-1 text-sm font-semibold">Secure campus access</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

