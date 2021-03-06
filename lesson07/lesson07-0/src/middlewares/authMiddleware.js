const jwt = require("jsonwebtoken");
require("dotenv");
const JWT_SECRET = process.env.JWT_SECRET;

const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");

  if (!token) {
    next(new NotAuthorizedError("Please, provide a token"));
  }

  try {
    const user = jwt.decode(token, JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
