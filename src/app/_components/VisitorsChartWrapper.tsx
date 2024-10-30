"use client"

import dynamic from "next/dynamic"

// Loading VisitorsChart dynamically to avoid SSR which blocks us from accessing the client's timezone
const VisitorsChart = dynamic(
  () => import("./VisitorsChart").then((mod) => mod.VisitorsChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
    ),
  },
)

export const VisitorsChartWrapper = ({ data }: { data: any }) => {
  return <VisitorsChart data={data} />
}
