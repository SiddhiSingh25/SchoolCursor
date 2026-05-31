import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function PublicLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{props.children}</main>
      <SiteFooter />
    </>
  );
}

