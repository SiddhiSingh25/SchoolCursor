"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { publicNav } from "@/constants/nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight">
            {siteConfig.school.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {publicNav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active && "bg-accent text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/login"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Admin
          </Link>
        </div>
      </Container>
    </header>
  );
}

