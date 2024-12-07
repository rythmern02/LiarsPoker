import { Press_Start_2P } from 'next/font/google'
import { FaMicrophone, FaVideo, FaVideoSlash, FaMicrophoneSlash } from 'react-icons/fa'
import { BsChatDots } from 'react-icons/bs'

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel'
})

// Mock data for participants (replace with real data later)
const participants = [
  { id: 1, name: "Player 1" },
  { id: 2, name: "Player 2" },
  { id: 3, name: "Player 3" },
  { id: 4, name: "Player 4" },
]

export default function GameplayPage() {
  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${pixelFont.variable} text-white relative`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 p-8">
        {/* Title */}
        <h1 className="text-center text-4xl md:text-6xl font-[var(--font-pixel)] text-[#98C23D] mb-16 animate-pulse">
          Let the Game Begin
        </h1>

        {/* Main Game Area */}
        <div className="flex">
          {/* Left Game Section */}
          <div className="flex-1">
            {/* Participants Circle */}
            <div className="relative h-[500px]">
              {participants.map((player, index) => {
                const angle = (index * 360) / participants.length;
                const radius = 200; // Adjust based on your needs
                const x = Math.cos((angle * Math.PI) / 180) * radius + radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius + radius;

                return (
                  <div
                    key={player.id}
                    className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: x, top: y }}
                  >
                    <div className="w-full h-full rounded-full bg-[#98C23D]/20 border-2 border-[#98C23D] flex items-center justify-center hover:scale-110 transition-transform">
                      <span className="text-sm">{player.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Serial Number Card */}
            <div className="mt-8 max-w-md mx-auto">
              <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl text-[#98C23D] mb-4">Your Serial Number</h3>
                <div className="flex justify-center gap-4 text-3xl font-bold">
                  <span className="bg-zinc-800 px-4 py-2 rounded-lg">2</span>
                  <span className="bg-zinc-800 px-4 py-2 rounded-lg">3</span>
                  <span className="bg-zinc-800 px-4 py-2 rounded-lg">5</span>
                  <span className="bg-zinc-800 px-4 py-2 rounded-lg">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 ml-8 flex flex-col gap-6">
            {/* Media Controls */}
            <div className="flex gap-4 justify-center">
              <button className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-[#98C23D] flex items-center justify-center transition-colors">
                <FaVideo className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-zinc-800 hover:bg-[#98C23D] flex items-center justify-center transition-colors">
                <FaMicrophone className="w-5 h-5" />
              </button>
            </div>

            {/* Bids Section */}
            <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-4 backdrop-blur-sm">
              <h3 className="text-lg text-[#98C23D] mb-4">Recent Bids</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((bid) => (
                  <div key={bid} className="flex items-center gap-3 text-sm">
                    <span className="text-zinc-400">Player {bid}:</span>
                    <span className="text-white">Three 8s</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Section */}
            <div className="flex-1 bg-zinc-900/80 border border-zinc-700 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <BsChatDots className="text-[#98C23D]" />
                <h3 className="text-lg text-[#98C23D]">Chat</h3>
              </div>
              <div className="h-48 overflow-y-auto mb-4 space-y-2">
                {/* Chat messages would go here */}
                <div className="text-sm">
                  <span className="text-zinc-400">Player 1: </span>
                  <span>Good luck everyone!</span>
                </div>
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-zinc-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#98C23D]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 