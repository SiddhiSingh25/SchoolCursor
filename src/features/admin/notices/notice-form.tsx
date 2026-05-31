"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { noticeSchema, type NoticeValues } from "./schemas";
import { createNotice, getNotice, updateNotice } from "./notices-service";

export function NoticeForm(props: { mode: "create" } | { mode: "edit"; id: string }) {
  const router = useRouter();
  const qc = useQueryClient();

  const noticeQuery = useQuery({
    queryKey: props.mode === "edit" ? ["admin", "notices", props.id] : ["admin", "notices", "new"],
    queryFn: async () => {
      if (props.mode !== "edit") return null;
      return getNotice(props.id);
    },
    enabled: props.mode === "edit",
  });

  const form = useForm<NoticeValues>({
    resolver: zodResolver(noticeSchema),
    values:
      props.mode === "edit" && noticeQuery.data
        ? {
            title: noticeQuery.data.title,
            description: noticeQuery.data.description ?? "",
            publish_date: (noticeQuery.data.publish_date ?? "").slice(0, 10),
          }
        : undefined,
    defaultValues: { title: "", description: "", publish_date: "" },
  });

  const mutation = useMutation({
    mutationFn: async (values: NoticeValues) => {
      if (props.mode === "create") {
        return createNotice(values);
      }
      await updateNotice(props.id, values);
      return { id: props.id };
    },
    onSuccess: async (res) => {
      toast.success(props.mode === "create" ? "Notice created" : "Notice updated");
      await qc.invalidateQueries({ queryKey: ["admin", "notices"] });
      router.replace(`/admin/notices`);
      router.refresh();
    },
    onError: (err: any) => {
      toast.error(err?.message ?? "Failed to save notice");
    },
  });

  const busy = mutation.isPending || noticeQuery.isLoading;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>{props.mode === "create" ? "Create notice" : "Edit notice"}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Use clear titles and concise descriptions for parents and students.
        </p>
      </CardHeader>
      <CardContent>
        {noticeQuery.isError ? (
          <p className="text-sm text-destructive">Failed to load notice.</p>
        ) : null}
        <form className="mt-2 space-y-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Admissions open for 2026–27" {...form.register("title")} />
            {form.formState.errors.title ? (
              <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Write the notice details..."
              {...form.register("description")}
            />
            {form.formState.errors.description ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="publish_date">Publish date</Label>
            <Input id="publish_date" type="date" {...form.register("publish_date")} />
            {form.formState.errors.publish_date ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.publish_date.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={busy}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={busy}>
              {busy ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

