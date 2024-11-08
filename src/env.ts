import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    client: {

    },
    experimental__runtimeEnv: {

    },
    server: {
        WALLET_CONNECT_PROJECT_ID: z.string(),
    },
});