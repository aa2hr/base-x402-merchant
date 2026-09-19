# base-x402-merchant

Paywalled HTTP API on **Base**. A request to a paid route returns `402 Payment Required` with USDC settlement details. After onchain (or simulated) payment, the same route returns the resource.

Inspired by Coinbase [x402](https://github.com/coinbase/x402): payment as an HTTP status, not a checkout page.

## Flow

1. `GET /paid/alpha-report` → `402` + JSON quote (amount, USDC address, receiver, chainId).
2. Client transfers USDC on Base (or uses the demo payer).
3. `GET /paid/alpha-report` with `X-PAYMENT: <id>` → `200` + payload.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

```bash
curl -i http://localhost:8787/paid/alpha-report
curl -i http://localhost:8787/health
npx tsx src/client-demo.ts
```

## Networks

| Network | chainId | USDC |
| --- | --- | --- |
| Base | 8453 | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |
| Base Sepolia | 84532 | `0x036CbD53842c5426634e7929541eC2318b3d52Fa` |

Without a live RPC the demo payer records an in-memory receipt so the API can be reviewed offline.

## Resume line

> Merchant API on Base using HTTP 402 and USDC settlement (x402-style paywalled endpoints).

## License

MIT
