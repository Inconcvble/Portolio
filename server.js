import fs from "fs/promises";
import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());

app.post("/addProject", async function (req, res) {
  try {
    const filePath = path.join(__dirname, "projects.json");
    const data = await fs.readFile(filePath, "utf8");
    const projects = JSON.parse(data);
    projects.push(req.body);
    const updatedProjects = JSON.stringify(projects, null, 2);
    fs.writeFile("projects.json", updatedProjects);
    res.json({ success: true });
  } catch (err) {
    if (err.code === "ENOENT") {
      const newProjects = [req.body];
      await fs.writeFile(filePath, JSON.stringify(newProjects, null, 2));
      res.json({ success: true });
    } else {
      console.log(err);
      res.status(500).send("Error reading file");
    }
  }
});

app.listen(3000);
