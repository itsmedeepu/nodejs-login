const adminschema = require("../model/adminmodel");
const userschema = require("../model/userModal");

const path = require("path");

const adminauth = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("login");
  }
};

const register = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin", "register.html"));
};

const adminregister = async (req, res) => {
  try {
    const adminreg = new adminschema(req.body);

    await adminreg
      .save()
      .then((e) => console.log("admin saved"))
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("Something went bad at server");
  }
};

const loginpage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin", "login.html"));
};

const login = async (req, res) => {
  try {
    const admin = await adminschema.findOne({
      email: req.body.username,
      password: req.body.password,
    });
    if (admin) {
      req.session.admin = admin;
      console.log("logged in sucessfullt");

      res.redirect("dashboard");
    } else {
      res.redirect("login");
    }
  } catch (err) {
    console.log("something went bad at server");
  }
};

const dashboard = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin", "dashboard.html"));
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Something went bad at server");
    } else {
      res.redirect("login");
    }
  });
};

const getallusers = async (req, res) => {
  const allusers = await userschema.find({});

  res.send(allusers);
};
module.exports = {
  register,
  adminregister,
  adminauth,
  loginpage,
  login,
  dashboard,
  logout,
  getallusers,
};
