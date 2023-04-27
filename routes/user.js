const express = require("express");
const path = require("path");
const router = express.Router();

const {
  logincontroller,
  authFunctin,
  dashboardcontroller,
  logoutController,
  userRegister,
  registerPage,
} = require("../controller/userController");
const { adminauth } = require("../controller/adminController");

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "user", "login.html"));
});

router.post("/login", logincontroller);

router.get("/dashboard", authFunctin, dashboardcontroller);

router.get("/logout", logoutController);

router.get("/", (req, res) => {
  res.send(`Home page of user route`);
  console.log("im home route");
});

router.get("/register", registerPage);

router.post("/register", userRegister);

module.exports = router;
