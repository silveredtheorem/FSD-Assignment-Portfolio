const express = require("express");
const cors = require("cors");
const path = require("path");
const projectsRouter = require("./routes/projects.routes");
const contactRouter = require("./routes/contact.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/contact", contactRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
