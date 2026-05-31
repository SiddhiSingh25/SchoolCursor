import { requireAdminUser } from "@/features/admin/auth/require-admin";
import { AdminShell } from "@/features/admin/layout/admin-shell";

export default async function AdminLayout(props: { children: React.ReactNode }) {
  await requireAdminUser();
  return <AdminShell>{props.children}</AdminShell>;
}

