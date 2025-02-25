import { chainArray, transportsObject } from "./chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig } from "wagmi";

const projectId = process.env.NEXT_PUBLIC_RAINBOW_KET_ID;

export const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, metaMaskWallet],
    },
    {
      groupName: "Other",
      wallets: [walletConnectWallet, injectedWallet],
    },
  ],
  {
    appName: "Scaffold",
    projectId: projectId,
  }
);

export const wagmiConfig = createConfig({
  connectors,
  chains: chainArray,
  transports: transportsObject,
});
