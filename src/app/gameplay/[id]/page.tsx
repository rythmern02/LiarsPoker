'use client';

import { useState, useEffect, useCallback, use } from 'react';
import { Press_Start_2P } from 'next/font/google';
import { FaMicrophone, FaVideo } from 'react-icons/fa';
import { BsChatDots } from 'react-icons/bs';
import { useEthers } from '@/hooks/useEthers';
import { ContractService } from '@/utils/contractService';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
import { useRef } from 'react';

const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
});

// Mock data for demonstration purposes
const mockParticipants = [
  { id: 1, name: 'Player 1' },
  { id: 2, name: 'Player 2' },
  { id: 3, name: 'Player 3' },
  { id: 4, name: 'Player 4' },
];

// Add computer player names
const computerNames = ['Bot Alpha', 'Bot Beta', 'Bot Gamma'];

export default function GameplayPage({ params }: any) {
  const router: any = useRouter();
  const resolvedParams: any = use(params);
  const roomId: any = resolvedParams.id;
  const { signer, address }: any = useEthers();
  const [isHost, setIsHost] = useState(false);
  const [gameStatus, setGameStatus] = useState<'waiting' | 'playing' | 'ended'>('waiting');
  const [gameState, setGameState] = useState<any>(null);
  const [currentBid, setCurrentBid] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [currentTurn, setCurrentTurn] = useState<any>(null);
  const socketRef = useRef<Socket | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isPlayingWithBots, setIsPlayingWithBots] = useState(false);

  // Initialize socket connection with better error handling and logging
  useEffect(() => {
    if (!address || !roomId) {
      console.log('Missing address or roomId');
      return;
    }

    // Create socket connection
    socketRef.current = io('http://localhost:3001', {
      query: { roomId, address },
      transports: ['websocket'],
      reconnection: true,
    });

    // Log connection status
    socketRef.current.on('connect', () => {
      console.log('Connected to socket server');
      // Emit join room event when connected
      socketRef.current?.emit('joinRoom', { roomId, address });
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Socket event listeners with logging
    socketRef.current.on('playerJoined', (updatedPlayers: any[]) => {
      console.log('Player joined event received:', updatedPlayers);
      setPlayers(updatedPlayers);
      
      // Start countdown when player joins
      console.log('Starting countdown');
      setCountdown(15);
    });

    socketRef.current.on('playerLeft', (updatedPlayers: any[]) => {
      console.log('Player left event received:', updatedPlayers);
      setPlayers(updatedPlayers);
      
      // Cancel countdown if not enough players
      if (updatedPlayers.length < 2) {
        console.log('Canceling countdown - not enough players');
        setCountdown(null);
      }
    });

    socketRef.current.on('gameStarted', (gameData: any) => {
      console.log('Game started event received:', gameData);
      setGameStatus('playing');
      setGameState(gameData);
    });

    socketRef.current.on('newBid', (bid: any) => {
      console.log('New bid received:', bid);
      setCurrentBid(bid);
    });

    socketRef.current.on('turnChanged', (newTurn: string) => {
      console.log('Turn changed to:', newTurn);
      setCurrentTurn(newTurn);
    });

    // Cleanup function
    return () => {
      console.log('Cleaning up socket connection');
      if (socketRef.current) {
        socketRef.current.emit('leaveRoom', { roomId, address });
        socketRef.current.disconnect();
      }
    };
  }, [address, roomId]);

  // Modify countdown effect to add bots when timer ends
  useEffect(() => {
    if (countdown === null || countdown <= 0) return;

    console.log(`Countdown: ${countdown} seconds remaining`);
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          console.log('Countdown finished, adding bots');
          // Add bot players
          const bots = computerNames.map((name, index) => ({
            address: `bot-${index}`,
            name,
            isBot: true
          }));
          setPlayers(currentPlayers => [...currentPlayers, ...bots]);
          setIsPlayingWithBots(true);
          handleStartGame();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  // Add bot logic for making moves
  useEffect(() => {
    if (!isPlayingWithBots || gameStatus !== 'playing') return;
    
    // Simulate bot moves when it's their turn
    if (currentTurn?.startsWith('bot-')) {
      const botMoveTimeout = setTimeout(() => {
        // Simple bot logic - random moves
        const digit = Math.floor(Math.random() * 6) + 1;
        const quantity = Math.floor(Math.random() * 10) + 1;
        handleMakeBid(digit, quantity);
      }, 2000); // 2 second delay for bot moves

      return () => clearTimeout(botMoveTimeout);
    }
  }, [currentTurn, isPlayingWithBots, gameStatus]);

  // Improved game actions
  const handleStartGame = async () => {
    if (!socketRef.current?.connected) {
      console.error('Socket not connected');
      return;
    }
    
    try {
      console.log('Emitting startGame event');
      socketRef.current.emit('startGame', { roomId, address });
    } catch (error) {
      console.error('Error starting game:', error);
    }
  };

  const handleMakeBid = async (digit: number, quantity: number) => {
    if (!socketRef.current?.connected) {
      console.error('Socket not connected');
      return;
    }
    
    try {
      console.log('Emitting makeBid event:', { digit, quantity });
      socketRef.current.emit('makeBid', { roomId, address, digit, quantity });
    } catch (error) {
      console.error('Error making bid:', error);
    }
  };

  const handleCallLiar = async () => {
    if (!socketRef.current?.connected) {
      console.error('Socket not connected');
      return;
    }
    
    try {
      console.log('Emitting callLiar event');
      socketRef.current.emit('callLiar', { roomId, address });
    } catch (error) {
      console.error('Error calling liar:', error);
    }
  };

  // Update the render method to show more detailed player information
  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${pixelFont.variable} text-white relative`}>
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 p-8">
        {/* Game Status Banner */}
        <div className="text-center mb-4">
          {gameStatus === 'waiting' && (
            <div className="bg-yellow-500/20 text-yellow-500 py-2 rounded-lg">
              <div>Players in room: {players.length}/4</div>
              <div className="mt-2">
                {players.map((player, index) => (
                  <div key={player.address} className="text-sm">
                    Player {index + 1}: {player.address.slice(0, 6)}...
                    {player.address.toLowerCase() === address?.toLowerCase() && ' (You)'}
                  </div>
                ))}
              </div>
              {countdown !== null && (
                <div className="mt-2 font-bold">
                  Game starting in: {countdown} seconds
                </div>
              )}
            </div>
          )}
        </div>

        {/* Page Title */}
        <h1 className="text-center text-4xl md:text-6xl font-[var(--font-pixel)] text-[#98C23D] mb-16 animate-pulse">
          Room: {roomId} - {gameStatus === 'playing' ? "Game In Progress" : "Waiting Room"}
        </h1>

        {gameStatus === 'playing' ? (
          <div className="flex">
            {/* Existing game components */}
            <div className="flex-1">
              <ParticipantsCircle 
                participants={players} 
                currentTurn={currentTurn}
                currentPlayer={address}
              />
              <PlayerSerialNumbers numbers={[2, 3, 5, 8]} />
            </div>

            <Sidebar
              currentBid={currentBid}
              handleMakeBid={handleMakeBid}
              handleCallLiar={handleCallLiar}
              isPlayerTurn={currentTurn?.toLowerCase() === address?.toLowerCase()}
            />
          </div>
        ) : (
          // Waiting room view
          <div className="flex justify-center items-center h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl text-[#98C23D] mb-4">Players in Room</h2>
              <div className="space-y-2">
                {players.map((player, index) => (
                  <div key={player.address} className="flex items-center gap-2">
                    <span className="text-zinc-400">Player {index + 1}:</span>
                    <span className="text-white">{player.address.slice(0, 6)}...{player.address.slice(-4)}</span>
                    {player.address.toLowerCase() === address?.toLowerCase() && (
                      <span className="text-[#98C23D]">(You)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Participant Circle Component
const ParticipantsCircle = ({ participants, currentTurn, currentPlayer }: { participants: any[], currentTurn: any, currentPlayer: any }) => {
  return (
    <div className="relative h-[500px] flex items-center justify-center">
      <div className="absolute w-32 h-32 rounded-full bg-zinc-900/80 border-2 border-[#98C23D] flex items-center justify-center z-10">
        <div className="text-center">
          <div className="text-sm text-zinc-400">Current Bid</div>
          <div className="text-2xl text-[#98C23D] font-bold">12</div>
        </div>
      </div>
      {participants.map((player, index) => {
        const angle = (index * 360) / participants.length;
        const radius = 150;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div
            key={player.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
          >
            <div className="w-20 h-20 rounded-full bg-[#98C23D]/20 border-2 border-[#98C23D] flex items-center justify-center">
              <span className="text-sm">{player.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Player Serial Numbers Component
const PlayerSerialNumbers = ({ numbers }: { numbers: number[] }) => {
  return (
    <div className="mt-8 max-w-md mx-auto">
      <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-6 backdrop-blur-sm">
        <h3 className="text-xl text-[#98C23D] mb-4">Your Serial Number</h3>
        <div className="flex justify-center gap-4 text-3xl font-bold">
          {numbers.map((num, idx) => (
            <span key={idx} className="bg-zinc-800 px-4 py-2 rounded-lg">
              {num}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({
  currentBid,
  handleMakeBid,
  handleCallLiar,
  isPlayerTurn,
}: {
  currentBid: any;
  handleMakeBid: Function;
  handleCallLiar: Function;
  isPlayerTurn: boolean;
}) => {
  return (
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

      {/* Recent Bids */}
      <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-4 backdrop-blur-sm">
        <h3 className="text-lg text-[#98C23D] mb-4">Recent Bids</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-zinc-400">Player 1:</span>
            <span className="text-white">Three 8s</span>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 bg-zinc-900/80 border border-zinc-700 rounded-xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <BsChatDots className="text-[#98C23D]" />
          <h3 className="text-lg text-[#98C23D]">Chat</h3>
        </div>
        <div className="h-48 overflow-y-auto mb-4 space-y-2">
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
  );
};
