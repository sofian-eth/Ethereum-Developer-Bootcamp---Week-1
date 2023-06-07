import server from "./server";

import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex, utf8ToBytes, hexToBytes } from 'ethereum-cryptography/utils';
import { keccak256 } from 'ethereum-cryptography/keccak';

function Wallet({ address, setAddress, balance, setBalance, signature, setSignature }) {
  async function onChange(evt) {
    const signature = evt.target.value;
    setSignature(signature);

    const msg = keccak256(utf8ToBytes('Jani'));

    const address = toHex(secp.recoverPublicKey(msg, signature, 0));

    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  // const generateWallet = async () => {
  //   const privAddr = toHex(secp.utils.randomPrivateKey());
  //   //const publicKey = toHex(secp.getPublicKey(privateKey));
  // }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Signature 
        <input placeholder="Please type in your signature" value={signature} onChange={onChange}></input>
      </label>

      <div>
        Address: {address.slice(0,7)}...{address.slice(-5)}
      </div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
