"use client";

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

import { logDevError } from "@/lib/dev-error";

export function Providers(props: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error, query) => {
            logDevError(`query:${query.queryKey.join("/")}`, error);
          },
        }),
        mutationCache: new MutationCache({
          onError: (error, _variables, _context, mutation) => {
            logDevError(`mutation:${mutation.options.mutationKey?.join("/") ?? "unknown"}`, error);
          },
        }),
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}

