import { Container } from "@radix-ui/themes";
import { WalletStatus } from "./components/WalletStatus";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useState, useEffect } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { CounterRouter } from "./components/CounterRouter";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Container 
          size="3" 
          style={{ 
            flex: 1, 
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <LoadingSpinner />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container size="3" style={{ flex: 1, padding: "24px" }}>
        <Container
          style={{
            background: "rgba(28, 28, 28, 0.4)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(12px)",
            padding: "32px",
            opacity: 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <WalletStatus account={currentAccount}/>
          <CounterRouter account={currentAccount} />
        </Container>
      </Container>
    </Layout>
  );
}

export default App;
