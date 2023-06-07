const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log('Private Key:', toHex(privateKey));

//const publicKey = keccak256(secp.getPublicKey(privateKey).slice(1).slice(-20));
const publicKey = secp.getPublicKey(privateKey);

console.log('Public Key: ', toHex(publicKey));

const msg = keccak256(utf8ToBytes('Jani'));

async function signMessage() {
    const [signedMsg, recovery] = await secp.sign(msg, privateKey, { recovered: true });
    console.log("Signature: ", toHex(signedMsg), recovery);
}


signMessage();