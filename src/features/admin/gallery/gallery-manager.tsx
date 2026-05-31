"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/features/admin/ui/confirm-dialog";
import { deleteGalleryImage, listGallery, uploadGalleryImage } from "./gallery-service";

export function GalleryManager() {
  const qc = useQueryClient();
  const [deleteRow, setDeleteRow] = React.useState<{ id: string; image_path: string } | null>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [title, setTitle] = React.useState("");
  const [category, setCategory] = React.useState("");

  const list = useQuery({
    queryKey: ["admin", "gallery"],
    queryFn: listGallery,
  });

  const upload = useMutation({
    mutationFn: uploadGalleryImage,
    onSuccess: async () => {
      toast.success("Image uploaded");
      setFile(null);
      setTitle("");
      setCategory("");
      await qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
    },
    onError: (err: any) => toast.error(err?.message ?? "Upload failed"),
  });

  const del = useMutation({
    mutationFn: deleteGalleryImage,
    onSuccess: async () => {
      toast.success("Image deleted");
      setDeleteRow(null);
      await qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
    },
    onError: (err: any) => toast.error(err?.message ?? "Delete failed"),
  });

  const busy = upload.isPending;

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      <Card className="lg:col-span-4">
        <CardHeader className="space-y-1">
          <CardTitle>Upload image</CardTitle>
          <p className="text-sm text-muted-foreground">
            Drag & drop or choose a file. Stored in Supabase Storage.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed p-4 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) setFile(f);
            }}
          >
            <ImagePlus className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm font-medium">
              {file ? file.name : "Drop an image here"}
            </p>
            <p className="text-xs text-muted-foreground">PNG/JPG/WebP recommended</p>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              aria-label="Choose image file"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <Button
            className="w-full"
            disabled={!file || busy}
            onClick={() => {
              if (!file) return;
              upload.mutate({ file, title: title.trim() || undefined, category: category.trim() || undefined });
            }}
          >
            {busy ? "Uploading..." : "Upload"}
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-8">
        <CardHeader className="space-y-1">
          <CardTitle>Gallery</CardTitle>
          <p className="text-sm text-muted-foreground">Manage uploaded gallery images.</p>
        </CardHeader>
        <CardContent>
          {list.isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-40 w-full" />
              ))}
            </div>
          ) : list.isError ? (
            <p className="text-sm text-destructive">Failed to load gallery.</p>
          ) : list.data.length === 0 ? (
            <p className="text-sm text-muted-foreground">No images uploaded yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {list.data.map((row) => (
                <div key={row.id} className="group overflow-hidden rounded-xl border">
                  <div className="aspect-[4/3] bg-muted">
                    {row.public_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={row.public_url}
                        alt={row.title ?? "Gallery image"}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>
                  <div className="flex items-start justify-between gap-2 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{row.title ?? "Untitled"}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {row.category ?? "Uncategorized"}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => setDeleteRow({ id: row.id, image_path: row.image_path })}
                      aria-label="Delete image"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteRow}
        onOpenChange={(o) => (!o ? setDeleteRow(null) : null)}
        title="Delete image?"
        description="This will remove the image from storage and the gallery table."
        confirmText="Delete"
        destructive
        busy={del.isPending}
        onConfirm={() => {
          if (!deleteRow) return;
          del.mutate(deleteRow);
        }}
      />
    </div>
  );
}

