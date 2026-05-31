import { Container } from "@/components/layout/container";
import { NoticesTable } from "@/features/admin/notices/notices-table";

export default function AdminNoticesPage() {
  return (
    <Container className="py-8 sm:py-10">
      <NoticesTable />
    </Container>
  );
}

