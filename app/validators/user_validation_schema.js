const Joi = require('joi');

const schema = {
    signup: Joi.object({
        user_email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required(),
        first_name: Joi.string().trim().required(),
        last_name: Joi.string().trim().required(),
    }),
    signin: Joi.object({
        user_email: Joi.string().email().trim().required(),
        password: Joi.string().trim().required()
    }),
    changePassword: Joi.object({
        current_password: Joi.string().trim().required(),
        new_password: Joi.string().trim().required()
    }),
};

module.exports = schema;