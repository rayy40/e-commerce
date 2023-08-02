const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const order = require("./routes/order");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/account/register", register);
app.use("/account/login", login);
app.use("/stripe", stripe);
app.use("/account/order", order);

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, console.log(`Server running on port ${port}`));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successfull..."))
  .catch((err) => console.log("MongoDB connection failed", err.message));
