const Joi = require("joi");

const schemaCat = Joi.object({
  name: Joi.string().alphanum().min(1).max(20).required(),
  age: Joi.number().integer().min(1).max(30).required(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const pattern = "\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}";

const schemaId = Joi.object({
  id: Joi.string().pattern(new RegExp(pattern)).required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateCat = async (req, res, next) => {
  return await validate(schemaCat, req.body, res, next);
};

module.exports.validateStatusCat = async (req, res, next) => {
  return await validate(schemaStatusCat, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
