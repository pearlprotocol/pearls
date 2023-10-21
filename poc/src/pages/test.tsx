"use-client"

import Image from "next/image";
import { usePearl } from "@/hooks/usePearl";
import { useEffect } from "react";
export default function Home() {
  const { handleCallback, user, verifyKyc, evmKey, solanaKey } = usePearl();

  useEffect(() => {
    handleCallback();
    console.log(user);
  }, []);
  return <div>
    <div>
      {JSON.stringify(user)}
      {JSON.stringify(evmKey)}
      {JSON.stringify(solanaKey)}
    </div>
  </div>
}
