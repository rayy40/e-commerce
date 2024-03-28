const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const order = require("./routes/order");

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

require("dotenv").config();

app.use(cors());
app.use("/stripe/webhook", express.raw({ type: "application/json" }));
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successfull..."))
  .catch((err) => console.log("MongoDB connection failed", err.message));

app.get("/", (req, res) => {
  res.json("Ecommerce server");
});

app.use("/account/register", cors(), register);
app.use("/account/login", cors(), login);
app.use("/stripe", cors(), stripe);
app.use("/account/order", cors(), order);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, console.log(`Server running on port ${port}`));
