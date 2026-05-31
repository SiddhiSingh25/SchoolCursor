import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section aria-label="About" className="border-b">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-4 lg:col-span-5">
            <Reveal as="p" className="text-sm font-medium text-muted-foreground">
              About {siteConfig.school.shortName}
            </Reveal>
            <Reveal
              as="h2"
              className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
              delay={0.05}
            >
              A learning environment where curiosity becomes capability.
            </Reveal>
            <Reveal
              as="p"
              className="max-w-prose text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
              delay={0.08}
            >
              {siteConfig.school.description} We focus on strong academics, confident
              communication, and values-led growth — so every student is ready for
              a changing world.
            </Reveal>
          </div>

          <div className="grid gap-4 lg:col-span-7 sm:grid-cols-3">
            <Reveal delay={0.04}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Introduction</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  A premium K-12 learning community with modern infrastructure,
                  experienced educators, and a holistic curriculum.
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.08}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  To nurture independent thinkers and compassionate leaders through
                  rigorous academics and real-world skills.
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.12}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  To be a benchmark institution where every child feels seen,
                  challenged, and supported to succeed.
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

