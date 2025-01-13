import { useCurrentAccount } from "@mysten/dapp-kit";
import { Box, Flex, Text } from "@radix-ui/themes";
import { OwnedObjects } from "./OwnedObjects";
import { Button } from "./components/ui/button";

export function WalletStatus() {
  const account = useCurrentAccount();

  return (
    <Flex direction="column" gap="6">
      {/* Wallet Info */}
      <Flex 
        direction="column" 
        gap="3" 
        p="4"
        style={{
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "16px",
        }}
      >
        <Text size="5" weight="bold" style={{ color: "#00f5d4" }}>
          Wallet Status
        </Text>
        {account ? (
          <Flex direction="column" gap="2">
            <Text size="2" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              Connected • {account.address}
            </Text>
          </Flex>
        ) : (
          <Text size="2" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
            Not Connected
          </Text>
        )}
      </Flex>
      <Button variant="outline">Button</Button>

      {/* Objects List */}
      <Box>
        <OwnedObjects />
      </Box>
    </Flex>
  );
}