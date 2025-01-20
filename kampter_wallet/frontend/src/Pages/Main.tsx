import { useNavigate } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { Note } from "../Components/Note";

const Main = () => {
  const account = useCurrentAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
    }
  }, [account, navigate]);

  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: "100vh", backgroundColor: "#121212" }}>
      <Box style={{ backgroundColor: "#1e1e1e", padding: "32px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Heading size="3" align="center" style={{ marginBottom: "16px", color: "#fff" }}>Main Page</Heading>
        <Note />
      </Box>
    </Flex>
  );
};

export default Main;