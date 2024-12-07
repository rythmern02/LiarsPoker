"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";
import { BuildType, OktoProvider } from "okto-sdk-react";
import LoginPage from "./components/LoginPage";
import { Sidebar } from "./components/SideBar";

export default function Home() {
  return (
    <div>
      <OktoProvider
        apiKey={"0601c20e-0298-4fbf-97cb-d62508d253c8"}
        buildType={BuildType.SANDBOX}
      >
        <Sidebar/>
        <LoginPage />
      </OktoProvider>
    </div>
  );
}
