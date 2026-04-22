import type { ChartConfig } from "@/components/ui/chart";

import type { Student } from "../students/validation";

type ChartData = {
  date: string;
} & Record<string, number>;

export function buildChartData(students: Student[] = []) {
  const map = new Map<string, Record<string, number>>();
  const courseSet = new Set<string>();

  for (const s of students) {
    if (!s.createdAt) continue;

    const date = s.createdAt.toDate().toISOString().split("T")[0];
    const course = s.courseName || "Sem curso";

    courseSet.add(course);

    if (!map.has(date)) {
      map.set(date, {});
    }

    const entry = map.get(date)!;
    entry[course] = (entry[course] ?? 0) + 1;
  }

  const courses = Array.from(courseSet);

  const data = Array.from(map.entries())
    .map(([date, values]) => {
      const entry: ChartData = { date };

      for (const course of courses) {
        entry[course] = values[course] ?? 0;
      }

      return entry;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return { data, courses };
}

export function buildChartConfig(courses: string[]) {
  return courses.reduce((acc, course, i) => {
    acc[course] = {
      label: course,
      color: `hsl(${(i * 67) % 360}, 70%, 50%)`,
    };
    return acc;
  }, {} as ChartConfig);
}

export function filterByRange(data: ChartData[], range: string) {
  const now = new Date();

  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;

  const start = new Date();
  start.setDate(now.getDate() - days);

  return data.filter((item) => new Date(item.date) >= start);
}
