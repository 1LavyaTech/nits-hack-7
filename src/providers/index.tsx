"use client";

import { wagmiConfig } from "@/lib/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { ThemeProvider } from "./Theme";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};

export default Providers;
