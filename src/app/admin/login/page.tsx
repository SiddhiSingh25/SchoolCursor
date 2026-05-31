import { AdminLoginForm } from "@/features/admin/auth/admin-login-form";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: `Admin Login · ${siteConfig.school.shortName}`,
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <Container className="py-10 sm:py-14">
        <div className="flex justify-center">
          <AdminLoginForm />
        </div>
      </Container>
    </div>
  );
}

