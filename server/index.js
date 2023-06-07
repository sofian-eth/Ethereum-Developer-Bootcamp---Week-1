const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const secp = require('ethereum-cryptography/secp256k1');
const { toHex, utf8ToBytes } = require('ethereum-cryptography/utils');
const { keccak256 } = require('ethereum-cryptography/keccak');

app.use(cors());
app.use(express.json());

const balances = {
  "04aa6591c038462cb18618732c339277df84462e606bca8ea22359a5973360800ddf2c3863c76f2016fb8779a7ca41eb7f1c0e62d4cb6024909a8b585f8589ce80": 100,
  "0485cb1a772f9b54c2556764301f1e33e57c32282043c9b14497fabf973dbb473a26e5cd7eb84951981209afe1999215b6849bb4654bb306099566df82df95e58f": 50,
  "04835e757b1242abb9012435081f7466b2123b45af10c372e6eea89364fc0c0b10acb67708da84adafdcd19b2df9d36f69c1fcac44f92f9659d706b68062533672": 75,
}; 

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, address } = req.body;

  const messageHash = keccak256(utf8ToBytes('Jani'));

  if(!secp.verify(sender, messageHash, address)) {
    res.status(400).send({message: "Invalid Transaction"});
  }

  setInitialBalance(address);
  setInitialBalance(recipient);

  if (balances[address] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[address] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[address] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
