import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Lead } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Loader2, LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { logoutMutation } = useAuth();
  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/admin/leads"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          variant="outline"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          {logoutMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4 mr-2" />
          )}
          Logout
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Form Submissions</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Investment Range</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads?.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    {format(new Date(lead.createdAt!), "dd/MM/yyyy HH:mm")}
                  </TableCell>
                  <TableCell>{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.phone || "-"}</TableCell>
                  <TableCell>{lead.investmentRange || "-"}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {lead.message || "-"}
                  </TableCell>
                </TableRow>
              ))}
              {!leads?.length && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No form submissions yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}