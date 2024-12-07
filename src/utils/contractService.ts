import { ethers } from 'ethers';
import { ContractAbi } from '../../abi';

const CONTRACT_ADDRESS = "0x62B8e1E96d0BC393650Fdc4211a391C918251049";

export class ContractService {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(signer: ethers.Signer) {
    this.signer = signer;
    this.contract = new ethers.Contract(CONTRACT_ADDRESS, ContractAbi, signer);
  }

  // Room Creation
  async createRoom(entryFee: number) {
    const tx = await this.contract.createRoom(entryFee);
    return await tx.wait();
  }

  // Join Room
  async joinRoom(roomId: number, serialNumber: number, entryFee: number) {
    const tx = await this.contract.joinRoom(roomId, serialNumber, {
      value: ethers.utils.parseEther(entryFee.toString())
    });
    return await tx.wait();
  }

  // Game Actions
  async startGame(roomId: number) {
    const tx = await this.contract.startGame(roomId);
    return await tx.wait();
  }

  async makeBid(roomId: number, digit: number, quantity: number) {
    const tx = await this.contract.makeBid(roomId, digit, quantity);
    return await tx.wait();
  }

  async callLiar(roomId: number) {
    const tx = await this.contract.callLiar(roomId);
    return await tx.wait();
  }

  async revealNumber(roomId: number) {
    const tx = await this.contract.revealNumber(roomId);
    return await tx.wait();
  }

  // View Functions
  async getRoomPlayers(roomId: number) {
    return await this.contract.getRoomPlayers(roomId);
  }

  async getRoomState(roomId: number) {
    return await this.contract.getRoomState(roomId);
  }

  async getCurrentBid(roomId: number) {
    return await this.contract.getCurrentBid(roomId);
  }

  async getCurrentTurn(roomId: number) {
    return await this.contract.getCurrentTurn(roomId);
  }
} 