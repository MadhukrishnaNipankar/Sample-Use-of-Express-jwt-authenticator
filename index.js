const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config({ path: "./config.env" });
const connectDb = require("./db");
const {
  User,
  register,
  login,
  protect,
  deleteUserAccount,
} = require("express-jwt-authenticator");

app.use(express.json());

connectDb(process.env.CONNECTION_STRING);

app.get("/", protect, (req, res) => {
  res.send(
    `<h1>This is Test Application made using Express-jwt-authenticator<h1>
    <i>This page will only be visible when logged in!!<i/>
    `
  );
});

app.post("/register", register);
app.post("/login", login);
app.delete("/delete", protect, deleteUserAccount);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
