"use client";

import * as React from "react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/features/admin/ui/confirm-dialog";
import { deleteNotice, listNotices } from "./notices-service";

function clampPage(page: number) {
  return Math.max(1, page);
}

export function NoticesTable() {
  const qc = useQueryClient();
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const query = useQuery({
    queryKey: ["admin", "notices", { q, page }],
    queryFn: () => listNotices({ q, page, pageSize: 10 }),
  });

  const del = useMutation({
    mutationFn: deleteNotice,
    onSuccess: async () => {
      toast.success("Notice deleted");
      setDeleteId(null);
      await qc.invalidateQueries({ queryKey: ["admin", "notices"] });
    },
    onError: (err: any) => toast.error(err?.message ?? "Failed to delete notice"),
  });

  const total = query.data?.count ?? 0;
  const pageSize = query.data?.pageSize ?? 10;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <CardTitle>Notices</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage announcements shown on the public website.
            </p>
          </div>
          <Link href="/admin/notices/create">
            <Button className="w-full sm:w-auto">Create notice</Button>
          </Link>
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            className="pl-9"
            placeholder="Search notices by title..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            aria-label="Search notices"
          />
        </div>
      </CardHeader>

      <CardContent>
        {query.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} className="h-12 w-full" />
            ))}
          </div>
        ) : query.isError ? (
          <p className="text-sm text-destructive">Failed to load notices.</p>
        ) : !query.data?.rows?.length ? (
          <p className="text-sm text-muted-foreground">No notices found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-b text-xs text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4">Title</th>
                  <th className="py-3 pr-4">Publish date</th>
                  <th className="py-3 pr-4">Updated</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {query.data?.rows?.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-4">
                      <Link className="font-medium hover:underline" href={`/admin/notices/${row.id}`}>
                        {row.title}
                      </Link>
                      <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {row.description ?? ""}
                      </p>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {row.publish_date ? row.publish_date.slice(0, 10) : "—"}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {row.updated_at ? row.updated_at.slice(0, 10) : "—"}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/notices/${row.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setDeleteId(row.id)}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            {total} total · Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1 || query.isLoading}
              onClick={() => setPage((p) => clampPage(p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages || query.isLoading}
              onClick={() => setPage((p) => clampPage(p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(o) => (!o ? setDeleteId(null) : null)}
        title="Delete notice?"
        description="This will permanently remove the notice from the website."
        confirmText="Delete"
        destructive
        busy={del.isPending}
        onConfirm={() => {
          if (!deleteId) return;
          del.mutate(deleteId);
        }}
      />
    </Card>
  );
}

