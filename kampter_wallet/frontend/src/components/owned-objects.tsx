import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    },
  );

  if (!account) {
    return;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isPending || !data) {
    return <div>Loading...</div>;
  }
  // Convert data.data to reverse chronological order for better UX
  const sortedObjects = [...data.data].reverse();

  return (
    <div className="p-6">
      {sortedObjects.length === 0 ? (
        <div className="text-center text-muted p-8 bg-card rounded-lg border">
          <p className="text-lg">No objects owned by the connected wallet</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6">
            Objects owned by the connected wallet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedObjects.map((object) => (
              <div
                key={object.data?.objectId}
                className="p-4 bg-card rounded-lg border hover:bg-accent/50 transition-colors duration-200"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-muted-foreground">Object ID:</span>
                  <span className="text-sm font-mono break-all">
                    {object.data?.objectId}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}