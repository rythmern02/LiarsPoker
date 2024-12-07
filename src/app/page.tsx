"use client";

import { BuildType, OktoProvider } from "okto-sdk-react";
import LoginPage from "./components/LoginPage";

export default function Home() {
  return (
    <div>
      <OktoProvider
        apiKey={"0601c20e-0298-4fbf-97cb-d62508d253c8"}
        buildType={BuildType.SANDBOX}
      >
        <LoginPage />
      </OktoProvider>
    </div>
  );
}
