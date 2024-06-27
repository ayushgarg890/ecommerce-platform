const Joi = require("joi");

const orderSchema = Joi.object({
  user: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .required(),
  totalAmount: Joi.number().min(0).required(),
  status: Joi.string()
    .valid("pending", "shipped", "delivered", "cancelled")
    .default("pending"),
});

module.exports = {
  orderSchema,
};
