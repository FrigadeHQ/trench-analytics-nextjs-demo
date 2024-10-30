"use client"

import { useQueryState } from "nuqs"
import { useMemo } from "react"
import { DEFAULT_RANGE, RANGE_DAYS, RangeKey } from "./dateRanges"

export function useDateFilter<T extends { time: string }>(data: T[]) {
  function dateStringToLocalTimeZoneDate(date: string): Date {
    return new Date(
      new Date(date + "Z").toLocaleString("en-US", {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    )
  }

  const [range] = useQueryState<RangeKey>("range", {
    defaultValue: DEFAULT_RANGE,
    parse: (value): RangeKey =>
      Object.keys(RANGE_DAYS).includes(value)
        ? (value as RangeKey)
        : DEFAULT_RANGE,
  })

  const filteredData = useMemo(() => {
    const currentDate = new Date()
    const filterDate = new Date(currentDate)
    const daysToSubtract = RANGE_DAYS[range] || RANGE_DAYS[DEFAULT_RANGE]
    filterDate.setDate(currentDate.getDate() - daysToSubtract)

    return data.filter(
      (item) => dateStringToLocalTimeZoneDate(item.time) >= filterDate,
    )
  }, [data, range])

  return filteredData
}
