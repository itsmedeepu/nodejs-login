const express = require("express");
const app = express();
const path = require("path");

const port = 5000 || process.env.port;
const session = require("express-session");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(session({ secret: "deepak", resave: true, saveUninitialized: true }));

const user = require("./routes/user");
app.use(express.static(path.join(__dirname, "public", "user")));

app.use("/user", user);

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
