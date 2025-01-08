import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { ConnectButton } from "@mysten/dapp-kit";
import './index.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" style={{ minHeight: "100vh" }}>
      {/* Enhanced Header */}
      <Box 
        p="4" 
        style={{ 
          background: "rgba(18, 18, 18, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100
        }}
      >
        <Container size="3">
          <Flex justify="between" align="center" gap="4">
            <Text 
              size="6" 
              weight="bold" 
              style={{ 
                background: "linear-gradient(135deg, #00f5d4 0%, #00c2ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px"
              }}
            >
              Sword NFT Forge
            </Text>
            <ConnectButton />
          </Flex>
        </Container>
      </Box>

      {/* Main Content with Improved Spacing */}
      <Box style={{ flex: 1, padding: "32px 24px" }}>
        <Container 
          size="3" 
          style={{
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >
          <Box 
            style={{
              background: "rgba(30, 30, 30, 0.6)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              padding: "32px",
            }}
          >
            {children}
          </Box>
        </Container>
      </Box>

      {/* Modernized Footer */}
      <Box 
        p="4" 
        style={{
          background: "rgba(18, 18, 18, 0.8)",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)"
        }}
      >
        <Container size="3">
          <Text 
            align="center" 
            size="2" 
            style={{ 
              color: "rgba(255, 255, 255, 0.6)",
              letterSpacing: "0.5px"
            }}
          >
            Developed by Kampter
          </Text>
        </Container>
      </Box>
    </Flex>
  );
}