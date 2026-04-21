import { Navigate, Outlet } from "react-router";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/auth-context";

import { Footer } from "./footer";
import { Header } from "./header";

export function DashboardLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Header />

        <div className="dark:bg-accent/33 bg-accent flex flex-1 flex-col p-2">
          <Outlet />
        </div>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
