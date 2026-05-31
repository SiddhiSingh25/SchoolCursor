"use client";

import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/features/admin/ui/confirm-dialog";
import { deleteInquiry, listInquiries, setInquiryContacted } from "./inquiries-service";

function clampPage(page: number) {
  return Math.max(1, page);
}

export function InquiriesTable() {
  const qc = useQueryClient();
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  const query = useQuery({
    queryKey: ["admin", "inquiries", { q, page }],
    queryFn: () => listInquiries({ q, page, pageSize: 10, contacted: "all" }),
  });

  const toggle = useMutation({
    mutationFn: (input: { id: string; contacted: boolean }) =>
      setInquiryContacted(input.id, input.contacted),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    },
    onError: (err: any) => toast.error(err?.message ?? "Failed to update inquiry"),
  });

  const del = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: async () => {
      toast.success("Inquiry deleted");
      setDeleteId(null);
      await qc.invalidateQueries({ queryKey: ["admin", "inquiries"] });
    },
    onError: (err: any) => toast.error(err?.message ?? "Failed to delete inquiry"),
  });

  const total = query.data?.count ?? 0;
  const pageSize = query.data?.pageSize ?? 10;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card>
      <CardHeader className="space-y-3">
        <div className="space-y-1">
          <CardTitle>Inquiries</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage admissions inquiries and contact submissions.
          </p>
        </div>

        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            className="pl-9"
            placeholder="Search by student name, email, or phone..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            aria-label="Search inquiries"
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
          <p className="text-sm text-destructive">Failed to load inquiries.</p>
        ) : query.data.rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No inquiries found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b text-xs text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4">Contacted</th>
                  <th className="py-3 pr-4">Student</th>
                  <th className="py-3 pr-4">Parent</th>
                  <th className="py-3 pr-4">Phone</th>
                  <th className="py-3 pr-4">Email</th>
                  <th className="py-3 pr-4">Class</th>
                  <th className="py-3 pr-4">Message</th>
                  <th className="py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {query.data.rows.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0 align-top">
                    <td className="py-3 pr-4">
                      <Checkbox
                        checked={row.contacted}
                        onChange={(e) =>
                          toggle.mutate({ id: row.id, contacted: e.currentTarget.checked })
                        }
                        aria-label={`Mark ${row.student_name} contacted`}
                      />
                    </td>
                    <td className="py-3 pr-4 font-medium">{row.student_name}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.parent_name ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.phone ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.email ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.class ?? "—"}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      <p className="line-clamp-2">{row.message ?? "—"}</p>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="destructive" size="sm" onClick={() => setDeleteId(row.id)}>
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Delete</span>
                      </Button>
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
        title="Delete inquiry?"
        description="This will permanently remove the inquiry."
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

