"use client"

import { BarList } from "@/components/BarList"
import { useDateFilter } from "@/lib/useDateFilter"
import { useMemo } from "react"

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`

export const ReferrersTable = ({
  data,
}: {
  data: { time: string; referrer: string; referrer_count: number }[]
}) => {
  const filteredData = useDateFilter(data)

  const formattedData = useMemo(() => {
    const referrerCountMap: { [key: string]: number } = {}

    filteredData.forEach((item) => {
      const referrer = item.referrer
      if (referrerCountMap[referrer]) {
        referrerCountMap[referrer] += Number(item.referrer_count)
      } else {
        referrerCountMap[referrer] = Number(item.referrer_count)
      }
    })

    return Object.entries(referrerCountMap)
      .map(([name, value]) => ({
        name,
        value,
        href: "https://" + name,
        icon: `https://icons.duckduckgo.com/ip3/${name}.ico`,
      }))
      .sort((a, b) => b.value - a.value)
  }, [filteredData])

  return (
    <div className="flex basis-full flex-col p-8 md:basis-1/2" key={"a"}>
      <div className="flex items-center justify-between">
        <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Referrers
        </p>
        <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Visitors
        </span>
      </div>
      <BarList
        data={formattedData.slice(0, 10)}
        valueFormatter={valueFormatter}
        className="mt-4"
      />
    </div>
  )
}
