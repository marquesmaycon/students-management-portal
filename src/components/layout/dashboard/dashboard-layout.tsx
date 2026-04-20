import { Outlet } from "react-router";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Footer } from "./footer";
import { Header } from "./header";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Header />

        <div className="bg-accent/33 flex flex-1 flex-col p-2">
          <Outlet />
        </div>

        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
