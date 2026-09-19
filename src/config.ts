import "dotenv/config";

export const USDC = {
  base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "base-sepolia": "0x036CbD53842c5426634e7929541eC2318b3d52Fa",
} as const;

export const CHAIN_ID = {
  base: 8453,
  "base-sepolia": 84532,
} as const;

export type Network = keyof typeof USDC;

export const config = {
  port: Number(process.env.PORT ?? 8787),
  network: (process.env.CHAIN ?? "base-sepolia") as Network,
  receiver: process.env.RECEIVER ?? "0x000000000000000000000000000000000000dEaD",
  priceUsdc: Number(process.env.PRICE_USDC ?? 0.25),
  rpc: process.env.BASE_RPC ?? "",
};

export function quote() {
  const network = config.network in USDC ? config.network : "base-sepolia";
  return {
    protocol: "x402-base",
    network,
    chainId: CHAIN_ID[network],
    asset: "USDC",
    token: USDC[network],
    amount: config.priceUsdc,
    decimals: 6,
    receiver: config.receiver,
    extra: { name: "Base x402 merchant" },
  };
}
