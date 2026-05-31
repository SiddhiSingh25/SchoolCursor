import { Container } from "@/components/layout/container";
import { EventForm } from "@/features/admin/events/event-form";

export default function AdminCreateEventPage() {
  return (
    <Container className="py-8 sm:py-10">
      <EventForm mode="create" />
    </Container>
  );
}

