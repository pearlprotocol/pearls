"use-client"
import { useEffect, useState } from "react";
import { useConfig } from "../provider/provider";
import { getUser } from "@/helpers/getUser";
import { useCookies } from "react-cookie";
import { AES } from "crypto-ts";
import axios from "axios";
import { Keypair } from "@solana/web3.js";
import { Wallet } from "ethers";
import { getEvmKey, getSolanaKey } from "@/helpers/getAuth";
export function usePearl(): pearl {
  const config = useConfig();
  console.log(config);
  const cookieName: string = config.cookieName || "jwt-pearl";
  const [solana, setSolana] = useState<Keypair | null>(null);
  const [evm, setEvm] = useState<Wallet | null>(null);
  const [user, setUser] = useState<userConstructor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("CHAL RHA");
      setIsLoading(true);
      if (!cookies[cookieName]) {
        setIsLoading(false);
        return;
      }
      console.log("YAHA BHI CHAL RHA");

      const user = await getUser(cookies[cookieName]);

      const solcookie = cookies["solana"];
      const evmcookie = cookies["evm"];

      const solkey = await getSolanaKey(cookies[cookieName], solcookie);
      const evmkey = await getEvmKey(cookies[cookieName], evmcookie);

      console.log(solkey, "auth", solkey);
      console.log(evmkey, "auth", evmkey);

      console.log("USER CHAL RHA");

      setUser(user);
      setSolana(solkey);
      setEvm(evmkey);
      setIsLoading(false);
      console.log("PURA CHAL RHA", user);
    };
    fetchUser();
  }, [cookies]);

  function handleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const jwt = urlParams.get("jwt");
    const solana = urlParams.get("solana");
    const evm = urlParams.get("evm");
    if (jwt && cookies[cookieName]) {
      console.log("exists", cookies[cookieName]);
      removeCookie(cookieName);
      console.log(setCookie(cookieName, jwt));
    }
    if (jwt && !cookies[cookieName]) {
      console.log(setCookie(cookieName, jwt.toString()));
    }
    if (!evm || !solana) return;
    console.log(setCookie("solana", solana.toString()));
    console.log(setCookie("evm", evm.toString()));
  }

  function signIn() {
    const url = new URL(`http://localhost:8080/auth/${config.provider}`);
    url.searchParams.append("cb", config.callbackUrl);
    console.log(url.toString());
    window.location.replace(url.toString());
  }

  const signOut = () => {
    removeCookie(cookieName);
  };

  const backupDeviceKey = async (recovery: string) => {
    const soldata = await axios.get(
      `${"http://localhost:8080"}/key/device/solana?key=${recovery}`,
      {
        headers: {
          Authorization: `Bearer ${cookies[cookieName]}`,
        },
        params: {
          key: recovery,
        },
      }
    );

    const evmdata = await axios.get(
      `${"http://localhost:8080"}/key/device/evm?key=${recovery}`,
      {
        headers: {
          Authorization: `Bearer ${cookies[cookieName]}`,
        },
        params: {
          key: recovery,
        },
      }
    );
    if (!soldata.data.key || !evmdata.data.key) return;
    const sol = soldata.data.key;
    const evm = evmdata.data.key;
    console.log(setCookie("solana", sol.toString()));
    console.log(setCookie("evm", evm.toString()));
  };


  function verifyKyc() {
    if(user) {
    console.log("window", window)
    window.location.replace(`http://localhost:8080/kyc/verify/${user.id}/${config.kyc.toLowerCase()}`)
    return
    }
    console.log("no user")
    return
  }

  return {
    user,
    solanaKey: solana,
    evmKey: evm,
    isLoading,
    signIn,
    backupDeviceKey,
    signOut,
    verifyKyc,
    handleCallback,
  };
}

function encrypt(text: string, secretKey: string): string {
  const ciphertext = AES.encrypt(text, secretKey).toString();
  return ciphertext;
}

function decrypt(ciphertext: string, secretKey: string): string {
  const bytes = AES.decrypt(ciphertext, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}

type userConstructor = any;

interface pearl {
  handleCallback: () => void;
  signIn: () => void;
  signOut: () => void;
  solanaKey: Keypair | null;
  evmKey: Wallet | null;
  user: any;
  backupDeviceKey: (recovery: string) => void;
  verifyKyc: () => void;
  isLoading: boolean;
}
