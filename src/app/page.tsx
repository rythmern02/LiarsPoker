"use client";

import LoginPage from "./components/LoginPage";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 ml-24">
        <LoginPage />
      </main>
    </div>
  );
}
