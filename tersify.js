import { minify } from "terser";
import { promises as fs } from "fs";

const inputdir = "./build",
  outputdir = "./public/js",
  options = {
    mangle: { module: true },
    nameCache: {},
    sourceMap: { content: "inline", url: "inline" },
  },
  dir = await fs.readdir(inputdir, { withFileTypes: true });

for (const dirent of dir) {
  if (dirent.name.endsWith(".js")) {
    fs.readFile(`${inputdir}/${dirent.name}`, "utf-8")
      .then(res => minify(res, options))
      .then(res => fs.writeFile(`${outputdir}/${dirent.name}`, res.code));
  }
}
