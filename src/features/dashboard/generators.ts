import type { ChartConfig } from "@/components/ui/chart";

import type { Student } from "../students/validation";

type ChartData = {
  date: string;
  [course: string]: string | number;
};

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

export function buildMetrics(students: Student[] = []) {
  const now = new Date();

  const last30 = new Date();
  last30.setDate(now.getDate() - 30);

  const last7 = new Date();
  last7.setDate(now.getDate() - 7);

  const total = students.length;
  let last30Count = 0;
  let last7Count = 0;

  const courseCount: Record<string, number> = {};

  for (const s of students) {
    if (!s.createdAt) continue;

    const date = s.createdAt.toDate();

    if (date >= last30) last30Count++;
    if (date >= last7) last7Count++;

    const course = s.courseName || "Sem curso";
    courseCount[course] = (courseCount[course] ?? 0) + 1;
  }

  const topCourse = Object.entries(courseCount).sort((a, b) => b[1] - a[1])[0];

  const growth = last30Count === 0 ? 0 : (last7Count / last30Count) * 100;

  return {
    total,
    last30Count,
    last7Count,
    growth,
    topCourse: topCourse?.[0] ?? "-",
  };
}

type Metrics = {
  totalStudents: number;
  avgMonthlyGrowth: number;

  mostPopularCourse: {
    name: string;
    total: number;
  };

  leastPopularCourse: {
    name: string;
    total: number;
  };

  last30Days: {
    total: number;
  };
};

export function buildDashboardMetrics(students: Student[] = []): Metrics {
  const now = new Date();

  const last30 = new Date();
  last30.setDate(now.getDate() - 30);

  const totalStudents = students.length;

  const courseTotal: Record<string, number> = {};
  const monthlyBuckets: Record<string, number> = {};

  let last30Total = 0;

  for (const s of students) {
    if (!s.createdAt) continue;

    const date = s.createdAt.toDate();
    const course = s.courseName || "Sem curso";

    courseTotal[course] = (courseTotal[course] ?? 0) + 1;

    if (date >= last30) {
      last30Total++;
    }

    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    monthlyBuckets[monthKey] = (monthlyBuckets[monthKey] ?? 0) + 1;
  }

  const entries = Object.entries(courseTotal);

  const mostPopular = entries.sort((a, b) => b[1] - a[1])[0] ?? ["-", 0];

  const leastPopular = entries.sort((a, b) => a[1] - b[1])[0] ?? ["-", 0];

  const months = Object.values(monthlyBuckets);

  const avgMonthlyGrowth =
    months.length > 0 ? months.reduce((a, b) => a + b, 0) / months.length : 0;

  return {
    totalStudents,
    avgMonthlyGrowth,

    mostPopularCourse: {
      name: mostPopular[0],
      total: mostPopular[1],
    },

    leastPopularCourse: {
      name: leastPopular[0],
      total: leastPopular[1],
    },

    last30Days: {
      total: last30Total,
    },
  };
}