import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  event_date: z.string().min(4, "Event date is required"),
  location: z.string().min(2, "Location is required"),
  image_url: z.string().url().optional().or(z.literal("")),
});

export type EventValues = z.infer<typeof eventSchema>;

