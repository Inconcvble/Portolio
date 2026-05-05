import { writeFile } from "node:fs/promises";
import { createJson } from "./data.js";

const jsonString = createJson();

writeFile("projects.json", jsonString, (err) => {
  if (err) throw err;
  console.log("File has been saved!");
});
