import { useNavigate } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { WalletStatus } from "../Components/WalletStatus"; // Ensure correct import path
import { Box, Flex, Heading } from "@radix-ui/themes";

const Login = () => {
  const navigate = useNavigate();
  const account = useCurrentAccount();

  useEffect(() => {
    if (account) {
      navigate("/main");
    }
  }, [account, navigate]);

  return (
    <Flex direction="column" align="center" justify="center" style={{ minHeight: "100vh", backgroundColor: "#121212" }}>
      <Box style={{ backgroundColor: "#1e1e1e", padding: "32px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Heading size="3" align="center" style={{ marginBottom: "16px", color: "#fff" }}>Login Page</Heading>
        <WalletStatus />
      </Box>
    </Flex>
  );
};

export default Login;