export interface config {
  clientId: string;
  callbackUrl: string;
  encrypt: boolean;
  password?: string;
  provider: "DISCORD";
  cookieName: string;
  kyc: "GOVERNMENT" | "DOCUMENT";
}
