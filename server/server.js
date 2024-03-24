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

app.use(
  cors({
    origin: ["https://next-sneakers.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successfull..."))
  .catch((err) => console.log("MongoDB connection failed", err.message));

app.get("/", (req, res) => {
  res.json("HELLO");
});

app.use("/account/register", register);
app.use("/account/login", login);
app.use("/stripe", stripe);
app.use("/account/order", order);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

app.listen(port, console.log(`Server running on port ${port}`));
