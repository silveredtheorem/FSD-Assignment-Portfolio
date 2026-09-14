const express = require("express");
const projects = require("../data/projects");

const router = express.Router();

function withAbsoluteImage(project, req) {
  const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
  return { ...project, image: `${baseUrl}${project.image}` };
}

router.get("/", (req, res) => {
  res.status(200).json(projects.map((project) => withAbsoluteImage(project, req)));
});

router.get("/:id", (req, res) => {
  const project = projects.find((p) => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.status(200).json(withAbsoluteImage(project, req));
});

module.exports = router;
