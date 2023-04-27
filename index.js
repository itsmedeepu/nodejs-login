const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");

const dbconnection = require("./conn/conn");
const port = 5000 || process.env.port;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//creating session

app.use(
  session({ secret: "Your_Secret_Key", resave: true, saveUninitialized: true })
);

const user = require("./routes/user");
app.use(express.static(path.join(__dirname, "public")));
//user routes
app.use("/user", user);

//admin routes
const admin = require("./routes/admin");
app.use("/admin", admin);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
