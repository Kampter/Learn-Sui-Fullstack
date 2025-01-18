import { useNavigate } from "react-router-dom";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useEffect } from "react";
import { WalletStatus } from "@/components/wallet-status" // Ensure correct import path
import Footer from "@/components/footer";
import NaviBar from "@/components/navi-bar";

const Login = () => {
  const navigate = useNavigate();
  const account = useCurrentAccount();

  useEffect(() => {
    if (account) {
      navigate("/main");
    }
  }, [account, navigate]);

  return (
    <div>
        <NaviBar />
        <div className="flex flex-col items-center justify-center h-full">
            <WalletStatus />
        </div>
        <Footer />
    </div>
    
  );
};

export default Login;