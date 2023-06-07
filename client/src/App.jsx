import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [signature, setSignature] = useState("");
  const [address, setAddress] = useState("");
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        signature = {signature}
        setSignature = {setSignature}
        address={address}
        setAddress={setAddress}
      />
      <Transfer setBalance={setBalance} signature={signature} address={address} />
    </div>
  );
}

export default App;
