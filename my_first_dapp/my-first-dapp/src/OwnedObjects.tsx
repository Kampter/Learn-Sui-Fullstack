import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";

export function OwnedObjects() {
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    }
  );

  if (error) {
    return (
      <Text size="2" style={{ color: "#ff4d4d" }}>
        Error: {error.message}
      </Text>
    );
  }

  if (isPending || !data) {
    return (
      <Text size="2" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
        Loading...
      </Text>
    );
  }

  return (
    <Flex direction="column" gap="4">
      <Text size="5" weight="bold" style={{ color: "#00f5d4" }}>
        {data.data.length === 0 ? "No Objects Found" : "Your NFT Collection"}
      </Text>

      <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="3">
        {data.data.map((object) => (
          <Box
            key={object.data?.objectId}
            p="4"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "12px",
              transition: "background 0.2s ease",
              cursor: "pointer",
              ":hover": {
                background: "rgba(255, 255, 255, 0.05)",
              },
            }}
          >
            <Text
              size="2"
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                wordBreak: "break-all",
              }}
            >
              {object.data?.objectId}
            </Text>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}