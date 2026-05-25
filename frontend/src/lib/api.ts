export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

export async function postJson<T>(path: string, payload: unknown): Promise<ApiResult<T>> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        error:
          typeof data.error === "string"
            ? data.error
            : "The request could not be completed. Please try again.",
      };
    }

    return { ok: true, data: data as T };
  } catch {
    return {
      ok: false,
      error: "Could not reach the server. Please check that the backend is running.",
    };
  }
}
