const {ValidationError, WrongParametersError} = require('./errors');

const asyncWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  if (
    error instanceof ValidationError ||
    error instanceof WrongParametersError
  ) {
    return res.status(error.status).json({message: error.message});
  }
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
};

module.exports = {
  asyncWrapper,
  errorHandler,
};
