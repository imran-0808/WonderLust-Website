//joi is a validaation library for javascrip that allows us to create schemas for our data to ensure that the data we are receiving is in the correct format and meets our requirements.
const Joi = require("joi");

// Define schema
module.exports.listingSchema = Joi.object({
  listing0: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("", null),
    price: Joi.number().min(0).required(),
    country: Joi.string().required(),
    location: Joi.string().required(),
  }),
});
