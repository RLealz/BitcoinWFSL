import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

// Function to get CSRF token
async function getCsrfToken(): Promise<string> {
  try {
    const res = await fetch('/api/csrf-token', { 
      credentials: 'include',
    });
    await throwIfResNotOk(res);
    const data = await res.json();
    return data.csrfToken;
  } catch (error) {
    // Only log the error in development
    if (import.meta.env.DEV) {
      console.warn("CSRF token fetch failed:", error);
    }
    throw error;
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  try {
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (data) {
      headers["Content-Type"] = "application/json";
    }

    // Add CSRF token for non-GET requests
    if (method !== 'GET') {
      try {
        const csrfToken = await getCsrfToken();
        headers['X-CSRF-Token'] = csrfToken;
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("CSRF token fetch failed:", error);
        }
        // Don't rethrow in development to prevent Vite overlay
        if (!import.meta.env.DEV) {
          throw error;
        }
      }
    }

    if (import.meta.env.DEV) {
      console.debug(`Making ${method} request to ${url}`);
    }

    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    // In development, only log non-critical errors
    if (import.meta.env.DEV) {
      console.warn(`API request warning (${method} ${url}):`, error);
      // Don't rethrow HMR-related errors in development
      if (error instanceof Error && error.message.includes('Failed to fetch')) {
        return new Response(null, { status: 200 });
      }
    }
    throw error;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    try {
      const res = await fetch(queryKey[0] as string, {
        credentials: "include",
      });

      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }

      await throwIfResNotOk(res);
      return await res.json();
    } catch (error) {
      // In development, handle fetch errors gracefully
      if (import.meta.env.DEV && error instanceof Error && error.message.includes('Failed to fetch')) {
        console.warn("Query function warning:", error);
        return null;
      }
      throw error;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});