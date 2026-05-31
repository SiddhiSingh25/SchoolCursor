import { Container } from "@/components/layout/container";
import { EventForm } from "@/features/admin/events/event-form";

export default async function AdminEditEventPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  return (
    <Container className="py-8 sm:py-10">
      <EventForm mode="edit" id={id} />
    </Container>
  );
}

