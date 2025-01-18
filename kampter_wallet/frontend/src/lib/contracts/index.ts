import { networkConfig, suiClient } from "@/networkConfig"; 
import { Wallet, Profile, CoinVault } from "@/type/index";
import { Transaction } from "@mysten/sui/transactions";

export const createProfile = async (name: string, description: string) => {
    const tx = new Transaction();
    tx.moveCall({
        package:networkConfig.testnet.packageID,
        module:"kampter_wallet",
        function:"create_profile",
        arguments: [
            tx.pure.string(name),
            tx.pure.string(description),
            tx.object(networkConfig.testnet.walletID)
        ]
    })
    return tx;
}

export const queryState = async () => {
    const profileCreatedEvents = await suiClient.queryEvents({
        query: {
            MoveEventType: '${networkConfig.testnet.packageID}::kampter_wallet::ProfileCreated'
        }
    });
    const wallet: Wallet = {
        profile: {
            id: '',
            name: '',
            description: ''
        },
        coinVault: {
            coins: []
        }
    }
    console.log(profileCreatedEvents);
    // profileCreatedEvents.data.map((event)=>{
    //     const user = event.parsedJson as User;
    //     state.users.push(user);
    // })
    return profileCreatedEvents;
}
