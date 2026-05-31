import { z } from "zod";

export const noticeSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(10, "Description is required"),
  publish_date: z.string().min(4, "Publish date is required"),
});

export type NoticeValues = z.infer<typeof noticeSchema>;

