import * as Renderer from "./renderer.js";
import * as Layout from "./layout.js";
import * as Grid from "./grid.js";
export const gridTarget = "hg",
  renderContext = document.getElementById(gridTarget),
  inputs = document.querySelector('form[id="params"]'),
  getIntValue = elementId => {
    const input = document.getElementById(elementId);
    return parseInt(input.value, 10);
  },
  getRadioValue = elementName => {
    const input = document.querySelector(
      `input[name="${elementName}"]:checked`
    );
    return input.value;
  },
  getForm = () => {
    return [
      gridTarget,
      Layout.config(
        (getIntValue("orientation") * Math.PI) / 12,
        { x: getIntValue("hsx"), y: getIntValue("hsy") },
        { x: getIntValue("orx"), y: getIntValue("ory") },
        { x: getIntValue("csx"), y: getIntValue("csy") }
      ),
      Grid.make({
        shape: getRadioValue("shape"),
        size: { x: getIntValue("gs1"), y: getIntValue("gs1") },
        populate: true,
      }),
    ];
  },
  rend = () => {
    const config = getForm();
    let last;
    while ((last = renderContext.lastChild)) {
      renderContext.removeChild(last);
    }
    Renderer.render(...config);
  };
document.addEventListener("DOMContentLoaded", rend);
inputs.addEventListener("input", rend);
//# sourceMappingURL=index.js.map
