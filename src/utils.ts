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
