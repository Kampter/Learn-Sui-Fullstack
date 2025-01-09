import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSuiClient,
    useSuiClientQuery,
} from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useNetworkVariable } from "../networkConfig";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

export function Counter({ id }: { id: string }) {
    const counterPackageId = useNetworkVariable("counterPackageId");
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();
    const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
        id,
        options: {
            showContent: true,
            showOwner: true,
        },
    });

    const [waitingForTxn, setWaitingForTxn] = useState("");

    const executeMoveCall = (method: "increment" | "reset") => {
        setWaitingForTxn(method);

        const tx = new Transaction();

        if (method === "reset") {
            tx.moveCall({
                arguments: [tx.object(id), tx.pure.u64(0)],
                target: `${counterPackageId}::counter::set_value`,
            });
        } else {
            tx.moveCall({
                arguments: [tx.object(id)],
                target: `${counterPackageId}::counter::increment`,
            });
        }

        signAndExecute(
            {
                transaction: tx,
            },
            {
                onSuccess: (tx) => {
                    suiClient.waitForTransaction({ digest: tx.digest }).then(async () => {
                        await refetch();
                        setWaitingForTxn("");
                    });
                },
            },
        );
    };

    if (isPending) return <Text>Loading...</Text>;

    if (error) return <Text>Error: {error.message}</Text>;

    if (!data.data) return <Text>Not found</Text>;

    const ownedByCurrentAccount =
        getCounterFields(data.data)?.owner === currentAccount?.address;
    
    return (
        <>
            <Flex direction="column" gap="4">
                <Text 
                    size="4" 
                    weight="bold" 
                    style={{ 
                        background: "linear-gradient(135deg, #00f5d4 0%, #00c2ff 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    Counter Value: {getCounterFields(data.data)?.value || 0}
                </Text>
                <Flex gap="3">
                    <Button
                        size="3"
                        onClick={() => executeMoveCall("increment")}
                        disabled={waitingForTxn !== ""}
                        style={{
                            background: "linear-gradient(135deg, #00f5d4 0%, #00c2ff 100%)",
                            border: "none",
                            color: "#000",
                            padding: "0 32px",
                            height: "44px",
                            opacity: waitingForTxn ? 0.7 : 1,
                            transition: "transform 0.2s ease, opacity 0.2s ease",
                            transform: waitingForTxn ? "scale(0.98)" : "scale(1)",
                        }}
                    >
                        {waitingForTxn === "increment" ? (
                            <ClipLoader size={20} color="#000" />
                        ) : (
                            "Increment"
                        )}
                    </Button>
                    {ownedByCurrentAccount && (
                        <Button
                            size="3"
                            onClick={() => executeMoveCall("reset")}
                            disabled={waitingForTxn !== ""}
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                color: "#fff",
                                padding: "0 32px",
                                height: "44px",
                                opacity: waitingForTxn ? 0.7 : 1,
                                transition: "transform 0.2s ease, opacity 0.2s ease",
                                transform: waitingForTxn ? "scale(0.98)" : "scale(1)",
                            }}
                        >
                            {waitingForTxn === "reset" ? (
                                <ClipLoader size={20} color="#fff" />
                            ) : (
                                "Reset"
                            )}
                        </Button>
                    )}
                </Flex>
            </Flex>
        </>
    );
}

function getCounterFields(data: SuiObjectData) {
    if (data.content?.dataType !== "moveObject") {
        return null;
    }
    return data.content.fields as { value: number; owner: string };
}
