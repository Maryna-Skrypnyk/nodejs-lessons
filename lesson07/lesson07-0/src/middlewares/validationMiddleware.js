const Joi = require("joi");
const { ValidationError } = require("../helpers/errors");

module.exports = {
  addPostValidation: (req, res, next) => {
    // next(new Error("validation failed!!!")); // для перевірки
    const schema = Joi.object({
      topic: Joi.string().min(3).max(30).required(),
      text: Joi.string().min(10).max(400).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(JSON.stringify(validationResult.error.details)));
      // return res
      //   .status(400)
      //   .json({ status: validationResult.error.details[0].message });
    }

    next();
  },
};
