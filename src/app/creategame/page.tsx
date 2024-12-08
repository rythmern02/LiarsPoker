'use client';
import { Press_Start_2P } from "next/font/google";
import { useEthers } from '../../hooks/useEthers';
import { ContractService } from '../../utils/contractService';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

// Floating number component for background effect
const FloatingNumber = ({
  children,
  className,
}: {
  children: string;
  className: string;
}) => (
  <div
    className={`absolute font-[var(--font-minecraft)] text-4xl text-gray-800/10 animate-float ${className}`}
  >
    {children}
  </div>
);

export default function CreateGame() {
  const router = useRouter();
  const { signer } = useEthers();
  const [playerCount, setPlayerCount] : any = useState(2);
  const [entryFee, setEntryFee]: any = useState(100);
  const [isCreating, setIsCreating] = useState(false);
  const [gameMode, setGameMode] = useState<'video' | 'ai'>('video');

  const handleCreateGame = async () => {
    if (!signer) {
      alert('Please connect your wallet first');
      return;
    }
    
    try {
      setIsCreating(true);
      const contractService = new ContractService(signer);
      
      // Create room with player count and entry fee
      const tx = await contractService.createRoom(playerCount);
      const receipt = await tx;
      
      // Get room ID from event
      const event = receipt.events?.find((e: { event: string; }) => e.event === 'RoomCreated');
      const roomId = event?.args?.roomId;
      
      if (!roomId) {
        throw new Error('Failed to get room ID');
      }

      // Redirect to the gameplay page with the new room ID
      router.push(`/gameplay/${roomId}`);
    } catch (error) {
      console.error('Error creating game:', error);
      alert('Failed to create game. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${pixelFont.variable}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

      {/* Floating Numbers Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingNumber className="top-[10%] left-[5%] animate-float-slow">
          A
        </FloatingNumber>
        <FloatingNumber className="top-[45%] left-[15%] animate-float-delayed">
          K
        </FloatingNumber>
        <FloatingNumber className="top-[75%] left-[8%] animate-float">
          Q
        </FloatingNumber>
        <FloatingNumber className="top-[20%] right-[12%] animate-float-slow">
          J
        </FloatingNumber>
      </div>

      <div className="relative z-10 p-8 max-w-4xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl text-white font-[var(--font-pixel)] mb-4 animate-fade-in">
          Create a new Liar's Poker
        </h1>
        <p className="text-zinc-400 text-lg mb-12">Set up your perfect game</p>

        {/* Game Creation Form */}
        <div className="space-y-8">
          {/* Player Count Input */}
          <div className="group bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-800 hover:border-[#98C23D]/50 transition-all">
            <label className="block text-zinc-400 mb-2">
              Number of Players
            </label>
            <input
              type="number"
              min="2"
              max="8"
              value={playerCount}
              onChange={(e) => setPlayerCount(Math.min(8, Math.max(2, parseInt(e.target.value))))}
              className="w-full bg-zinc-900 text-[#98C23D] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#98C23D] transition-all"
              placeholder="2-8 players"
            />
          </div>

          {/* Initial Stake Input */}
          <div className="group bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-800 hover:border-[#98C23D]/50 transition-all">
            <label className="block text-zinc-400 mb-2">
              Initial Stake ($)
            </label>
            <input
              type="number"
              min="100"
              value={entryFee}
              onChange={(e) => setEntryFee(Math.max(100, parseInt(e.target.value)))}
              className="w-full bg-zinc-900 text-[#98C23D] border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#98C23D] transition-all"
              placeholder="Minimum $100"
            />
          </div>

          {/* Game Mode Selection */}
          <div className="space-y-6">
            <h3 className="text-white text-xl font-[var(--font-pixel)]">
              Select Game Mode
            </h3>

            {/* Video & Voice Option */}
            <div 
              onClick={() => setGameMode('video')}
              className="group cursor-pointer bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-800 hover:border-[#98C23D]/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-[#98C23D] flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${gameMode === 'video' ? 'bg-[#98C23D]' : 'bg-transparent'}`} />
                </div>
                <div>
                  <h4 className="text-white text-lg">Video & Voice</h4>
                  <p className="text-zinc-400 text-sm">
                    Full immersive experience with video and voice chat
                  </p>
                </div>
              </div>
            </div>

            {/* AI Text Chat Option */}
            <div 
              onClick={() => setGameMode('ai')}
              className="group cursor-pointer bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 border border-zinc-800 hover:border-[#98C23D]/50 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 rounded-full border-2 border-zinc-700 flex items-center justify-center">
                  <div className={`w-3 h-3 rounded-full ${gameMode === 'ai' ? 'bg-[#98C23D]' : 'bg-transparent'}`} />
                </div>
                <div>
                  <h4 className="text-white text-lg">AI Text Chat</h4>
                  <p className="text-zinc-400 text-sm">
                    Play with AI-powered chat for a unique experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={handleCreateGame}
            disabled={isCreating}
            className={`w-full bg-[#98C23D] hover:bg-[#88b22d] text-black text-lg px-8 py-4 rounded-lg font-medium 
                       transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-[#98C23D]/20
                       flex items-center justify-center gap-2 group
                       ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span>{isCreating ? 'Creating Game...' : 'Create Game'}</span>
            {!isCreating && (
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 flex gap-8 text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#98C23D]/50 animate-ping" />
            <span>Games Created Today: 24</span>
          </div>
          <div>
            Average Stakes: <span className="text-[#98C23D]">$500</span>
          </div>
        </div>
      </div>
    </div>
  );
}
