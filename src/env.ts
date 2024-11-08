import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {
        NEXT_PUBLIC_PRIVY_APP_ID: z.string(),
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_PRIVY_APP_ID: process.env.NEXT_PUBLIC_PRIVY_APP_ID,
    },
    server: {
        WALLET_CONNECT_PROJECT_ID: z.string(),
        PRIVY_APP_SECRET: z.string(),
    },
});