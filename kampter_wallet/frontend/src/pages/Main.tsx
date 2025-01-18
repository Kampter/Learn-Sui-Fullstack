import { useNavigate } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { WalletStatus } from "@/components/wallet-status"; // Ensure correct import path

const Main = () => {
  const account = useCurrentAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate("/login");
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

export default Main;