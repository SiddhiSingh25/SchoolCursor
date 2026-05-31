type SupabaseLikeError = {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
};

/**
 * Logs a brief, readable error in the browser/server console during development.
 * Safe to call anywhere — no-op in production.
 */
export function logDevError(context: string, error: unknown) {
  if (process.env.NODE_ENV !== "development") return;

  if (error && typeof error === "object") {
    const e = error as SupabaseLikeError;
    console.error(`[Dev Error] ${context}`, {
      message: e.message ?? String(error),
      code: e.code,
      details: e.details,
      hint: e.hint,
    });
    return;
  }

  console.error(`[Dev Error] ${context}`, error);
}

/** Log in dev, then re-throw (for service layers). */
export function throwWithDevLog(context: string, error: unknown): never {
  logDevError(context, error);
  throw error;
}
