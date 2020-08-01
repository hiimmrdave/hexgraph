import { expect } from "chai";
import { it } from "mocha";
import { XYVector, GridShape } from "../src/types";
import * as Grid from "../src/grid";

describe("grid functions", function() {
  const size: XYVector = { x: 3, y: 5 };

  it("start with a hex grid", () => {
    const hexgrid = Grid.make({
      shape: GridShape.Hexagon,
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.nodetype}:\t${key}`));
    expect(hexgrid.size).to.equal(145);
  });

  it("start with a triangle grid", () => {
    const hexgrid = Grid.make({
      shape: GridShape.Triangle,
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.nodetype}:\t${key}`));
    expect(hexgrid.size).to.equal(85);
  });

  it("start with a star grid", () => {
    const hexgrid = Grid.make({ shape: GridShape.Star, size, populate: true });
    hexgrid.forEach((val, key) => console.log(`${val.nodetype}:\t${key}`));
    expect(hexgrid.size).to.equal(457);
  });

  it("start with a parallelogram grid", () => {
    const hexgrid = Grid.make({
      shape: GridShape.Parallelogram,
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.nodetype}:\t${key}`));
    expect(hexgrid.size).to.equal(183);
  });

  it("start with a rectangle grid", () => {
    const hexgrid = Grid.make({
      shape: GridShape.Rectangle,
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.nodetype}:\t${key}`));
    expect(hexgrid.size).to.equal(155);
  });
});
