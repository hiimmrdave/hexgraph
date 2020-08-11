import * as Render from "./renderer.js";
import * as Layout from "./layout.js";
import * as Grid from "./grid.js";

const gridTarget = "hg",
  layout = Layout.config(
    0,
    { x: 10, y: 10 },
    { x: 250, y: 250 },
    { x: 500, y: 500 }
  ),
  grid = Grid.make({ populate: true });
document.addEventListener("DOMContentLoaded", () => {
  Render.render(gridTarget, layout, grid);
});
