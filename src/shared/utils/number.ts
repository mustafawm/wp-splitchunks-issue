export function isDecimal(n: number | null | undefined) {
  return /^\d*(\.\d{1,2})?$/.test(String(n));
}

export function roundedUp(n: number) {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
