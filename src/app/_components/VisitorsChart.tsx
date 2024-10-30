"use client"

import { AreaChart } from "@/components/AreaChart"
import { useDateFilter } from "@/lib/useDateFilter"
import { useMemo } from "react"

const VALUE_KEY = "Unique Pageviews"
export const VisitorsChart = ({
  data,
}: {
  data: { time: string; value: number }[]
}) => {
  const filteredData = useDateFilter(data)

  const chartData = useMemo(() => {
    return filteredData.map((item) => {
      const utcTime = new Date(item.time)
      const formattedTime = utcTime.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        hour12: true,
      })
      return {
        [VALUE_KEY]: item.value,
        time: formattedTime,
      }
    })
  }, [filteredData])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <h2
            id="visitors-chart-title"
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            Unique Pageviews
          </h2>
        </div>
      </div>

      <AreaChart
        className="h-80"
        data={chartData}
        index="time"
        categories={[VALUE_KEY]}
        valueFormatter={(number: number) =>
          Intl.NumberFormat("us").format(number).toString()
        }
        xAxisLabel="Time"
        yAxisLabel="Visitors"
        fill="solid"
        maxValue={Math.max(...chartData.map((item) => item[VALUE_KEY]))}
      />
    </div>
  )
}
