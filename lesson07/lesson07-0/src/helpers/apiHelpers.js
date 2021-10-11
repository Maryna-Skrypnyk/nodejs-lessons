const { Nodejs26Error } = require("./errors");

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, _req, res, _next) => {
  if (error instanceof Nodejs26Error) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
