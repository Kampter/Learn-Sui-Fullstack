import { Container } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import { Layout } from "./Layout";

function App() {
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
          }}
        >
          <WalletStatus />
        </Container>
      </Container>
    </Layout>
  );
}

export default App;