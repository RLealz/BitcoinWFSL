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
    console.error("Failed to fetch CSRF token:", error);
    throw new Error("Failed to fetch CSRF token. Please try again.");
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
        console.error("CSRF token fetch failed:", error);
        throw error;
      }
    }

    console.log(`Making ${method} request to ${url}`);
    const res = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
    });

    // Log response status and headers for debugging
    console.log(`Response status: ${res.status}`);
    console.log(`Response headers:`, Object.fromEntries(res.headers.entries()));

    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    console.error(`API request failed (${method} ${url}):`, error);
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
      console.error("Query function error:", error);
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