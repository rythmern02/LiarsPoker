import { Press_Start_2P, Pixelify_Sans } from 'next/font/google'
import Link from 'next/link';


// Choose one of these font configurations
const pixelFont = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel'
})

// Alternative pixel font option
const pixelifyFont = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixelify'
})

// Add this new component above your main component
const FloatingNumber = ({ children, className }: { children: string, className: string }) => (
  <div className={`absolute font-[var(--font-minecraft)] text-4xl text-gray-800/10 animate-float ${className}`}>
    {children}
  </div>
);

export default function LiarSpoker() {

  return (
    <div className={`min-h-screen bg-[#0A0A0A] ${pixelFont.variable}`}>
      {/* Floating Numbers Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingNumber className="top-[10%] left-[5%] animate-float-slow">1</FloatingNumber>
        <FloatingNumber className="top-[45%] left-[15%] animate-float-delayed">4</FloatingNumber>
        <FloatingNumber className="top-[75%] left-[8%] animate-float">2</FloatingNumber>
        <FloatingNumber className="top-[20%] right-[12%] animate-float-slow">6</FloatingNumber>
        <FloatingNumber className="top-[60%] right-[8%] animate-float-delayed">3</FloatingNumber>
        <FloatingNumber className="top-[85%] right-[15%] animate-float">5</FloatingNumber>
        <FloatingNumber className="top-[30%] left-[30%] animate-float-slow">7</FloatingNumber>
        <FloatingNumber className="top-[50%] right-[25%] animate-float">8</FloatingNumber>
      </div>

      {/* Main Content */}
      <div className="p-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto mt-32 relative z-10">
          {/* Pixel Art Logo */}
          <h1 className="text-white text-8xl md:text-[10rem] font-[var(--font-pixel)] tracking-tighter leading-none animate-fade-in">
            LIAR'S POKER
          </h1>

          {/* Tagline */}
          <p className="text-zinc-400 text-2xl md:text-4xl mt-8 font-light tracking-wide">
            Master the Art of Deception
          </p>

          {/* Game Stats */}
          <div className="flex gap-12 mt-12">
            <div className="text-zinc-500">
              <span className="block text-3xl text-[#98C23D] font-bold">
                2.5K+
              </span>
              Active Players
            </div>
            <div className="text-zinc-500">
              <span className="block text-3xl text-[#98C23D] font-bold">
                10K+
              </span>
              Games Played
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-6 mt-12">
            <Link href="/choosegame">
            <button className="bg-[#98C23D] hover:bg-[#88b22d] text-black text-lg px-8 py-4 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#98C23D]/20">
              Play Now
            </button>
            </Link>
            <button className="border border-zinc-700 hover:border-[#98C23D] text-white text-lg px-8 py-4 rounded-lg font-medium transition-all hover:bg-[#98C23D]/10">
              Learn Rules
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] opacity-40">
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#98C23D]/20 via-zinc-800/20 to-transparent rounded-tl-full" />
          <div className="absolute bottom-24 right-24 w-48 h-48 bg-[#98C23D]/30 rounded-tl-[64px] blur-xl" />
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000,transparent)]" />
      </div>
    </div>
  );
}
