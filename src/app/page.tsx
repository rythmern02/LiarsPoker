"use client";

import { BuildType, OktoProvider } from "okto-sdk-react";
import LoginPage from "./components/LoginPage";

export default function Home() {
  return (
    <OktoProvider
      apiKey={"0601c20e-0298-4fbf-97cb-d62508d253c8"}
      buildType={BuildType.SANDBOX}
    >
      <div className="flex min-h-screen">
        <main className="flex-1 ml-24">
          <LoginPage />
        </main>
      </div>
    </OktoProvider>
  );
}
