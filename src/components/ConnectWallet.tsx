'use client'

import { useEthers } from '../hooks/useEthers'

export const ConnectWallet = () => {
  const { account, isConnecting, connectWallet } = useEthers()

  return (
    <div className="absolute top-4 right-4 z-50">
      {!account ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="px-4 py-2 text-sm bg-zinc-800 text-[#98C23D] rounded-lg hover:bg-zinc-700 
                   transition-colors border border-[#98C23D]/30 hover:border-[#98C23D]"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg border border-[#98C23D]/30">
          <div className="w-2 h-2 rounded-full bg-[#98C23D] animate-pulse" />
          <span className="text-zinc-400 text-sm">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
        </div>
      )}
    </div>
  )
} 