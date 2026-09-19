import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CHAIN_ID, USDC, quote } from "./config.js";
import { getReceipt, simulatePay } from "./ledger.js";

describe("x402 quote", () => {
  it("quotes Base Sepolia USDC by default", () => {
    const q = quote();
    assert.equal(q.chainId, CHAIN_ID["base-sepolia"]);
    assert.equal(q.token, USDC["base-sepolia"]);
    assert.equal(q.asset, "USDC");
  });
});

describe("ledger", () => {
  it("stores a simulated receipt", () => {
    const r = simulatePay("0x1", 0.25, 84532);
    assert.equal(getReceipt(r.id)?.payer, "0x1");
    assert.equal(getReceipt("missing"), undefined);
  });
});
