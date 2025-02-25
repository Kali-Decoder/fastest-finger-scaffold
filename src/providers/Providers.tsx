"use client";
import { WagmiConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PrivyProvider } from "@privy-io/react-auth";
import DataContextProvider from "@/context/DataContext";
import { wagmiConfig } from "@/utils/wallet-utils";
import {chainArray} from "@/utils/chains";
const queryClient = new QueryClient();

const Providers = ({children}) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <PrivyProvider
              appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
              config={{
                // Customize Privy's appearance in your app
                appearance: {
                  theme: "light",
                  accentColor: "#676FFF",
                  logo: "https://docs.privy.io/privy-logo-dark.png",
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                  createOnLogin: "all-users",
                },
                supportedChains: chainArray,
              }}
            >
              <DataContextProvider>
                {children}
              </DataContextProvider>
            </PrivyProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </>
  );
};

export default Providers;
