"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"
import { useQueryState } from "nuqs"
import { useMemo } from "react"
import { DEFAULT_RANGE, RANGE_DAYS, RangeKey } from "./dateRanges"

export const TopPagesTable = ({
  data,
}: {
  data: { time: string; page: string; page_count: number }[]
}) => {
  const [range] = useQueryState<RangeKey>("range", {
    defaultValue: DEFAULT_RANGE,
    parse: (value): RangeKey =>
      Object.keys(RANGE_DAYS).includes(value)
        ? (value as RangeKey)
        : DEFAULT_RANGE,
  })

  const formattedData = useMemo(() => {
    const currentDate = new Date()
    const filterDate = new Date(currentDate)
    const daysToSubtract = RANGE_DAYS[range] || RANGE_DAYS[DEFAULT_RANGE]
    filterDate.setDate(currentDate.getDate() - daysToSubtract)

    const filteredData = data.filter(
      (item) => new Date(item.time) >= filterDate,
    )

    const pageCountMap: { [key: string]: number } = {}

    filteredData.forEach((item) => {
      const page = item.page === "" ? "/" : item.page
      if (pageCountMap[page]) {
        pageCountMap[page] += Number(item.page_count)
      } else {
        pageCountMap[page] = Number(item.page_count)
      }
    })

    return Object.entries(pageCountMap).map(([page, page_count]) => ({
      page,
      page_count,
    }))
  }, [data, range])

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Page</TableHeaderCell>
          <TableHeaderCell>Views</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formattedData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.page}</TableCell>
            <TableCell>{item.page_count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
