"use client"

export const Logo = ({}: {}) => (
  <a
    href="/"
    className="flex w-28 items-center gap-x-2.5 md:w-32"
    onClick={(e) => {
      e.preventDefault()
      if (window.location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        window.location.href = "/"
      }
    }}
  >
    <img
      className="hidden h-6 dark:block"
      src="/img/logotype-dark.svg"
      alt=""
    />
    <img
      className="block h-6 dark:hidden"
      src="/img/logotype-light.svg"
      alt=""
    />
  </a>
)
