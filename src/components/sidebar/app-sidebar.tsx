"use client";

import {
  BookOpen,
  BookUser,
  CircleHelpIcon,
  GraduationCap,
  LayoutDashboard,
  LibraryBig,
  SearchIcon,
  Settings2Icon,
  University,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { NavSecondary } from "./nav-secondary";
import { TeamSwitcher } from "./team-switcher";

const data = {
  teams: [
    {
      name: "Ambiente 1",
      logo: <GraduationCap />,
    },
    {
      name: "Ambiente 2",
      logo: <LibraryBig />,
    },
    {
      name: "Ambiente 3",
      logo: <University />,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: <LayoutDashboard />,
    },
    {
      title: "Alunos",
      url: "/students",
      icon: <BookUser />,
    },
    {
      title: "Cursos",
      url: "/courses",
      icon: <BookOpen />,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Busca",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
