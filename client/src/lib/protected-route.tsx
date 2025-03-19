import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Route, useLocation } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
}: {
  path: string;
  component: () => React.JSX.Element;
}) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    // In development, don't trigger immediate redirects to prevent unnecessary error overlays
    if (import.meta.env.DEV) {
      console.debug("User not authenticated, redirecting to /auth");
      setTimeout(() => setLocation("/auth"), 100);
    } else {
      setLocation("/auth");
    }
    return null;
  }

  return <Route path={path} component={Component} />;
}