import { QRSVector } from "./hex.js";

export type ChanceItem<T> = {
  weight: number;
  event: T;
};
export type ChanceTable<T> = ChanceItem<T>[];

/**
 * `Math.PI / 2` ≈ 1.5708
 * π/2 radians is 90°, which is useful for rotating.
 */
export const HALF_PI = Math.PI / 2,
  /**
   * `Math.PI / 6` ≈ 0.5235
   * π/6 radians is 30°, the minimum rotation required to switch between flat-
   * topped and pointy-topped hexagons
   */
  PI_OVER_SIX = Math.PI / 6,
  /**
   * `Math.sqrt(3)` ≈ 1.7321
   * √3 is the diagonal length of a unit cube, or more directly, the distance
   * between opposite sides of a unit hexagon.
   */
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
function lerp(m: number, n: number, t: number): number {
  return m * (1 - t) + n * t;
}

/**
 * @param a the start of the linear interpolation, in QRS space
 * @param b the end of the linear interpolation, in QRS space
 * @param t the portion of distance from a to b ( 0 <= t <= 1 )
 * @returns a set of cube coordinates t of the way between a and b
 */
export function cubeLerp(a: QRSVector, b: QRSVector, t: number): QRSVector {
  return { q: lerp(a.q, b.q, t), r: lerp(a.r, b.r, t), s: lerp(a.s, b.s, t) };
}

/**
 * create an arrayy of numbers from start to end, inclusive
 * really only works the way you'd want for integers, but I won't stop you
 * @param start first number of the range
 * @param end last number of the range
 */
export function range(start: number, end: number): number[] {
  return new Array(end - start + 1).map((e, i) => {
    return start + i;
  });
}

/**
 * Returns a random integer in the range of [min, max] (inclusive).
 * @param min lowest possible number desired
 * @param max highest possible number desired
 */
export function randRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * chooses a (pseudo)random event from a weighted probability table
 * @param table a weighted list of all possible events
 */
export function rollTable<T>(table: ChanceTable<T>): T {
  const totalWeight = table.reduce((acc, cur) => acc + cur.weight, 0);
  const rand = randRange(0, totalWeight);
  let curWeight = 0;
  for (const chanceItem of table) {
    curWeight += chanceItem.weight;
    if (curWeight >= rand) {
      return chanceItem.event;
    }
  }
  return table as never;
}
