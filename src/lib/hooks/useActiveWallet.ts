

import { useRouter } from "next/router";
import { useMemo } from "react";
import { isAddress, type Address, } from "viem";
import {

    useAccount,
    usePublicClient,
    useWalletClient,
} from "wagmi";

const useActiveWallet = () => {
    const { address, connector, isConnected, isConnecting, chain, } = useAccount();
    const { query, } = useRouter();
    const { account: addressFromUrl } = query;


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



    const assumedAccount = isAddress(addressFromUrl as Address)
        ? (addressFromUrl as Address)
        : null;

    const account = assumedAccount ?? address;
    const isValid = account && isConnected;


    return {
        account,
        chain,
        chainId,
        connector,
        isConnected: assumedAccount ? true : isConnected,
        isConnecting,
        isValid,
        library: provider,
        signer,
    };
};

export default useActiveWallet;