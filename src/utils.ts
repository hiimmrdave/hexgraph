import { thousandthRound } from "./math.js";
/* get a value from a form */

export const getFloatValue = (elementId: string): number => {
    const input = document.getElementById(elementId);
    if (typeof input === "object") {
      return parseFloat((input as HTMLInputElement).value);
    }
    throw "sorry, no";
  },
  getIntValue = (elementId: string): number => {
    const input = document.getElementById(elementId);
    if (typeof input === "object") {
      return parseInt((input as HTMLInputElement).value, 10);
    }
    throw "sorry, no";
  },
  getRadioValue = (elementName: string): string => {
    const input = document.querySelector(`input[name="${elementName}"]:checked`);
    if (typeof input === "object") {
      return (input as HTMLInputElement).value;
    }
    throw "sorry, no";
  },
  getStringValue = (elementId: string): string => {
    const input = document.getElementById(elementId);
    if (typeof input === "object") {
      return (input as HTMLInputElement).value;
    }
    throw "sorry, no";
  },
  getCheckbox = (elementId: string): boolean => {
    const input = document.getElementById(elementId);
    if (typeof input === "object") {
      return (input as HTMLInputElement).checked;
    }
    throw "sorry, no";
  };

export const makeVulgar = (n: number): string => {
  switch (Math.abs(thousandthRound(n - Math.trunc(n)))) {
    case 0.333:
      return `${minusZeroTrunc(n)}⅓`;
    case 0.666:
      return `${minusZeroTrunc(n)}⅔`;
    case 0.5:
      return `${minusZeroTrunc(n)}½`;
    default:
      return `${n}`;
  }
};

/**
 * Truncates and returns a string representation of the integer portion of a number, respecting sign
 * To wit:
 * ```javascript
 * let n = -0;
 * n.toString(); //returns `"0"`
 * ```
 * @param n A number
 * @returns The string `"-0"` if `n` is between 0 and -1, or the string representation of n
 */
const minusZeroTrunc = (n: number): string => {
  if (Math.abs(Math.trunc(n)) > 0 || n > 0) return `${Math.trunc(n)}`;
  return "-0";
};
