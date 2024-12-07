import React from 'react'

const ChooseGame = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
      {/* Title Section */}
      <h1 className="text-5xl font-bold text-white mb-16 mt-8 text-center">
        Let The Game Begin
      </h1>

      {/* Cards Container */}
      <div className="flex flex-wrap gap-8 justify-center items-center max-w-6xl w-full">
        {/* Join Game Card */}
        <button className="w-96 h-64 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center p-6 border-2 border-emerald-500/20 hover:border-emerald-500/50">
          <h2 className="text-3xl font-bold text-emerald-400 mb-4">Join a Poker</h2>
          <p className="text-gray-400">Enter an existing poker game</p>
        </button>

        {/* Create Game Card */}
        <button className="w-96 h-64 bg-gradient-to-br from-emerald-900 to-emerald-800 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center p-6 border-2 border-emerald-500/20 hover:border-emerald-500/50">
          <h2 className="text-3xl font-bold text-emerald-400 mb-4">Create a Poker</h2>
          <p className="text-gray-400">Start your own poker game</p>
        </button>
      </div>
    </div>
  )
}

export default ChooseGame