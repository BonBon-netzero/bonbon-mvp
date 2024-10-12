import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [base],
    connectors: [
      coinbaseWallet({
        appName: "Bonbon",
        preference: "smartWalletOnly",
        version: "4",
      }),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [base.id]: http(
        `https://api.developer.coinbase.com/rpc/v1/base/${process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}`
      ),
    },
  });
}

declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
