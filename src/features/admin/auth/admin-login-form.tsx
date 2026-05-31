"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { logDevError } from "@/lib/dev-error";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLoginSchema, type AdminLoginValues } from "./schemas";
import { adminSignInWithPassword } from "./auth-client";

export function AdminLoginForm() {
  const router = useRouter();
  const form = useForm<AdminLoginValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signIn = useMutation({
    mutationFn: adminSignInWithPassword,
    onSuccess: ({ data, error }) => {
      if (error) {
        logDevError("auth.login", error);
        toast.error(error.message);
        return;
      }
      if (!data.session) {
        logDevError("auth.login", new Error("No session returned after sign-in"));
        toast.error("Login failed. Please try again.");
        return;
      }
      toast.success("Welcome back!");
      router.replace("/admin/dashboard");
      router.refresh();
    },
    onError: (err: any) => {
      logDevError("auth.login", err);
      toast.error(err?.message ?? "Something went wrong.");
    },
  });

  const isBusy = signIn.isPending || form.formState.isSubmitting;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">Admin sign in</CardTitle>
        <p className="text-sm text-muted-foreground">
          Use your school admin credentials to access the dashboard.
        </p>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) => signIn.mutate(values))}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              inputMode="email"
              autoComplete="email"
              placeholder="admin@school.edu"
              {...form.register("email")}
              aria-invalid={!!form.formState.errors.email}
            />
            {form.formState.errors.email ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              {...form.register("password")}
              aria-invalid={!!form.formState.errors.password}
            />
            {form.formState.errors.password ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.password.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="w-full" disabled={isBusy}>
            {isBusy ? "Signing in..." : "Sign in"}
          </Button>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <Link className="hover:text-foreground" href="/">
              Back to website
            </Link>
            <span>{siteConfig.school.shortName} Admin</span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

