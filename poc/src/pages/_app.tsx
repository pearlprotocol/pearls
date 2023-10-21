import { PearlProvider } from "@/provider/provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PearlProvider
      config={{
        callbackUrl: "http://localhost:8080",
        clientId: "test123",
        encrypt: true,
        password: "apoorv1234",
        provider: "DISCORD",
        cookieName: "pearlx",
        kyc: "GOVERNMENT"
      }}
    >
      <Component {...pageProps} />
    </PearlProvider>
  );
}
