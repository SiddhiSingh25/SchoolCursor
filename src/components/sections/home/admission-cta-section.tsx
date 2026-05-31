"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function AdmissionCTASection() {
  return (
    <section aria-label="Admissions CTA">
      <Container className="py-12 sm:py-16 lg:py-20">
        <Reveal>
          <Card className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(900px_400px_at_20%_30%,hsl(var(--primary)/0.25),transparent_60%),radial-gradient(700px_340px_at_80%_10%,hsl(var(--accent)/0.30),transparent_60%)]"
            />
            <div className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
              <div className="space-y-3 lg:col-span-7">
                <p className="text-sm font-medium text-muted-foreground">
                  Admissions 2026–27
                </p>
                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Help your child thrive with a school built for the future.
                </h2>
                <p className="max-w-2xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
                  Book a campus tour, talk to our admissions team, and explore the
                  learning environment. Limited seats across select grades.
                </p>
              </div>

              <div className="flex flex-col gap-3 lg:col-span-5 lg:justify-self-end">
                <Link href={siteConfig.links.admissions} aria-label="Start admissions application">
                  <Button size="lg" className="w-full">
                    Apply now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
                <Link href={siteConfig.links.contact} aria-label="Contact admissions">
                  <Button size="lg" variant="outline" className="w-full">
                    <PhoneCall className="h-4 w-4" aria-hidden="true" />
                    Contact admissions
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  Prefer calling? {siteConfig.contact.phone}
                </p>
              </div>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}

