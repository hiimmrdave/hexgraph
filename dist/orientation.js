import { thousandthRound, HALF_PI, PI_OVER_SIX, SQRT_THREE } from "./math";
export default function orientation(theta = 0) {
    return {
        f: {
            x: {
                q: thousandthRound(Math.cos(theta - PI_OVER_SIX) * SQRT_THREE),
                r: thousandthRound(Math.cos(theta - HALF_PI) * SQRT_THREE)
            },
            y: {
                q: thousandthRound(Math.sin(theta + 5 * PI_OVER_SIX) * SQRT_THREE),
                r: thousandthRound(Math.sin(theta + HALF_PI) * SQRT_THREE)
            }
        },
        b: {
            q: {
                x: thousandthRound((Math.cos(theta) * 2) / 3),
                y: thousandthRound((Math.sin(theta) * -2) / 3)
            },
            r: {
                x: thousandthRound((Math.cos(theta + 2 * PI_OVER_SIX) * -2) / 3),
                y: thousandthRound((Math.sin(theta + 2 * PI_OVER_SIX) * 2) / 3)
            }
        }
    };
}
//# sourceMappingURL=orientation.js.map