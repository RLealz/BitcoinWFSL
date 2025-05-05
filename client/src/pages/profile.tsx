import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import UserProfile from "@/components/sections/user-profile";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Redirect to="/auth" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <UserProfile />
    </div>
  );
}