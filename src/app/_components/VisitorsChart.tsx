"use client"

import { AreaChart } from "@/components/AreaChart"
import { dateStringToLocalTimeZoneDate } from "@/lib/utils"
import { useQueryState } from "nuqs"
import { useMemo } from "react"
import { DEFAULT_RANGE, RANGE_DAYS, RangeKey } from "./dateRanges"

const VALUE_KEY = "Unique Pageviews"
export const VisitorsChart = ({
  data,
}: {
  data: { time: string; value: number }[]
}) => {
  const [range] = useQueryState<RangeKey>("range", {
    defaultValue: DEFAULT_RANGE,
    parse: (value): RangeKey =>
      Object.keys(RANGE_DAYS).includes(value)
        ? (value as RangeKey)
        : DEFAULT_RANGE,
  })

  const chartData = useMemo(() => {
    const currentDate = new Date()
    const filterDate = new Date(currentDate)
    const daysToSubtract = RANGE_DAYS[range] || RANGE_DAYS[DEFAULT_RANGE]
    filterDate.setDate(currentDate.getDate() - daysToSubtract)

    return data
      .map((item) => ({
        ...item,
        time: dateStringToLocalTimeZoneDate(item.time),
      }))
      .filter((item) => new Date(item.time) >= filterDate)
      .map((item) => {
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
  }, [data, range])

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
