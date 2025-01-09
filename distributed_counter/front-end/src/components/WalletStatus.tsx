import { Flex, Text } from "@radix-ui/themes";

export function WalletStatus({ account }: { account: any }) {
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
    </Flex>
  );
}