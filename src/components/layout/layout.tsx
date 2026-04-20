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

          <div className="bg-accent/33 flex flex-1 flex-col p-2">
            <Outlet />
          </div>

          <Footer />
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
