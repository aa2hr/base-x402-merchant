const base = process.env.MERCHANT_URL ?? "http://localhost:8787";

async function main() {
  const first = await fetch(`${base}/paid/alpha-report`);
  console.log("first", first.status, await first.json());

  const pay = await fetch(`${base}/demo/pay`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ payer: "0xabc" }),
  });
  const receipt = await pay.json();
  console.log("receipt", receipt);

  const second = await fetch(`${base}/paid/alpha-report`, {
    headers: { "X-PAYMENT": receipt.id },
  });
  console.log("second", second.status, await second.json());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
