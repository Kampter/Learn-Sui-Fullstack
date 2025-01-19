import { useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit';
 
export function MyComponent() {
    const account = useCurrentAccount();
    const { data, isPending, isError, error, refetch } = useSuiClientQuery(
		'getOwnedObjects',
		{ owner: account?.address as string },
		{
			gcTime: 10000,
		},
	);
 
	if (isPending) {
		return <div>Loading...</div>;
	}
 
	if (isError) {
		return <div>Error: {error.message}</div>;
	}
 
	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
