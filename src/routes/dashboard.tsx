import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardShell } from "@/components/DashboardShell";
import { UserDashboard } from "@/components/UserDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { ClientDashboard } from "@/components/ClientDashboard";
import { Droplets } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  if (loading || !user || !role) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-soft">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Droplets className="h-5 w-5 animate-pulse text-primary" /> Loading…
        </div>
      </div>
    );
  }

  if (role === "admin") {
    return (
      <DashboardShell title="Admin Control Center" subtitle="Monitor and coordinate every water complaint.">
        <Tabs defaultValue="admin" className="space-y-6">
          <TabsList>
            <TabsTrigger value="admin">Admin View</TabsTrigger>
            <TabsTrigger value="user">User View</TabsTrigger>
          </TabsList>
          <TabsContent value="admin"><AdminDashboard /></TabsContent>
          <TabsContent value="user"><UserDashboard /></TabsContent>
        </Tabs>
      </DashboardShell>
    );
  }
  if (role === "client") {
    return (
      <DashboardShell title="Field Client Workspace" subtitle="Resolve the complaints assigned to you.">
        <ClientDashboard />
      </DashboardShell>
    );
  }
  return (
    <DashboardShell title="Welcome to WaterCare AI" subtitle="Report issues, get AI guidance, stay informed.">
      <UserDashboard />
    </DashboardShell>
  );
}
