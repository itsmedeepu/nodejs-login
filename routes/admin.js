const express = require("express");
const router = express.Router();
const {
  adminregister,
  register,
  adminauth,
  dashboard,
  login,
  loginpage,
  logout,
  getallusers,
} = require("../controller/adminController");

router.get("/", (req, res) => {
  console.log("admin route working perfectly");
  res.send(`admin routes working fine`);
});
router.get("/register", register);
router.post("/register", adminregister);

router.get("/login", loginpage);

router.get("/dashboard", adminauth, dashboard);
router.post("/login", login);

router.get("/logout", logout);
router.get("/allusers", adminauth, getallusers);
module.exports = router;
