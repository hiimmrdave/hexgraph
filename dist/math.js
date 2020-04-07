export const HALF_PI = Math.PI / 2;
export const PI_OVER_SIX = Math.PI / 6;
export const SQRT_THREE = Math.sqrt(3);
export function thousandthRound(n) {
    return Math.round(n * 1e3) / 1e3;
}
export function lerp(m, n, t) {
    return m * (1 - t) + n * t;
}
export function cubeLerp(a, b, t) {
    return { q: lerp(a.q, b.q, t), r: lerp(a.r, b.r, t), s: lerp(a.s, b.s, t) };
}
//# sourceMappingURL=math.js.map