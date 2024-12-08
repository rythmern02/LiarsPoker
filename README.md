# Liar's Poker Game 🎲💸

Welcome to **Liar's Poker**, an exciting, decentralized game of bluffing, bidding, and strategy based on **Base smart contracts**! This is the Web3 version of the classic **Liar’s Poker**, where players receive random notes with serial numbers and bid on the occurrence of numbers, trying to bluff and challenge each other to win the pool or lose based on their claims.

This game leverages the **Base Sepolia testnet** and a smart contract deployed on the **Base Sepolia network**.

---

## 🚀 **How to Play**

1. **Get Your Random Notes**  
   At the start of each round, each player is given a random note containing a serial number. The serial number is generated using **secure randomization** to ensure fairness and unpredictability.

2. **Start Bidding**  
   Players bid on the occurrence of a specific serial number. For example, a player may bid that they have **3 notes with serial number 12345**. The other players may believe or challenge this bid based on their own notes and intuition.

3. **Bluff or Challenge**  
   Players have the option to either **bluff** and bid high, or **challenge** the bid if they suspect that someone is lying. The tension builds as players try to figure out if the numbers match the claimed bids.

4. **Winning and Losing**  
   - If the **bluff is successful**, the **challenger loses** their stake, and the **bluffer wins** the pool.
   - If the **challenge is correct**, the **bluffer loses**, and the **challenger wins** the pool.
   - The game continues with new rounds, where players can adjust their strategies, increase their bids, or hold their ground.

5. **Smart Contract Integration**  
   All bets, challenges, and outcomes are settled automatically on the blockchain via our **Sepolia smart contract**.

---

## 📜 **Contract Details**

The game is powered by an **Ethereum smart contract** deployed on the **Sepolia network**. This ensures that all actions in the game are transparent, secure, and fully decentralized.

### Smart Contract Address:  
```
0x62b8e1e96d0bc393650fdc4211a391c918251049
```

This contract handles:
- **Note serial number generation** and assignment to players.
- **Bidding and bluffing mechanics** for determining winners and losers.
- **Challenge logic** to verify bids and determine whether a bluff has succeeded or failed.
- **Win and loss pools** which automatically transfer winnings or losses to players' wallets.

---

## 🔧 **Setup and Installation**

### Requirements:
- **MetaMask** or any Web3-compatible wallet.
- **Sepolia Testnet ETH** (Get test ETH from a Sepolia faucet).
- A Web3-enabled browser (e.g., Chrome with MetaMask extension).

### Steps:
1. **Install MetaMask**:  
   Install MetaMask in your browser if you haven’t already:  
   [MetaMask Extension](https://metamask.io/download.html)
   
2. **Switch to Sepolia Network**:  
   In MetaMask, switch to the **Sepolia** test network.

3. **Get Test ETH**:  
   Get Sepolia test ETH from a faucet:  
   [Sepolia Faucet](https://faucet.sepolia.dev/)

4. **Interact with the Contract**:  
   Use a Web3 interface like **Remix** or any front-end integration to interact with the smart contract. You can also play directly through a custom game interface (if available).

---

## 🔍 **Smart Contract Functions**

The smart contract provides the following functions for game mechanics:

1. **startGame()** - Starts a new game round.
2. **bid(uint256 serialNumber, uint256 bidAmount)** - Players place bids on serial numbers.
3. **challenge(uint256 serialNumber, uint256 claimAmount)** - Challenges the opponent’s bid.
4. **endGame()** - Ends the round and distributes the pool to the winner.
5. **getPlayerNotes(address player)** - Get the notes and serial numbers of a specific player.

---

## 🛠 **Contributing**

We welcome contributions to improve the game! If you'd like to help, feel free to fork the repository and submit a pull request.

To contribute:
1. Fork this repository.
2. Make your changes.
3. Submit a pull request with a clear explanation of what you’ve added or improved.

---

## 🎉 **Join the Game**

Ready to bluff your way to victory? Start a new round, challenge your friends, and test your strategic skills in **Liar’s Poker**! 

---

## 📜 **Disclaimer**

This game is a **testnet project** on the **Sepolia** network, and all in-game currency is non-real and used only for testing. Do not use real assets or expect real-world value from the tokens and outcomes.

Happy playing and may the best bluffer win! 🏆
