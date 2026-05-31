"use client";

import { Quote } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Testimonial } from "./types";

const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Ananya Sharma",
    role: "Parent · Grade 6",
    quote:
      "The teachers are incredibly supportive. My child is more confident, curious, and disciplined — the progress is visible every week.",
  },
  {
    id: "t-2",
    name: "Rohit Menon",
    role: "Student · Grade 10",
    quote:
      "Classes are interactive and practical. The labs and clubs helped me find what I’m good at — and what I want to pursue.",
  },
  {
    id: "t-3",
    name: "Meera Iyer",
    role: "Parent · Grade 3",
    quote:
      "The communication is clear, the campus is safe, and the learning culture is positive. It feels like a premium, caring community.",
  },
];

export function TestimonialsSection() {
  return (
    <section aria-label="Testimonials" className="border-b">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="space-y-2">
          <Reveal as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Families who trust Springfield
          </Reveal>
          <Reveal
            as="p"
            delay={0.05}
            className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base"
          >
            Real words from parents and students — the moments that matter.
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <Reveal key={t.id} delay={0.03 + idx * 0.04}>
              <Card className="h-full">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{t.name}</CardTitle>
                    <Quote className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  <p className="text-pretty">“{t.quote}”</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

