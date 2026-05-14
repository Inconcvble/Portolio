import fs from "fs/promises";
import path from "path";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import multer from "multer";
import { extname } from "path";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(cors());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
    },
  }),
);

app.post(
  "/addProject",
  upload.fields([{ name: "screenshots" }, { name: "videos" }]),
  async function (req, res) {
    console.log(req.files);
    console.log(req.body, req.files);
    const filePath = path.join(__dirname, "projects.json");

    const technologies = req.body.technologies.split(",");
    const screenshots = req.files["screenshots"]?.map((f) => f.filename) ?? [];
    const videos = req.files["videos"]?.map((f) => f.filename) ?? [];

    const project = {
      id: crypto.randomUUID(),
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
      fs.writeFile(filePath, updatedProjects);
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

app.get("/projects", async function (req, res) {
  const filePath = path.join(__dirname, "projects.json");
  try {
    const data = await fs.readFile(filePath, "utf8");
    const projects = JSON.parse(data);
    res.json(projects);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.json([]);
    } else {
      res.status(500).send("Error reading file");
    }
  }
});

app.put("/updateProject", async function (req, res) {
  const filePath = path.join(__dirname, "projects.json");
  const updatedProject = req.body;

  try {
    const data = await fs.readFile(filePath, "utf8");
    const projects = JSON.parse(data);

    const index = projects.findIndex((p) => p.id === updatedProject.id);

    if (index === -1) {
      return res.status(404).json({ error: "Project not found" });
    }

    projects[index] = {
      ...projects[index],
      ...updatedProject,
      screenshots: projects[index].screenshots,
      videos: projects[index].videos,
    };
    await fs.writeFile(filePath, JSON.stringify(projects, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating project");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
