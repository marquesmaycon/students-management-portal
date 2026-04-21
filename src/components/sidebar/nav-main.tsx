import { NavLink, useLocation } from "react-router";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
}) {
  const { pathname } = useLocation();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
      <SidebarMenu className="space-y-1">
        {items.map(({ title, url, icon }) => {
          const isActive = pathname
            .split("/")
            .map((p) => `/${p}`)
            .includes(url);
          return (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton asChild isActive={isActive}>
                <NavLink to={url}>
                  {icon}
                  <span>{title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
