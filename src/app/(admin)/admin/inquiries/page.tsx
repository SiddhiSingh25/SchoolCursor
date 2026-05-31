import { Container } from "@/components/layout/container";
import { InquiriesTable } from "@/features/admin/inquiries/inquiries-table";

export default function AdminInquiriesPage() {
  return (
    <Container className="py-8 sm:py-10">
      <InquiriesTable />
    </Container>
  );
}

