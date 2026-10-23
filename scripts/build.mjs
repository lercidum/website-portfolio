import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.resolve(root, "dist");

// Only clear the generated output directory inside this project.
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== "dist") {
  throw new Error("Build output must be the project's dist directory.");
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const pages = (await readdir(root)).filter((file) => file.endsWith(".html"));
for (const file of [...pages, "style.css", "script.js", "assets"]) {
  await cp(path.join(root, file), path.join(output, file), { recursive: true });
}

console.log(`Built ${pages.length} pages with styles, scripts, and assets in dist/.`);
