"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import { Button } from "@/components/Button"
import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useQueryState } from "nuqs"
import { DEFAULT_RANGE } from "../../lib/dateRanges"
import { FilterDate } from "./FilterDate"

export default function Header() {
  const scrolled = useScroll(10)
  const { theme, setTheme } = useTheme()

  const [, setRange] = useQueryState("range")
  const [, setExpenseStatus] = useQueryState("expense_status")
  const [, setAmountRange] = useQueryState("amount_range")
  const [, setSelectedCountries] = useQueryState("countries")

  const handleResetFilters = () => {
    setRange(DEFAULT_RANGE)
    setExpenseStatus(null)
    setAmountRange(null)
    setSelectedCountries(null)
  }

  return (
    <section
      aria-labelledby="reports-title"
      className={cx(
        "sticky top-0 z-50 -my-6 flex flex-col gap-6 bg-white py-6 md:flex-row md:flex-wrap md:items-center md:justify-between lg:top-0 dark:bg-gray-925",
        scrolled &&
          "border-b border-gray-200 transition-all dark:border-gray-900",
      )}
    >
      <div className="space-y-1">
        <h1
          id="reports-title"
          className="text-lg font-semibold text-gray-900 dark:text-gray-50"
        >
          Trench Analytics Dashboard Demo
        </h1>
        <p className="max-w-prose text-sm text-gray-600 dark:text-gray-400">
          This demo showcases a Google Analytics-style dashboard that queries
          data from a Trench server that tracks page views on{" "}
          <a
            href="https://trench.dev"
            target="_blank"
            className="text-blue-500 hover:underline"
            rel="noopener noreferrer"
          >
            https://trench.dev
          </a>
          .
          <p className="mt-2">
            <a
              href="https://github.com/FrigadeHQ/trench-analytics-nextjs-demo.git"
              target="_blank"
              className="text-blue-500 hover:underline"
              rel="noopener noreferrer"
            >
              View Source Code
            </a>
          </p>
        </p>
      </div>
      <Accordion type="single" collapsible className="block md:hidden">
        <AccordionItem className="rounded-md border" value="1">
          <AccordionTrigger className="px-4 py-2.5">Filters</AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <FilterDate />
              <Button
                variant="light"
                className="h-fit dark:border-gray-800"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="hidden items-end gap-3 md:flex md:flex-wrap">
        <FilterDate />
        <Button
          variant="light"
          className="h-fit dark:border-gray-800"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
        <Button
          variant="ghost"
          className="h-fit"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </section>
  )
}
