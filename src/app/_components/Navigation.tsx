"use client"
import { Button } from "@/components/Button"
import useScroll from "@/lib/useScroll"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useQueryState } from "nuqs"
import { DEFAULT_RANGE } from "../../lib/dateRanges"
import { Logo } from "./Logo"

const navigation = [
  { name: "Website", href: "https://trench.dev", current: false },
  {
    name: "Github",
    href: "https://github.com/frigadehq/trench",
    current: false,
  },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ")
}

export default function Nav() {
  const scrolled = useScroll(10)

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
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <Logo />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current ? "" : "",
                      "px-3 py-2 text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 hover:dark:text-white",
                    )}
                  >
                    {item.name}
                  </a>
                ))}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
