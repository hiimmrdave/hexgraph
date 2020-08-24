import { expect } from "chai";
import { it } from "mocha";
import { XYVector } from "../src/layout";
import * as Grid from "../src/grid";

describe("grid functions", function() {
  const size: XYVector = { x: 3, y: 5 };

  it("start with a hex grid", () => {
    const hexgrid = Grid.make({
      shape: "Hexagon",
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.kind}:\t${key}`));
    expect(hexgrid.size).to.equal(145);
  });

  it("start with a triangle grid", () => {
    const hexgrid = Grid.make({
      shape: "Triangle",
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.kind}:\t${key}`));
    expect(hexgrid.size).to.equal(85);
  });

  it("start with a star grid", () => {
    const hexgrid = Grid.make({ shape: "Star", size, populate: true });
    hexgrid.forEach((val, key) => console.log(`${val.kind}:\t${key}`));
    expect(hexgrid.size).to.equal(457);
  });

  it("start with a parallelogram grid", () => {
    const hexgrid = Grid.make({
      shape: "Parallelogram",
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.kind}:\t${key}`));
    expect(hexgrid.size).to.equal(183);
  });

  it("start with a rectangle grid", () => {
    const hexgrid = Grid.make({
      shape: "Rectangle",
      size,
      populate: true,
    });
    hexgrid.forEach((val, key) => console.log(`${val.kind}:\t${key}`));
    expect(hexgrid.size).to.equal(155);
  });
});
