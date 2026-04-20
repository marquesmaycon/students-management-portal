import { Outlet } from "react-router";

import { AppSidebar } from "../sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { TooltipProvider } from "../ui/tooltip";
import { Footer } from "./footer";
import { Header } from "./header";

export function Layout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <Header />

          <div className="flex-1 px-4">
            <Outlet />
          </div>

          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
