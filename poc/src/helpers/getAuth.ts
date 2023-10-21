import axios from "axios";
import { Wallet } from "ethers";
import { Keypair } from "@solana/web3.js";
import arr from "hex-array";
export async function getEvmKey(jwt: string, key: string): Promise<Wallet> {
  const { data } = await axios.get(
    `${"http://localhost:8080"}/key/evm/${key}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  if (!data.key) data.key = "NOT FOUND";
  console.log(data.key);
  const Keypair = new Wallet("0x" + data.key);

  return Keypair;
}

export async function getSolanaKey(jwt: string, key: string): Promise<Keypair> {
  const { data } = await axios.get(
    `${"http://localhost:8080"}/key/solana/${key}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  console.log(data);
  if (!data.key) data.key = "NOT FOUND";
  console.log(data.key);
  const hexarr = arr.fromString(data.key);
  const keypair = Keypair.fromSecretKey(hexarr);

  return keypair;
}
