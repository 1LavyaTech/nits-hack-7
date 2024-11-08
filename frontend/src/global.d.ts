interface Window {
    ethereum?: {
        chainId?: string;
        isMetaMask?: true;
        isOpera?: true;
        isCoinbaseWallet?: true;
        isTrust?: true;
        providers?: any[];
        request?: (...args: any[]) => Promise<void>;
    };
    stargazer?: any;
    okxwallet: any;
    tv?: any;
}

type SerializedBigNumber = string;