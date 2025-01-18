import { useNavigate } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { WalletStatus } from "@/components/wallet-status";

const Main = () => {
  const account = useCurrentAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate("/main");
    } else {
      navigate("/login");
    }
  }, [account, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <WalletStatus />
    </div>
  );
};

export default Main;