import Link from "next/link";
// import { Facebook, Instagram, Youtube } from "lucide-react";

import { siteConfig } from "@/config/site";
import { Container } from "./container";
import { WifiPen } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-2 lg:col-span-5">
            <p className="text-sm font-semibold">{siteConfig.school.name}</p>
            <p className="text-sm text-muted-foreground">{siteConfig.school.tagline}</p>
            <div className="pt-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Phone:</span>{" "}
                <a className="hover:text-foreground" href={`tel:${siteConfig.contact.phone}`}>
                  {siteConfig.contact.phone}
                </a>
              </p>
              <p className="mt-1">
                <span className="font-medium text-foreground">Email:</span>{" "}
                <a className="hover:text-foreground" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </p>
              <p className="mt-2">{siteConfig.contact.addressLines.join(", ")}</p>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-sm font-semibold">Quick links</p>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link className="hover:text-foreground" href={siteConfig.links.admissions}>
                  Admissions
                </Link>
                <Link className="hover:text-foreground" href={siteConfig.links.gallery}>
                  Gallery
                </Link>
                <Link className="hover:text-foreground" href={siteConfig.links.notices}>
                  Notices
                </Link>
                <Link className="hover:text-foreground" href={siteConfig.links.events}>
                  Events
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">School</p>
              <nav className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link className="hover:text-foreground" href="/about">
                  About
                </Link>
                <Link className="hover:text-foreground" href="/academics">
                  Academics
                </Link>
                <Link className="hover:text-foreground" href="/contact">
                  Contact
                </Link>
              </nav>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold">Social</p>
              <div className="flex items-center gap-3 text-muted-foreground">
                <a
                  className="rounded-md border p-2 hover:text-foreground"
                  href={siteConfig.social.facebook || "#"}
                  aria-label="Facebook"
                >
                  <WifiPen className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  className="rounded-md border p-2 hover:text-foreground"
                  href={siteConfig.social.instagram || "#"}
                  aria-label="Instagram"
                >
                  <WifiPen className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  className="rounded-md border p-2 hover:text-foreground"
                  href={siteConfig.social.youtube || "#"}
                  aria-label="YouTube"
                >
                  <WifiPen className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                Add your social URLs in <code className="font-mono">src/config/site.ts</code>.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {siteConfig.school.shortName}. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}

