import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export default function HomePage() {
  return (
    <div className="bg-background">
      <section className="border-b">
        <Container className="py-16 sm:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-sm font-medium text-muted-foreground">
                {siteConfig.school.tagline}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {siteConfig.school.name}
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                A modern, scalable school website starter with a full admin
                dashboard, Supabase backend, and a clean reusable architecture.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href={siteConfig.links.admissions}>
                  <Button size="lg">Admissions</Button>
                </Link>
                <Link href={siteConfig.links.contact}>
                  <Button size="lg" variant="outline">
                    Contact
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border bg-gradient-to-br from-accent to-background p-8">
              <div className="space-y-3">
                <p className="text-sm font-medium">Template-ready sections</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Reusable hero + feature blocks</li>
                  <li>Notices & events driven from database</li>
                  <li>Gallery backed by Supabase Storage</li>
                  <li>Inquiry + contact forms with validation</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

