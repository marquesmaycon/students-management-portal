import { Outlet } from "react-router";

import { AppSidebar } from "../sidebar/app-sidebar";
import { SidebarInset } from "../ui/sidebar";
import { Footer } from "./footer";
import { Header } from "./header";

export function Layout() {
  return (
    <>
      <AppSidebar />

      <SidebarInset>
        <Header />

        <div className="bg-accent/33 flex flex-1 flex-col p-2">
          <Outlet />
        </div>

        <Footer />
      </SidebarInset>
    </>
  );
}
