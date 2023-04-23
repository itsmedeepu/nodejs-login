const express = require("express");
const router = express.Router();
const path = require("path");

const authLogin = (req, res, next) => {
  if (req.body.username === "deeksha" && req.body.password === "raj") {
    req.session.username = "deeksha";
    req.session.password = "raj";
  }
  if (req.session.username !== undefined) {
    next();
  } else {
    res.redirect("login");
  }
};
router.get("/", (req, res) => {
  res.send("im home page");
});
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "user", "login.html"));
});

router.post("/login", authLogin, (req, res) => {
  res.redirect("dashboard");
});

router.get("/dashboard", authLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "user", "dashboard.html"));
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.redirect("login");
  });
});

module.exports = router;
