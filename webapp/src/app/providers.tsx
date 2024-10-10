"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { type State, WagmiProvider } from "wagmi";
import { base } from "wagmi/chains";

import { getConfig } from "@/wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "./chakraTheme";
import { AuthProvider } from "@/hooks/store/useAuth";

export function Providers(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base as any}
        >
          <ChakraProvider theme={customTheme}>
            <AuthProvider>{props.children}</AuthProvider>
          </ChakraProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
