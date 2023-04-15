const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const genAuthToken = require("../utils/genAuthToken");
const { User } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthday: Joi.string().required(),
    gender: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  console.log(req.body);

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("This email has already been registered.");

  const { firstName, lastName, birthday, gender, email, password } = req.body;

  user = new User({
    firstName,
    lastName,
    birthday,
    gender,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = genAuthToken(user);

  res.send(token);
});

module.exports = router;
