"use client";

import type { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "wagmi/chains";
import { createConfig, http, WagmiConfig } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

export default function Providers({ children }: { children: ReactNode }) {
  if (!process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_ONCHAINKIT_API_KEY");
  }
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
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ""}
      chain={baseSepolia}
    >
      {children}
    </OnchainKitProvider>
  );
}
