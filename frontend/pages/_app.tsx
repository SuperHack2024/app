import { SessionProvider } from "next-auth/react";
import "../styles/styles.css";
import { useRouter } from "next/router";

import type { AppProps } from "next/app";
import type { Session } from "next-auth";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PersistentDrawerLeft from "@/components/Sidebar";
import Footer from "@/components/Footer";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = process.env.WALLETCONNECTPROJECTID as string;

// 2. Create wagmiConfig
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [baseSepolia] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  const router = useRouter();
  const isRootPath = router.pathname === "/";
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          {!isRootPath && <PersistentDrawerLeft />}
          <Component {...pageProps} />
          {!isRootPath && <Footer />}
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
