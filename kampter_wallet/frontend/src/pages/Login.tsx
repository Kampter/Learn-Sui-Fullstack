import { useNavigate } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { WalletStatus } from "@/components/wallet-status"; // Ensure correct import path

const Login = () => {
  const navigate = useNavigate();
  const account = useCurrentAccount();

  useEffect(() => {
    if (account) {
      navigate("/main");
    }
  }, [account, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col items-center justify-center">
        <WalletStatus />
      </div>
    </div>
  );
};

export default Login;