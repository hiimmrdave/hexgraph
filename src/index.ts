import { render } from "./renderer.js";
import { LayoutConfig, config } from "./layout.js";
import { GridMap, GridShape, make } from "./grid.js";
import * as Subset from "./subset.js";
import * as Hex from "./hex.js";

/*
function getFloat(elementId: string): number {
  const input = document.getElementById(elementId) as HTMLInputElement;
  return parseFloat(input.value);
}
function getCheckbox(elementId: string): boolean {
  const input = document.getElementById(elementId) as HTMLInputElement;
  return input.checked;
}
*/

export const gridTarget = "hg",
  renderContext = document.getElementById(gridTarget) as HTMLElement,
  inputs = document.querySelector('form[id="params"]') as HTMLFormElement,
  getIntValue = (elementId: string): number => {
    const input = document.getElementById(elementId) as HTMLInputElement;
    return parseInt(input.value, 10);
  },
  getRadioValue = (elementName: string): string => {
    const input = document.querySelector(
      `input[name="${elementName}"]:checked`
    ) as HTMLInputElement;
    return input.value;
  },
  getForm = (): [string, LayoutConfig, GridMap] => {
    return [
      gridTarget,
      config(
        (getIntValue("orientation") * Math.PI) / 12,
        { x: getIntValue("hsx"), y: getIntValue("hsy") },
        { x: getIntValue("orx"), y: getIntValue("ory") },
        { x: getIntValue("csx"), y: getIntValue("csy") }
      ),
      make({
        shape: getRadioValue("shape") as GridShape,
        size: { x: getIntValue("gs1"), y: getIntValue("gs1") },
        populate: true,
      }),
    ];
  },
  rend = (): void => {
    const config = getForm();
    let last;
    while ((last = renderContext.lastChild)) {
      renderContext.removeChild(last);
    }
    render(...config);
  };

const aLine = Subset.line(
  Hex.makeNode({ q: 0, r: -4, s: 4 }, "Cell") as Hex.CellNode,
  Hex.makeNode({ q: -2, r: 4, s: -2 }, "Cell") as Hex.CellNode
);

document.addEventListener("DOMContentLoaded", () => {
  rend();

  /*  aLine.forEach((val): void => {
    const cell = document.getElementById(val.id);
    console.log([val.id, cell]);
    if (cell) {
      cell.classList.toggle("ring");
    }
  });*/
});

inputs.addEventListener("input", rend);
