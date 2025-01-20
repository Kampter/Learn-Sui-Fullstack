import { TransactionBlock } from "@mysten/sui.js/dist/cjs/builder";
import { PACKAGE_ID, SUI_CLIENT } from "./suiClient";
import { AuthService } from "./authService";

// a service to interact with the smart contract using SUI SDK
export class NoteService {

    async addNote(title: string, body: string) {
        const transactionBlock = new TransactionBlock();
        const transactionBlockData = {
            target:'${PACKAGE_ID}::kampter_note::create_note',
            arguments: [
                transactionBlock.pure.string(title),
                transactionBlock.pure.string(body),
            ]
        }
        return this.makeMoveCall(transactionBlockData, transactionBlock);
    }

    async getNotes() {
        const sender = AuthService.walletAddress();
        let ownedObjects = await SUI_CLIENT.getOwnedObjects({
            owner: sender,
        });
        let ownedObjectsDetails = await Promise.all(ownedObjects.data.map(async (object: any) => {
            return await SUI_CLIENT.getObject({
                id: object.id,
                options: {
                    showType: true,
                    showContent: true,
                },
            });
        }));
        return ownedObjectsDetails.filter((object: any) => {
            object.type === '${PACKAGE_ID}::kampter_note::Note'
        }).map((object: any) => {object.data.content['fields']});
    }

    async deleteNote(id: any) {
        const sender = AuthService.walletAddress();
        const transactionBlock = new TransactionBlock();
        transactionBlock.setSender(sender);
        const transactionBlockData = {
            target:'${PACKAGE_ID}::kampter_note::delete_note',
            arguments: [
                transactionBlock.object(id.id)
            ]
        }
        return this.makeMoveCall(transactionBlockData, transactionBlock);
    }

    private async makeMoveCall(transactionBlockData: any, transactionBlock: TransactionBlock) {
        const keyPair = AuthService.getEd25519Keypair();
        const sender = AuthService.walletAddress();
        transactionBlock.setSender(sender);
        transactionBlock.moveCall(transactionBlockData);
        const { bytes, signature: userSignature } = await transactionBlock.sign({
            client: SUI_CLIENT,
            signer: keyPair,
        });
        const getZkLoginSignature = await AuthService.generateZkLoginSignature(userSignature);
        return SUI_CLIENT.executeTransactionBlock({
            transactionBlock: bytes,
            signature: getZkLoginSignature,
        });
    }
}