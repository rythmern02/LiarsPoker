'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { ContractService } from '../utils/contractService';

export const useEthers = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [contractService, setContractService] = useState<ContractService | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setIsConnecting(true);
        
        // First request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Then create provider and signer
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const service = new ContractService(signer);

        setProvider(provider);
        setSigner(signer);
        setAccount(address);
        setContractService(service);

        // Setup account change listener
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

      } catch (error) {
        console.error('Failed to connect wallet:', error);
      } finally {
        setIsConnecting(false);
      }
    } else {
      console.error('Please install MetaMask!');
      alert('Please install MetaMask to use this application');
    }
  };

  const handleAccountsChanged = async (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected their wallet
      setAccount(null);
      setSigner(null);
      setContractService(null);
    } else {
      // Account changed, update the state
      setAccount(accounts[0]);
      if (provider) {
        const newSigner = provider.getSigner();
        setSigner(newSigner);
        setContractService(new ContractService(newSigner));
      }
    }
  };

  const handleChainChanged = () => {
    // Reload the page when chain changes
    window.location.reload();
  };

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  // Auto-connect if previously connected
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string | any[]) => {
          if (accounts.length > 0) {
            connectWallet();
          }
        })
        .catch(console.error);
    }
  }, []);

  return {
    provider,
    signer,
    account,
    isConnecting,
    connectWallet,
    contractService
  };
}; 