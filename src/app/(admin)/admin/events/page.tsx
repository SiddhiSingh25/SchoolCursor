import { Container } from "@/components/layout/container";
import { EventsTable } from "@/features/admin/events/events-table";

export default function AdminEventsPage() {
  return (
    <Container className="py-8 sm:py-10">
      <EventsTable />
    </Container>
  );
}

