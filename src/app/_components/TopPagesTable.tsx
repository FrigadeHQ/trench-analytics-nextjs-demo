"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"

export const TopPagesTable = ({
  data,
}: {
  data: { page: string; page_count: number }[]
}) => {
  const formattedData = data.map((item) => ({
    page: item.page === "" ? "/" : item.page,
    page_count: item.page_count,
  }))

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
            <TableCell>{item.page_count.toLocaleString("en-US")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
