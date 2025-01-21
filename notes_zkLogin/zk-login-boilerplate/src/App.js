import React, { useState, useEffect } from "react";
import { Notification } from "./components/utils/Notifications";
import "./App.css";
import AuthService from "./components/utils/AuthService";
import SuiService from "./components/utils/suiService";
import { Container, Nav } from "react-bootstrap";
import Wallet from "./components/Wallet";
import Notes from "./components/notes/Notes";
import Cover from "./components/utils/Cover";
import coverImg from "./assets/coverImg.jpg";

const App = () => {
  const [balance, setBalance] = useState("0");
  const [walletAddress, setWalletAddress] = useState("");
  const suiService = new SuiService();

  const getBalance = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const address = AuthService.getWalletAddress();
        setWalletAddress(address);
        const formattedBalance = await suiService.getFormattedBalance(address);
        setBalance(formattedBalance);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("Balance updated");
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.href = "/notes";
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <>
      <Notification />
      {AuthService.isAuthenticated() ? (
        <Container fluid="md">
          <Nav className="justify-content-end pt-3 pb-5">
            <Nav.Item>
              <Wallet
                address={walletAddress}
                amount={balance}
                symbol="SUI"
                destroy={logout}
              />
            </Nav.Item>
          </Nav>
          <main>
            <Notes />
          </main>
        </Container>
      ) : (
        <Cover name="SUI zkLogin Notes" coverImg={coverImg} />
      )}
    </>
  );
};

export default App;