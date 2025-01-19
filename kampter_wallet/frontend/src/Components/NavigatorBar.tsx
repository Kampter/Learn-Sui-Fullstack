import { ConnectButton } from "@mysten/dapp-kit";
import { Flex, Box, Text } from "@radix-ui/themes";

const NavigatorBar = () => {

  return (
    <Box as="header" style={{ borderBottom: "1px solid #333", padding: "16px 0", backgroundColor: "#1e1e1e" }}>
      <Flex justify="between" align="center" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        <Text size="4" weight="bold" style={{ cursor: "pointer", color: "#fff" }}>
          Sui Assets Manager
        </Text>
        <ConnectButton />
      </Flex>
    </Box>
  );
}

export default NavigatorBar;