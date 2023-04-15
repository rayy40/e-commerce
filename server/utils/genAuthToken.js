const jwt = require("jsonwebtoken");

const genAuthToken = (user) => {
  const secretkey = process.env.JWT_SECRET_KEY;

  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      birthday: user.birthday,
      gender: user.gender,
      email: user.email,
    },
    secretkey
  );

  return token;
};

module.exports = genAuthToken;
