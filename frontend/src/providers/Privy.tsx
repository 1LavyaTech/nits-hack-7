"use client";

import { env } from "@/env";
import { wagmiConfig } from "@/lib/wagmi";
import { PrivyProvider } from "@privy-io/react-auth";
import { useTheme } from "next-themes";

export default function PrivyProviderInternal({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <PrivyProvider
      appId={env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={{
        appearance: {
          theme: (theme ?? "light") as any,
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        loginMethods: ["google", "email", "wallet"],
        supportedChains: wagmiConfig.chains as any,
      }}
    >
      {children}
    </PrivyProvider>
  );
}
