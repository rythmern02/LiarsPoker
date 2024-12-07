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
    <div className="flex h-screen w-24 flex-col items-center border-r border-zinc-800 bg-zinc-950/95 py-8 backdrop-blur-sm ">
      {/* Game Logo */}
      <div className="mb-8">
        <img src="/logo.png" alt="Liar's Poker" className="w-12 h-12" />
      </div>

      <nav className="flex flex-1 flex-col items-center gap-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-zinc-900/50 transition-all hover:bg-[#98C23D]/20 hover:scale-105",
                isActive && "bg-[#98C23D]/20 shadow-lg shadow-[#98C23D]/20"
              )}
            >
              <item.icon
                className={cn(
                  "h-6 w-6 text-zinc-400 transition-colors group-hover:text-[#98C23D]",
                  isActive && "text-[#98C23D]"
                )}
              />
              <span
                className={cn(
                  "absolute -bottom-5 text-xs font-medium text-zinc-400 transition-colors group-hover:text-[#98C23D]",
                  isActive && "text-[#98C23D]"
                )}
              >
                {item.name}
              </span>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 rounded-r-full bg-[#98C23D]" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Player Status */}
      <div className="mt-auto pt-6">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-zinc-800 border-2 border-[#98C23D]" />
          <div className="mt-2 h-2 w-2 rounded-full bg-[#98C23D]" />
        </div>
      </div>
    </div>
  )
}

