import { useCurrentAccount } from "@mysten/dapp-kit";
import { OwnedObjects } from "./owned-objects";

export function WalletStatus() {
  const account = useCurrentAccount();
   
  return (
    <div className="p-4 space-y-4">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      Wallet Status
      </h2>

      {account ? (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span className="text-sm text-muted-foreground">Wallet connected</span>
        </div>
        <div className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
        <p className="text-sm font-mono">
          Address: {account.address}
        </p>
        </div>
      </div>
      ) : (
      <div className="flex items-center space-x-2">
        <div className="h-2 w-2 rounded-full bg-red-500"></div>
        <span className="text-sm text-muted-foreground">Wallet not connected</span>
      </div>
      )}
      
      <div className="mt-6">
      <OwnedObjects />
      </div>
    </div>
  );
}