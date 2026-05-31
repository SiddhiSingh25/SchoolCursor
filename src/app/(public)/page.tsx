import { Suspense } from "react";

import { siteConfig } from "@/config/site";
import { HeroSection } from "@/components/sections/home/hero-section";
import { AboutSection } from "@/components/sections/home/about-section";
import { FacilitiesSection } from "@/components/sections/home/facilities-section";
import { GalleryPreviewSection } from "@/components/sections/home/gallery-preview-section";
import { NoticesPreviewSection } from "@/components/sections/home/notices-preview-section";
import { EventsPreviewSection } from "@/components/sections/home/events-preview-section";
import { TestimonialsSection } from "@/components/sections/home/testimonials-section";
import { AdmissionCTASection } from "@/components/sections/home/admission-cta-section";
import { HomeLoading } from "@/components/sections/home/home-loading";
import { getLatestNotices, getUpcomingEvents } from "@/components/sections/home/supabase-content";

async function NoticesAndEvents() {
  const [notices, events] = await Promise.all([getLatestNotices(3), getUpcomingEvents(3)]);

  return (
    <>
      <NoticesPreviewSection notices={notices} />
      <EventsPreviewSection events={events} />
    </>
  );
}

export default function HomePage() {
  return (
    <div className="bg-background">
      <HeroSection
        headline={`${siteConfig.school.name}`}
        subheadline="A premium, modern learning community combining strong academics, character building, and future-ready skills — with a campus experience families love."
        stats={[
          { label: "Years of excellence", value: "25+" },
          { label: "Student–teacher ratio", value: "15:1" },
          { label: "Clubs & activities", value: "40+" },
          { label: "Campus satisfaction", value: "98%" },
        ]}
      />

      <AboutSection />
      <FacilitiesSection />
      <GalleryPreviewSection />

      <Suspense fallback={<HomeLoading />}>
        <NoticesAndEvents />
      </Suspense>

      <TestimonialsSection />
      <AdmissionCTASection />
    </div>
  );
}

