"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

import { studentsChartOptions } from "../students/query-options";
import { buildChartConfig, buildChartData, filterByRange } from "./utils";

export const description = "An interactive area chart";

export function ChartAreaInteractive() {
  const isMobile = useIsMobile();

  const [timeRange, setTimeRange] = useState(isMobile ? "7d" : "90d");

  const { data: students } = useQuery(studentsChartOptions);

  const { data: rawData, courses } = useMemo(
    () => buildChartData(students),
    [students],
  );

  const data = useMemo(
    () => filterByRange(rawData, timeRange),
    [rawData, timeRange],
  );

  const chartConfig = useMemo(() => buildChartConfig(courses), [courses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Matrículas por Curso</CardTitle>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(v) => v && setTimeRange(v)}
            variant="outline"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 dias</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 dias</ToggleGroupItem>
          </ToggleGroup>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })
              }
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    new Date(value).toLocaleDateString("pt-BR");
                  }}
                />
              }
            />

            {courses.map((course) => (
              <Area
                key={course}
                dataKey={course}
                stackId="a"
                stroke={chartConfig[course].color}
                fill={chartConfig[course].color}
                fillOpacity={0.2}
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
