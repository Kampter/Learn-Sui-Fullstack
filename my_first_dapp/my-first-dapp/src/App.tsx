import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";

function App() {
  return (
    <Flex direction="column" style={{ minHeight: "100vh", backgroundColor: "var(--gray-1)" }}>
      {/* Header */}
      <Flex
        position="sticky"
        px="6"
        py="4"
        justify="between"
        align="center"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(20, 20, 20, 0.8)",
          borderBottom: "1px solid var(--gray-5)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <Box>
          <Heading
            size="6"
            style={{
              background: "linear-gradient(to right, var(--accent-11), var(--accent-9))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Sword NFT Forge
          </Heading>
        </Box>
        <Box>
          <ConnectButton />
        </Box>
      </Flex>

      {/* Main Content */}
      <Container size="3" style={{ flex: 1, padding: "24px" }}>
        <Container
          style={{
            background: "var(--gray-2)",
            borderRadius: "24px",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
            border: "1px solid var(--gray-5)",
            padding: "24px",
          }}
        >
          <WalletStatus />
        </Container>
      </Container>

      {/* Footer */}
      <Flex
        py="4"
        justify="center"
        align="center"
        style={{
          borderTop: "1px solid var(--gray-5)",
          backgroundColor: "rgba(20, 20, 20, 0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Text size="2" style={{ color: "var(--gray-11)" }}>
          Developed by Kampter
        </Text>
      </Flex>
    </Flex>
  );
}

export default App;