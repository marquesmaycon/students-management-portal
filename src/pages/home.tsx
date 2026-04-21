import { ChartAreaInteractive } from "@/features/dashboard/chart-area-interactive";
import { SectionCards } from "@/features/dashboard/section-cards";

export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards />
          <div>
            <ChartAreaInteractive />
          </div>
        </div>
      </div>
    </div>
  );
}
