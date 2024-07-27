const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            match: /^\S+@\S+\.\S+$/,
            unique: true,
            trim: true,
            lowercase: true,
            sparse: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        stay_signed_in: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
            minlength: 6,
            maxlength: 6,
        },
        otp_expiry: { type: Date },
        created_by: String,
        updated_by: String,
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
        underscore: true,
    },
);

module.exports = mongoose.model("Admin", Admin);
