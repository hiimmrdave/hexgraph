import { CubeVector } from "./types";

/**
 * pi/3 radians = 60 degrees, the interior angle of an equliateral triangle
 */
export const PI_OVER_THREE = Math.PI / 3

/**
 * √3 is the distance between opposite sides of a regular hexagon of radius 1
 */
export const SQRT_THREE = Math.sqrt(3);

/**
 * 
 * @param n a number, which will be rounded to 3 numbers after the decimal
 * @returns n, as a string, rounded to 3 decimal places
 */
export function thousandthRound(n: number): string {
  return n.toFixed(3);
}

/**
 * 
 * @param m the start point of the linear interpolation
 * @param n the end of the linear interpolation
 * @param t the portion from m to n ( 0 <= t <= 1 )
 * @returns a point that is t of the way from m to n
 */
export function lerp(m: number, n: number, t: number): number {
  return m * (1 - t) + n * t;
}

/**
 * 
 * @param a the starting HexNode of the linear interpolation
 * @param b the ending HexNode of the linear interpolation
 * @param t the portion of distance from a to b ( 0 <= t <= 1 )
 * @returns a set of cube coordinates t of the way between a and b
 */
export function cubeLerp(a: CubeVector, b: CubeVector, t: number): CubeVector {
    return { q: lerp(a.q, b.q, t), r: lerp(a.r, b.r, t), s: lerp(a.s, b.s, t) }
  }