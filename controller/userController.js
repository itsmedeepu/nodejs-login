const path = require("path");
const User = require("../model/userModal");

const authFunctin = (req, res, next) => {
  if (req.session.username) {
    next();
  } else {
    res.redirect("login");
  }
};

const registerPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "user", "register.html"));
};

const userRegister = async (req, res) => {
  const user = new User(req.body);
  try {
    await user
      .save()
      .then(() => console.log("user saved"))
      .catch((err) => console.log(err));
  } catch (err) {
    console.log("Something Went Bad");
  }
};

const logincontroller = async (req, res) => {
  try {
    let finduser = await User.findOne({
      email: req.body.username,
      password: req.body.password,
    });

    if (finduser) {
      req.session.username = finduser.email;

      res.redirect("dashboard");
    } else {
      res.redirect("login");
    }
  } catch (err) {
    console.log("something went bad at server ");
  }
};

const dashboardcontroller = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "user", "dashboard.html"));
};

const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("login");
  });
};
module.exports = {
  logincontroller,
  authFunctin,
  dashboardcontroller,
  logoutController,
  registerPage,
  userRegister,
};
