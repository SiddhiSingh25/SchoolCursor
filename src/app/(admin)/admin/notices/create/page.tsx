import { Container } from "@/components/layout/container";
import { NoticeForm } from "@/features/admin/notices/notice-form";

export default function AdminCreateNoticePage() {
  return (
    <Container className="py-8 sm:py-10">
      <NoticeForm mode="create" />
    </Container>
  );
}

