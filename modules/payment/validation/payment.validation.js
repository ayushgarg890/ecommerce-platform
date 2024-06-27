const Joi = require("joi");

const paymentSchema = Joi.object({
  user: Joi.string().required(),
  order: Joi.string().required(),
  amount: Joi.number().min(0).required(),
});

module.exports = {
  paymentSchema,
};
