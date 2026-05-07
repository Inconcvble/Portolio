import fs from "fs/promises";
import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import multer from "multer";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(cors());

app.post(
  "/addProject",
  upload.fields([{ name: "screenshots" }, { name: "videos" }]),
  async function (req, res) {
    console.log(req.files);
    console.log(req.body, req.files);
    const filePath = path.join(__dirname, "projects.json");

    const technologies = req.body.technologies.split(",");
    const screenshots =
      req.files["screenshots"]?.map((f) => f.originalname) ?? [];
    const videos = req.files["videos"]?.map((f) => f.originalname) ?? [];

    const project = {
      name: req.body.name,
      status: req.body.status,
      description: req.body.description,
      technologies: technologies,
      screenshots: screenshots,
      videos: videos,
      liveDemo: req.body.liveDemo,
    };

    try {
      const data = await fs.readFile(filePath, "utf8");
      const projects = JSON.parse(data);

      projects.push(project);

      const updatedProjects = JSON.stringify(projects, null, 2);
      fs.writeFile("projects.json", updatedProjects);
      res.json({ success: true });
    } catch (err) {
      if (err.code === "ENOENT") {
        const newProjects = [project];
        await fs.writeFile(filePath, JSON.stringify(newProjects, null, 2));
        res.json({ success: true });
      } else {
        console.log(err);
        res.status(500).send("Error reading file");
      }
    }
  },
);

app.listen(3000);
