import { Container } from "@/components/layout/container";
import { GalleryManager } from "@/features/admin/gallery/gallery-manager";

export default function AdminGalleryPage() {
  return (
    <Container className="py-8 sm:py-10">
      <GalleryManager />
    </Container>
  );
}

