import "@coinbase/onchainkit/styles.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "./components/SideBar";
import Providers from "./components/Providers";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import { createConfig, WagmiProvider } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "LiarsPoker",
  description: "A historical bluffing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: "onchainkit",
      }),
    ],
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  });

  return (
    <html lang="en">
      {/* <WagmiProvider config={wagmiConfig}> */}
        <Providers>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1">{children}</main>
            </div>
          </body>
        </Providers>
      {/* </WagmiProvider> */}
    </html>
  );
}
