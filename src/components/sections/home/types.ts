import type { LucideIcon } from "lucide-react";

export type Stat = {
  label: string;
  value: string;
};

export type Facility = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type GalleryPreviewItem = {
  id: string;
  title: string;
  subtitle?: string;
  gradientClassName: string;
};

export type Notice = {
  id: string;
  title: string;
  excerpt?: string | null;
  publishedAt: string; // ISO string
};

export type Event = {
  id: string;
  title: string;
  location?: string | null;
  startsAt: string; // ISO string
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
};

