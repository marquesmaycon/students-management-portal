import React from "react";
import { Link, useMatches } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const breadcrumbConfig: Record<string, string> = {
  students: "Alunos",
  courses: "Cursos",
  new: "Novo",
};

type Crumb = {
  label: string;
  to?: string;
};

function buildBreadcrumbs(pathname: string, data?: unknown): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);

  const crumbs: Crumb[] = [{ label: "Início", to: "/" }];

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;

    if (isLast && data) {
      crumbs.push({ label: String(data) });
      return;
    }

    const label = breadcrumbConfig[segment] ?? segment;

    crumbs.push({ label, to: currentPath });
  });

  return crumbs;
}

export function AppBreadcrumb() {
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];

  const crumbs = buildBreadcrumbs(lastMatch.pathname, lastMatch.loaderData);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index < crumbs.length - 1 && crumb.to ? (
                <BreadcrumbLink asChild className="text-xs md:text-sm">
                  <Link to={crumb.to}>{crumb.label}</Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {index < crumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
