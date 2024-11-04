"use client"

import { BarList } from "@/components/BarList"
import { useDateFilter } from "@/lib/useDateFilter"
import { useMemo } from "react"

const valueFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`

export const TopPagesTable = ({
  data,
}: {
  data: { time: string; page: string; page_count: number }[]
}) => {
  const filteredData = useDateFilter(data)

  const formattedData = useMemo(() => {
    const pageCountMap: { [key: string]: number } = {}

    filteredData.forEach((item) => {
      const page = item.page === "" ? "/" : item.page
      if (pageCountMap[page]) {
        pageCountMap[page] += Number(item.page_count)
      } else {
        pageCountMap[page] = Number(item.page_count)
      }
    })

    return Object.entries(pageCountMap)
      .map(([page, page_count]) => ({
        name: page,
        value: page_count,
      }))
      .sort((a, b) => b.value - a.value)
  }, [filteredData])

  return (
    <div className="flex basis-full flex-col p-8 md:basis-1/2" key={"a"}>
      <div className="flex items-center justify-between">
        <p className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
          Pages
        </p>
        <span className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Views
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
