import cors from "cors";
import express from "express";
import { config, quote } from "./config.js";
import { getReceipt, simulatePay } from "./ledger.js";
import { RESOURCES } from "./resources.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "base-x402-merchant", network: config.network });
});

app.get("/quote", (_req, res) => {
  res.json(quote());
});

app.post("/demo/pay", (req, res) => {
  const payer = String(req.body?.payer ?? "0xpayer");
  const q = quote();
  const receipt = simulatePay(payer, q.amount, q.chainId);
  res.status(201).json(receipt);
});

app.get("/paid/:slug", (req, res) => {
  const resource = RESOURCES[req.params.slug];
  if (!resource) {
    res.status(404).json({ error: "unknown resource" });
    return;
  }
  const paymentId = String(req.header("x-payment") ?? "");
  const receipt = getReceipt(paymentId);
  if (!receipt) {
    res.status(402).json({
      error: "Payment Required",
      accept: quote(),
      resource: req.params.slug,
    });
    return;
  }
  res.json({ resource, receipt });
});

app.listen(config.port, () => {
  console.log(`x402 merchant on :${config.port} (${config.network})`);
});
