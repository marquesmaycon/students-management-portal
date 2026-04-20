"use client";

import {
  BotIcon,
  GalleryVerticalEndIcon,
  TerminalSquareIcon,
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

import { TeamSwitcher } from "./team-switcher";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Portal do Professor",
      logo: <GalleryVerticalEndIcon />,
      plan: "Professor Mediador",
    },
  ],
  navMain: [
    {
      title: "Alunos",
      url: "#",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "Listagem",
          url: "/students",
        },
        {
          title: "Novo Aluno",
          url: "/students/new",
        },
      ],
    },
    {
      title: "Cursos",
      url: "#",
      icon: <BotIcon />,
      items: [
        {
          title: "Listagem",
          url: "#",
        },
        {
          title: "Novo Curso",
          url: "#",
        },
      ],
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
