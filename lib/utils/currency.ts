/** Approximate KZT → USD rate for displayed starting prices (updated periodically). */
export const KZT_PER_USD = 500;

export function kztToUsd(kzt: number): number {
  return Math.ceil(kzt / KZT_PER_USD);
}

export function formatUsdFromKzt(kzt: number): string {
  return `$${kztToUsd(kzt).toLocaleString("en-US")}`;
}
