"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"
import { useDateFilter } from "@/lib/useDateFilter"
import { useMemo } from "react"

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

    return Object.entries(pageCountMap).map(([page, page_count]) => ({
      page,
      page_count,
    }))
  }, [filteredData])

  return (
    <div className="flex basis-full flex-col p-8 md:basis-1/2">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        Top Pages
      </h2>
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
    </div>
  )
}
