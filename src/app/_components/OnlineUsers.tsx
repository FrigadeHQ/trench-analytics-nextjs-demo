"use client"

import { getNumberOfOnlineUsersFromTrench } from "@/data/trench"
import { useEffect, useState } from "react"

export function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [targetOnlineUsers, setTargetOnlineUsers] = useState(0)

  useEffect(() => {
    async function fetchAndSetOnlineUsers() {
      const newOnlineUsers = await getNumberOfOnlineUsersFromTrench()
      setTargetOnlineUsers(newOnlineUsers)
    }

    fetchAndSetOnlineUsers()
    const interval = setInterval(fetchAndSetOnlineUsers, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (onlineUsers !== targetOnlineUsers) {
      const step = onlineUsers < targetOnlineUsers ? 1 : -1
      const interval = setInterval(() => {
        setOnlineUsers((prev) => {
          const nextValue = prev + step
          if (nextValue === targetOnlineUsers) {
            clearInterval(interval)
          }
          return nextValue
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [targetOnlineUsers, onlineUsers])

  const hasUsersOnline = onlineUsers > 0
  return (
    <>
      <span
        className={`shrink-0 animate-pulse rounded-full ${
          hasUsersOnline ? "bg-emerald-500/30" : "bg-gray-500/30"
        } p-1`}
        aria-hidden={true}
      >
        <span
          className={`block size-2 rounded-full ${
            hasUsersOnline ? "bg-emerald-500" : "bg-gray-500"
          }`}
        />
      </span>
      <span className="max-w-md text-sm leading-relaxed text-gray-800 dark:text-gray-400">
        {hasUsersOnline ? `${onlineUsers} online` : "No one online"}
      </span>
    </>
  )
}
