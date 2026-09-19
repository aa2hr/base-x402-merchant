export interface Receipt {
  id: string;
  payer: string;
  amount: number;
  chainId: number;
  createdAt: number;
  simulated: boolean;
}

const paid = new Map<string, Receipt>();

export function putReceipt(r: Receipt) {
  paid.set(r.id, r);
  return r;
}

export function getReceipt(id?: string) {
  if (!id) return undefined;
  return paid.get(id);
}

export function simulatePay(payer: string, amount: number, chainId: number) {
  const id = `sim_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  return putReceipt({ id, payer, amount, chainId, createdAt: Date.now(), simulated: true });
}
