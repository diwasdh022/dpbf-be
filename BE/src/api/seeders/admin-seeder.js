const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/admin.model");
const { mongo } = require("../../config/vars");

async function seedAdmin() {
    await mongoose.connect(mongo.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const adminData = {
        name: "Admin",
        designation: "superAdmin",
        contact: "9814533365",
        email: "diwasdhakal75@gmail.com",
        password: "Admin@123",
        status: true,
        stay_signed_in: true,
    };
    const password = await bcrypt.hash(adminData.password, 10);
    adminData.password = password;
    await UserModel.create(adminData);
}

seedAdmin()
    .then(() => {
        console.log("Admin seeding completed");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Error seeding admin:", err);
        process.exit(1);
    });
