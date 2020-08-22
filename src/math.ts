import { QRSVector } from "./types.js";

export const HALF_PI = Math.PI / 2,
  PI_OVER_SIX = Math.PI / 6,
  SQRT_THREE = Math.sqrt(3);

/**
 * @param n a number, which will be rounded to 3 numbers after the decimal
 * @returns n rounded to 3 decimal places
 */
export function thousandthRound(n: number): number {
  return Math.trunc(n * 1e3) / 1e3;
}

/**
 * @param m the start point of the linear interpolation
 * @param n the end of the linear interpolation
 * @param t the portion from m to n ( 0 <= t <= 1 )
 * @returns a point that is t of the way from m to n
 */
export function lerp(m: number, n: number, t: number): number {
  return m * (1 - t) + n * t;
}

/**
 * @param a the starting {@linkcode CubeVector} of the linear interpolation
 * @param b the ending {@linkcode CubeVector} of the linear interpolation
 * @param t the portion of distance from a to b ( 0 <= t <= 1 )
 * @returns a set of cube coordinates t of the way between a and b
 */
export function cubeLerp(a: QRSVector, b: QRSVector, t: number): QRSVector {
  return { q: lerp(a.q, b.q, t), r: lerp(a.r, b.r, t), s: lerp(a.s, b.s, t) };
}

export function randRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

export function rollTable<T>(table: [{ weight: number; value: T }]): T {
  const totalWeight = table.map(e => e.weight).reduce((acc, cur) => acc + cur);
  const rand = randRange(0, totalWeight);
  let curWeight = 0;
  for (const val of table) {
    curWeight += val.weight;
    if (curWeight >= rand) {
      return val.value;
    }
  }
  return "no" as never;
}
