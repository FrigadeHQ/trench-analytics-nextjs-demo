"use client"
import { Button } from "@/components/Button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Logo } from "./Logo"

const navigation = [
  { name: "Website", href: "https://trench.dev", current: false },
  {
    name: "Github",
    href: "https://github.com/FrigadeHQ/trench-analytics-nextjs-demo",
    current: false,
  },
]

export default function Nav() {
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
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="h-fit"
                    onClick={() => window.open(item.href, "_blank")}
                  >
                    {item.name}
                  </Button>
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
