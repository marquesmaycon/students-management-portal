"use client";

import { useQuery } from "@tanstack/react-query";
import {
  BadgePlus,
  TrendingDownIcon,
  TrendingUpIcon,
  User,
  UserStar,
} from "lucide-react";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { studentsChartOptions } from "../students/query-options";
import { buildDashboardMetrics } from "./generators";

export function SectionCards() {
  const { data: students } = useQuery(studentsChartOptions);

  const metrics = useMemo(() => buildDashboardMetrics(students), [students]);

  console.log({ metrics });
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Alunos</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.totalStudents} <UserStar />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon />+{metrics.avgMonthlyGrowth}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Média de crescimento Crescimento médio de {metrics.avgMonthlyGrowth}{" "}
            alunos por mês
          </div>
          <div className="text-muted-foreground">
            Base total de estudantes cadastrados na plataforma
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Curso Mais Popular</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.mostPopularCourse.name}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <User />
              {metrics.mostPopularCourse.total}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Maior volume de matrículas acumuladas
          </div>
          <div className="text-muted-foreground">
            Representa o curso com maior adesão dos alunos
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Curso com Menor Adesão</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.leastPopularCourse.name}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Menor número de matrículas registradas{" "}
            <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Pode indicar baixa demanda ou necessidade de revisão
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Matrículas Recentes</CardDescription>
          <CardTitle className="flex items-center gap-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {metrics.last30Days.total}
            <BadgePlus />
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total de novos alunos nos últimos 30 dias
          </div>
          <div className="text-muted-foreground">
            Indicador de crescimento recente da plataforma
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
