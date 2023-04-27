const mongoose = require("mongoose");
const dbconnection = mongoose
  .connect("mongodb://localhost:27017/user_config", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection sucessfull"))
  .catch((err) => console.log(err));

module.exports = dbconnection;
