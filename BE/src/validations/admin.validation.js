const Joi = require("joi");

module.exports = {
    // POST /v1/admin/add-admin
    addAdmin: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required().min(8).max(128),
            contact: Joi.string().required(),
            designation: Joi.string().required(),
            status: Joi.boolean(),
        }),
    },
    // DELETE /v1/admin/delete-admin/:adminId
    deleteAdmin: {
        params: Joi.object({
            adminId: Joi.string()
                .regex(/^[a-fA-F0-9]{24}$/)
                .required(),
        }),
    },
    // PATCH /v1/admin/update-admin/:adminId
    updateAdmin: {
        body: Joi.object({
            name: Joi.string(),
            email: Joi.string().email(),
            contact: Joi.string(),
            designation: Joi.string(),
            status: Joi.boolean(),
        }),
        params: Joi.object({
            adminId: Joi.string()
                .regex(/^[a-fA-F0-9]{24}$/)
                .required(),
        }),
    },
    // POST /v1/admin/login
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required().min(6).max(128),
        }),
    },
    changePassword: {
        body: Joi.object({
            old_password: Joi.string().required().min(6).max(128),
            password: Joi.string().required().min(6).max(128),
            confirm_password: Joi.string().required().min(6).max(128),
        }),
    },
};
