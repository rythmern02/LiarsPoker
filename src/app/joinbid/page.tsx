import { Press_Start_2P } from "next/font/google";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

// Sample game data (replace with your actual data)
const games = [
  {
    id: 1,
    name: "High Rollers Table",
    players: 4,
    maxPlayers: 6,
    buyIn: "1000",
    status: "In Progress",
  },
  {
    id: 2,
    name: "Casual Players",
    players: 2,
    maxPlayers: 4,
    buyIn: "500",
    status: "Waiting",
  },
  {
    id: 3,
    name: "Pro League",
    players: 5,
    maxPlayers: 6,
    buyIn: "2000",
    status: "In Progress",
  },
];

export default function JoinBid() {
  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${pixelFont.variable}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />

      <div className="relative z-10 p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl text-white font-[var(--font-pixel)] mb-4 animate-fade-in">
          Available Tables
        </h1>
        <p className="text-zinc-400 text-lg mb-12">
          Choose your table and join the game
        </p>

        {/* Games List */}
        <div className="space-y-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 border border-zinc-800 hover:border-[#98C23D]/50"
            >
              {/* Glowing effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#98C23D]/0 to-[#98C23D]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              <div className="relative flex items-center justify-between">
                <div className="space-y-3">
                  {/* Game Name */}
                  <h2 className="text-2xl text-white font-semibold tracking-tight">
                    {game.name}
                  </h2>

                  {/* Game Stats */}
                  <div className="flex gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#98C23D] animate-pulse" />
                      <span className="text-zinc-400">
                        {game.players}/{game.maxPlayers} Players
                      </span>
                    </div>
                    <div className="text-zinc-400">
                      Buy-in:{" "}
                      <span className="text-[#98C23D]">${game.buyIn}</span>
                    </div>
                    <div className="text-zinc-400">
                      Status:{" "}
                      <span className="text-[#98C23D]">{game.status}</span>
                    </div>
                  </div>
                </div>

                {/* Join Button */}
                <button
                  className="bg-[#98C23D] hover:bg-[#88b22d] text-black px-6 py-3 rounded-lg font-medium 
                             transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#98C23D]/20
                             flex items-center gap-2 group"
                >
                  <span>Join Table</span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#98C23D] transition-all duration-300"
                  style={{
                    width: `${(game.players / game.maxPlayers) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 flex gap-8 text-zinc-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#98C23D]/50 animate-ping" />
            <span>12 Active Games</span>
          </div>
          <div>
            <span className="text-[#98C23D]">45</span> Players Online
          </div>
          <div>
            Average Buy-in: <span className="text-[#98C23D]">$750</span>
          </div>
        </div>
      </div>
    </div>
  );
}
