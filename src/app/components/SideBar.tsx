"use client"

import { Home, Layers, PlayCircle, User, BookOpen, Wallet } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils";
import { useEthers } from '../../hooks/useEthers';

const navigation = [
  {
    name: "Home",
    href: "/homepage",
    icon: Home
  },
  {
    name: "Ongoing Bids",
    href: "/joinbid",
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
  const pathname = usePathname();
  const { account, isConnecting, connectWallet } = useEthers();

  return (
    <div className="flex h-screen w-24 flex-col items-center border-r border-zinc-800 bg-zinc-950/95 py-8 backdrop-blur-sm z-20">
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

      {/* Wallet Connection Section */}
      <div className="mt-auto pt-6 w-full px-3">
        {!account ? (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full group relative flex flex-col items-center justify-center rounded-xl 
                     bg-[#98C23D]/10 hover:bg-[#98C23D]/20 transition-all hover:scale-105 py-4
                     border border-[#98C23D]/30 hover:border-[#98C23D]/50"
          >
            <Wallet className="h-6 w-6 text-[#98C23D] mb-1" />
            <span className="text-xs font-medium text-[#98C23D]">
              {isConnecting ? 'Connecting...' : 'Connect'}
            </span>
          </button>
        ) : (
          <div className="w-full flex flex-col items-center gap-2">
            <div className="w-full py-3 px-2 rounded-xl bg-[#98C23D]/10 border border-[#98C23D]/30">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#98C23D] animate-pulse" />
                <span className="text-xs text-[#98C23D] truncate">
                  {`${account.slice(0, 4)}...${account.slice(-4)}`}
                </span>
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-[#98C23D]/20 animate-ping" />
          </div>
        )}
      </div>
    </div>
  )
}

