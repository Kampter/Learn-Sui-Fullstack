import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../networkConfig";
import ClipLoader from "react-spinners/ClipLoader";
import { Button, Container } from "@radix-ui/themes";
import { Transaction } from "@mysten/sui/transactions";

export function CreateCounter({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const counterPackageId = useNetworkVariable("counterPackageId");
  const suiClient = useSuiClient();
  const { mutate: signAndExecute, isSuccess, isPending } = useSignAndExecuteTransaction();

  const createTransaction = () => {
    const tx = new Transaction();
    tx.moveCall({
      arguments: [],
      target: `${counterPackageId}::counter::create`,
    });
    console.log("Transaction object:", tx);
    return tx;
  };

  const handleSuccess = async (digest: string) => {
    try {
      console.log("Transaction digest:", digest.trim());
      const { effects } = await suiClient.waitForTransaction({
        digest: digest.trim(),
        options: { showEffects: true },
      });
      console.log("Transaction effects:", effects);

      if (effects) {
        const newCounterId = effects?.created?.[0]?.reference?.objectId;
        onCreated(newCounterId!);
        console.log("Counter created");
        console.log("Counter ID:", newCounterId);
      } else {
        console.error("No effects found for transaction");
      }
    } catch (error) {
      console.error("Error fetching transaction effects:", error);
    }
  };

  const handleError = (error: any) => {
    console.error("Transaction failed:", error);
  };

  const create = () => {
    const tx = createTransaction();
    signAndExecute(
      { transaction: tx },
      { onSuccess: ({ digest }) => handleSuccess(digest), onError: handleError }
    );
  };

  return (
    <Button
      size="3"
      onClick={create}
      disabled={isSuccess || isPending}
      style={{
        background: "linear-gradient(135deg, #00f5d4 0%, #00c2ff 100%)",
        border: "none",
        color: "#000",
        padding: "0 32px",
        height: "44px",
        opacity: isPending ? 0.7 : 1,
        transition: "transform 0.2s ease, opacity 0.2s ease",
        transform: isPending ? "scale(0.98)" : "scale(1)",
      }}
    >
      {isSuccess || isPending ? (
        <ClipLoader size={20} color="#000" />
      ) : (
        "Create Counter"
      )}
    </Button>
  );

}