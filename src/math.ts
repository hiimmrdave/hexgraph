export function thousandthRound(n: number): string {
  return n.toFixed(3);
}

export function lerp(m: number, n: number, t: number): number {
  return m * (1 - t) + n * t;
}