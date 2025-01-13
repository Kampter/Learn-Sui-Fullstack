import './App.css'
import { ConnectButton, useCurrentAccount, useSuiClientQuery } from '@mysten/dapp-kit'
import { ModeToggle } from './components/mode-toggle'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ModeToggle />
      </header>
      <header className="App-header">
        <ConnectButton />
      </header>
      <body className="App-body">
        <ConnectedAccount />
      </body>
    </div>
  )
}

function ConnectedAccount() {
	const account = useCurrentAccount();

	if (!account) {
		return null;
	}

  return (
		<div>
			<div>Connected to {account.address}</div>;
			<OwnedObjects address={account.address} />
		</div>
	);
}

function OwnedObjects({ address }: { address: string }) {
  const { data } = useSuiClientQuery('getOwnedObjects', { 
    owner: address, 
  });
  if (!data) {
    return null;
  }

  return(
    <div>
      <h1>Owned Objects</h1>
      <ul>
        {data.data.map((object) => (
          <li key={object.data?.objectId}>
            <a href={`https://example-explorer.com/object/${object.data?.objectId}`}>
              {object.data?.objectId}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )

}

export default App