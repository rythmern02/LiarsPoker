import React, { useState } from "react";
import { WalletDefault } from "@coinbase/onchainkit/wallet";

function LoginPage() {
  return (
    <div>
      <WalletDefault />
    </div>
  );
}

export default LoginPage;
