const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATA_FILE = path.resolve(process.env.CONTACTS_DATA_FILE || path.join(__dirname, "../data/contacts.json"));

function readSubmissions() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const raw = fs.readFileSync(DATA_FILE, "utf-8").trim();
  return raw ? JSON.parse(raw) : [];
}

function writeSubmissions(submissions) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
}

router.post("/", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: "name is required" });
  }
  if (!email || !String(email).trim()) {
    return res.status(400).json({ error: "email is required" });
  }
  if (!EMAIL_PATTERN.test(String(email).trim())) {
    return res.status(400).json({ error: "email must be a valid email address" });
  }
  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "message is required" });
  }

  const submission = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    receivedAt: new Date().toISOString(),
  };

  const submissions = readSubmissions();
  submissions.push(submission);
  writeSubmissions(submissions);

  res.status(201).json({ message: "thanks, your message has been received", submission });
});

router.get("/", (req, res) => {
  res.status(200).json(readSubmissions());
});

module.exports = router;
