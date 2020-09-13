/**
 * gathers the library together into a working demo
 * reveals weaknesses in usability and design
 * provides interface for visual testing
 */
import { renderSVG } from "./renderer.js";
import { LayoutConfig, configureLayout } from "./layout.js";
import { GridMap, GridShape, makeGrid } from "./grid.js";
import * as Subset from "./subset.js";
import * as Hex from "./hex.js";

/*
function getCheckbox(elementId: string): boolean {
  const input = document.getElementById(elementId) as HTMLInputElement;
  return input.checked;
}
*/
const gridTarget = "hg",
  shapes = ["line", "ring", "hexagon", "cone", "rhombbus"],
  shapesHolder = "shapes",
  shapeLayoutConfig: LayoutConfig = configureLayout(
    0,
    { x: 5, y: 5 },
    { x: 45, y: 45 },
    { x: 90, y: 90 }
  ),
  shapeGrid: GridMap = makeGrid({ size: 5 }),
  source = Hex.makeNode({ q: 0, r: -0, s: 0 }, "Cell") as Hex.CellNode,
  toward = { q: -2, r: 4, s: -2 },
  subsets = [
    Subset.line({ source, toward }),
    Subset.ring({ source, size: 3 }),
    Subset.hexagon({ source, size: 3 }),
    Subset.cone({ source, toward, size: 4 }),
    Subset.rhombus({ source, toward, size: 3 }),
  ];
export const renderContext = document.getElementById(gridTarget) as HTMLElement,
  inputs = document.querySelector('form[id="params"]') as HTMLFormElement,
  getFloatValue = (elementId: string): number => {
    const input = document.getElementById(elementId) as HTMLInputElement;
    return parseFloat(input.value);
  },
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
      configureLayout(
        (getFloatValue("orientation") * Math.PI) / 12,
        { x: getIntValue("hsx"), y: getIntValue("hsy") },
        { x: getIntValue("orx"), y: getIntValue("ory") },
        { x: getIntValue("csx"), y: getIntValue("csy") }
      ),
      makeGrid({
        shape: getRadioValue("shape") as GridShape,
        size: { a: getIntValue("gs1"), b: getIntValue("gs1") },
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
    renderSVG(...config);
  };

/**/

document.addEventListener("DOMContentLoaded", () => {
  rend();
  const holder = document.getElementById(shapesHolder) as HTMLDivElement;
  shapes.forEach((shape, index) => {
    const shapeContainer = document.createElement("div") as HTMLDivElement,
      subset = subsets[index];
    shapeContainer.id = shape;
    shapeContainer.style.display = "inline-block";
    holder.appendChild(shapeContainer);
    renderSVG(shape, shapeLayoutConfig, shapeGrid);
    const source = shapeContainer.querySelector(`[data-hex-node-id="0,0,0"]`);
    (source as SVGPathElement).classList.add("source");
    subset.forEach((e): void => {
      const cell = document.querySelector(
        `#${shape} [data-hex-node-id="${e.id}"]`
      ) as SVGPathElement;
      if (cell) {
        cell.classList.add("hilit");
      }
    });
  });
});

inputs.addEventListener("input", rend);
