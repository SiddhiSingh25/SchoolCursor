import { Container } from "@/components/layout/container";
import { NoticeForm } from "@/features/admin/notices/notice-form";

export default async function AdminEditNoticePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  return (
    <Container className="py-8 sm:py-10">
      <NoticeForm mode="edit" id={id} />
    </Container>
  );
}

