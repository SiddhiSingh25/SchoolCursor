"use client";

import { throwWithDevLog } from "@/lib/dev-error";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { GALLERY_BUCKET } from "./constants";
import type { GalleryRow } from "./types";

export async function listGallery() {
  const supabase = createSupabaseBrowser();
  const { data, error } = await supabase
    .from("gallery")
    .select("id,title,category,image_path,public_url,created_at,updated_at")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) throwWithDevLog("gallery.list", error);
  return (data ?? []) as GalleryRow[];
}

export async function uploadGalleryImage(input: {
  file: File;
  title?: string;
  category?: string;
}) {
  const supabase = createSupabaseBrowser();
  const ext = input.file.name.split(".").pop() || "jpg";
  const safeName = input.file.name.replace(/[^\w.-]+/g, "-").toLowerCase();
  const path = `${Date.now()}-${safeName}.${ext}`.replace(/\.+/g, ".");

  const { error: uploadError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(path, input.file, {
      cacheControl: "3600",
      upsert: false,
      contentType: input.file.type || undefined,
    });
  if (uploadError) throwWithDevLog("gallery.storage.upload", uploadError);

  const { data: pub } = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path);

  const { data, error } = await supabase
    .from("gallery")
    .insert({
      title: input.title ?? null,
      category: input.category ?? null,
      image_path: path,
      public_url: pub.publicUrl ?? null,
    })
    .select("id")
    .single();

  if (error) throwWithDevLog("gallery.create", error);
  return data as { id: string };
}

export async function deleteGalleryImage(row: { id: string; image_path: string }) {
  const supabase = createSupabaseBrowser();
  const { error: storageError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .remove([row.image_path]);
  if (storageError) throwWithDevLog("gallery.storage.delete", storageError);

  const { error } = await supabase.from("gallery").delete().eq("id", row.id);
  if (error) throwWithDevLog("gallery.delete", error);
}
