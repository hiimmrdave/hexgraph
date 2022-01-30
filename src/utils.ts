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

/**
 * formats a number as a mixed fraction string if the decimal can be replaced with ⅓, ½, or ⅔
 * It's not that useful if your numbers aren't in increments of 1/6!
 * @param n A number to be represented as a string in mixed fraction form
 * @returns a string with a vulgar fraction, or a string of the number
 */
export const makeVulgar = (n: number): string => {
  switch (Math.abs(thousandthRound(n - Math.trunc(n)))) {
    case 0.333:
      return `${truncToSignedString(n)}⅓`;
    case 0.666:
      return `${truncToSignedString(n)}⅔`;
    case 0.5:
      return `${truncToSignedString(n)}½`;
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
const truncToSignedString = (n: number): string => {
  if (Math.abs(Math.trunc(n)) > 0 || n > 0) return `${Math.trunc(n)}`;
  return "-0";
};
