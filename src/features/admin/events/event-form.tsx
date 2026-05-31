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
import { eventSchema, type EventValues } from "./schemas";
import { createEvent, getEvent, updateEvent } from "./events-service";

export function EventForm(props: { mode: "create" } | { mode: "edit"; id: string }) {
  const router = useRouter();
  const qc = useQueryClient();

  const eventQuery = useQuery({
    queryKey: props.mode === "edit" ? ["admin", "events", props.id] : ["admin", "events", "new"],
    queryFn: async () => {
      if (props.mode !== "edit") return null;
      return getEvent(props.id);
    },
    enabled: props.mode === "edit",
  });

  const form = useForm<EventValues>({
    resolver: zodResolver(eventSchema),
    values:
      props.mode === "edit" && eventQuery.data
        ? {
            title: eventQuery.data.title,
            description: eventQuery.data.description ?? "",
            event_date: (eventQuery.data.event_date ?? "").slice(0, 10),
            location: eventQuery.data.location ?? "",
            image_url: eventQuery.data.image_url ?? "",
          }
        : undefined,
    defaultValues: { title: "", description: "", event_date: "", location: "", image_url: "" },
  });

  const mutation = useMutation({
    mutationFn: async (values: EventValues) => {
      if (props.mode === "create") return createEvent(values);
      await updateEvent(props.id, values);
      return { id: props.id };
    },
    onSuccess: async (res) => {
      toast.success(props.mode === "create" ? "Event created" : "Event updated");
      await qc.invalidateQueries({ queryKey: ["admin", "events"] });
      router.replace(`/admin/events`);
      router.refresh();
    },
    onError: (err: any) => toast.error(err?.message ?? "Failed to save event"),
  });

  const busy = mutation.isPending || eventQuery.isLoading;

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle>{props.mode === "create" ? "Create event" : "Edit event"}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Use clear event dates and locations for parents.
        </p>
      </CardHeader>
      <CardContent>
        {eventQuery.isError ? (
          <p className="text-sm text-destructive">Failed to load event.</p>
        ) : null}
        <form className="mt-2 space-y-4" onSubmit={form.handleSubmit((v) => mutation.mutate(v))}>
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Open House & Campus Tour" {...form.register("title")} />
            {form.formState.errors.title ? (
              <p className="text-xs text-destructive">{form.formState.errors.title.message}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="event_date">Event date</Label>
              <Input id="event_date" type="date" {...form.register("event_date")} />
              {form.formState.errors.event_date ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.event_date.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Main Auditorium" {...form.register("location")} />
              {form.formState.errors.location ? (
                <p className="text-xs text-destructive">
                  {form.formState.errors.location.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register("description")} />
            {form.formState.errors.description ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL (optional)</Label>
            <Input id="image_url" placeholder="https://..." {...form.register("image_url")} />
            {form.formState.errors.image_url ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.image_url.message as string}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={busy}>
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

