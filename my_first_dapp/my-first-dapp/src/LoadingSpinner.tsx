import { PulseLoader } from "react-spinners";
import { Flex, Text } from "@radix-ui/themes";

export function LoadingSpinner() {
  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      style={{ 
        height: "100%",
        gap: "16px"
      }}
    >
      <PulseLoader 
        color="#00f5d4"
        size={15}
        speedMultiplier={0.8}
      />
      <Text 
        size="2" 
        style={{ 
          color: "rgba(255, 255, 255, 0.6)",
          marginTop: "12px"
        }}
      >
        Loading...
      </Text>
    </Flex>
  );
}