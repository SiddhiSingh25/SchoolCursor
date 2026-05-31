"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { toast } from "sonner";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { adminNavItems } from "./nav";
import { adminSignOut } from "@/features/admin/auth/auth-client";

export function AdminShell(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    const { error } = await adminSignOut();
    if (error) toast.error(error.message);
    else toast.success("Logged out");
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur lg:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/admin/dashboard" className="text-sm font-semibold tracking-tight">
            {siteConfig.school.shortName} Admin
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const el = document.getElementById("admin-mobile-nav");
                if (el instanceof HTMLDialogElement) el.showModal();
              }}
              aria-label="Open navigation"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button variant="outline" size="icon" onClick={onLogout} aria-label="Logout">
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <dialog
        id="admin-mobile-nav"
        className="backdrop:bg-black/50"
        aria-label="Admin navigation"
      >
        <div className="w-[min(92vw,360px)] rounded-xl border bg-background p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Navigation</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const el = document.getElementById("admin-mobile-nav");
                if (el instanceof HTMLDialogElement) el.close();
              }}
            >
              Close
            </Button>
          </div>
          <nav className="mt-4 flex flex-col gap-1">
            {adminNavItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    const el = document.getElementById("admin-mobile-nav");
                    if (el instanceof HTMLDialogElement) el.close();
                  }}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground",
                    active && "bg-accent text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </dialog>

      <div className="lg:grid lg:grid-cols-[260px_1fr]">
        {/* Desktop sidebar */}
        <aside className="hidden border-r lg:block">
          <div className="sticky top-0 h-screen p-4">
            <Link
              href="/admin/dashboard"
              className="block rounded-md px-3 py-2 text-sm font-semibold tracking-tight"
            >
              {siteConfig.school.shortName} Admin
            </Link>

            <nav className="mt-4 flex flex-col gap-1">
              {adminNavItems.map((item) => {
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

            <div className="mt-6">
              <Button variant="outline" className="w-full justify-start" onClick={onLogout}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          {/* Desktop top bar */}
          <div className="sticky top-0 z-30 hidden border-b bg-background/80 backdrop-blur lg:block">
            <div className="flex h-14 items-center justify-between px-6">
              <p className="text-sm text-muted-foreground">Admin Panel</p>
              <div className="flex items-center gap-2">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                  View site
                </Link>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Logout
                </Button>
              </div>
            </div>
          </div>

          <main className="min-w-0">{props.children}</main>
        </div>
      </div>
    </div>
  );
}

