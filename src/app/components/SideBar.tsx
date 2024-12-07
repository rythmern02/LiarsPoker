"use client"

import { Home, Layers, PlayCircle, User, BookOpen } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: Home
  },
  {
    name: "Ongoing Bids",
    href: "/bids",
    icon: Layers
  },
  {
    name: "Tutorials",
    href: "/tutorials",
    icon: PlayCircle
  },
  {
    name: "My Avatars",
    href: "/avatars",
    icon: User
  },
  {
    name: "Rules",
    href: "/rules",
    icon: BookOpen
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-20 flex-col items-center border-r bg-zinc-950 py-8">
      <nav className="flex flex-1 flex-col items-center gap-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex h-16 w-16 flex-col items-center justify-center rounded-full bg-zinc-900 transition-all hover:bg-zinc-800",
                isActive && "bg-zinc-800"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 text-zinc-400 transition-colors group-hover:text-zinc-100",
                  isActive && "text-zinc-100"
                )}
              />
              <span
                className={cn(
                  "absolute -bottom-5 text-xs text-zinc-400 transition-colors group-hover:text-zinc-100",
                  isActive && "text-zinc-100"
                )}
              >
                {item.name}
              </span>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-white" />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

