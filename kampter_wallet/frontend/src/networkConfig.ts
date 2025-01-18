import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } = 
    createNetworkConfig({
        testnet: {
            url: getFullnodeUrl("testnet"),
            packageID: "0x7e34134bc9c9d20cde6be5c34ed89b63f6af21dfeb4945f87a365013c4b90bec", // Package ID of the contract
            walletID: "0xdb90d6aed1e7b026b1556876e7850a7dd62a69bbd946d72b3a63f79e41a05178"
        },
    });

const suiClient = new SuiClient({
    url: networkConfig.testnet.url,
});

export { networkConfig, suiClient, useNetworkVariable, useNetworkVariables };