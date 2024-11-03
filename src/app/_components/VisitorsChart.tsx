"use client"

import { AreaChart } from "@/components/AreaChart"
import {
  dateStringToLocalTimeZoneDate,
  useDateFilter,
} from "@/lib/useDateFilter"
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
      const utcTime = new Date(dateStringToLocalTimeZoneDate(item.time))
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
    <div className="flex basis-full p-8">
      <AreaChart
        className="h-80"
        data={chartData}
        index="time"
        categories={[VALUE_KEY]}
        valueFormatter={(number: number) =>
          Intl.NumberFormat("us").format(number).toString()
        }
        fill="solid"
        maxValue={Math.max(...chartData.map((item) => item[VALUE_KEY]))}
      />
    </div>
  )
}
