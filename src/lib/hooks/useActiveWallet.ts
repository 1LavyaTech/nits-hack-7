


import { useMemo } from "react";
import {
    useAccount,
    usePublicClient,
    useWalletClient,
} from "wagmi";

const useActiveWallet = () => {
    const { address, connector, isConnected, isConnecting, chain, } = useAccount();

    const chainIdEthereum = useMemo(() => {
        if (typeof window !== "undefined" && window.ethereum?.chainId) {
            return Number.parseInt(window.ethereum.chainId, 16);
        }
        return 43_114;
    }, []);

    const chainId = useMemo(() => {
        if (chain && isConnected) return chain?.id;
        return chainIdEthereum;
    }, [chain, chainIdEthereum, isConnected]);

    const provider = usePublicClient({ chainId });
    const { data: signer } = useWalletClient({ chainId });

    const isValid = address && isConnected;

    return {
        address,
        chain,
        chainId,
        connector,
        isConnected: isConnected,
        isConnecting,
        isValid,
        library: provider,
        signer,
    };
};

export default useActiveWallet;