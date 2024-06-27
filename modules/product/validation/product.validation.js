const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).required(),
    price: Joi.number().min(0).required(),
    stock: Joi.number().min(0).required()
});

module.exports = {
    productSchema
};
