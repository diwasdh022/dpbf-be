const httpStatus = require("http-status");
const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const { omit } = require("lodash");
const tokenGenerate = require("../helpers/tokenGenetator");
const { loggerInfoMessage } = require("../helpers/loggerMessage");
const nodemailer = require("nodemailer");
const moment = require("moment-timezone");

module.exports = {
    // @Desc    ADMIN - Add new admin
    // @Route   POST|AUTH /v1/admin/add-admin
    // @Params  name|designation|contact|email|password|role|status
    addAdmin: async (req, res, next) => {
        try {
            const adminWithSameEmail = await Admin.findOne({
                email: req.body["email"],
            });
            if (adminWithSameEmail) {
                throw new Error("Admin with this email already exists");
            }
            if (req.body["contact"].length > 16) {
                throw new Error("Contact must be less then 16 digit");
            } else if (req.body["contact"].length < 10) {
                throw new Error("Contact must be at least 10 digit");
            }
            req.body["created_by"] = req.admin["name"];
            const password = await bcrypt.hash(req.body["password"], 10);
            const adminData = omit(req.body, "password");
            await Admin.create({ password, ...adminData });
            loggerInfoMessage(req.admin["name"], "New admin added", req.body.name);
            res.status(httpStatus.CREATED);
            return res.json({
                success: true,
                message: "Admin created successfully!",
                data: adminData,
            });
        } catch (error) {
            return next(error);
        }
    },
    // @Desc    ADMIN - Delete admin
    // @Route   DELETE|AUTH /v1/admin/delete-admin/:adminId
    deleteAdmin: async (req, res, next) => {
        try {
            const { adminId } = req.params;
            const admin = await Admin.findOne({ _id: adminId }).exec();
            if (!admin) {
                return res.status(404).json({ success: false, message: "Admin not found" });
            }
            await Admin.deleteOne({ _id: adminId });
            loggerInfoMessage(req.admin["name"], "Admin deleted", admin.name);
            return res.json({ success: true, message: "Admin account deleted successfully" });
        } catch (error) {
            return next(error);
        }
    },
    // @Desc    ADMIN - Add new admin
    // @Route   PATCH|AUTH /v1/admin/update-admin/:adminId
    // @Params  name|designation|contact|email|password|role|status
    updateAdmin: async (req, res, next) => {
        try {
            const { adminId } = req.params;
            req.body["updated_by"] = req.admin["name"];
            const adminData = omit(req.body, "password");
            const admin = await Admin.findOne({ _id: adminId }).exec();
            if (req.body["password"] && req.body["password"] != "") {
                const checkPassword = await bcrypt.compare(req.body["password"], admin["password"]);
                if (checkPassword)
                    return res.status(403).json({
                        success: false,
                        message: "Old password and new password cannot be the same!",
                    });
                adminData["password"] = await bcrypt.hash(req.body["password"], 10);
            }
            if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });
            await Admin.updateOne({ _id: adminId }, adminData);
            loggerInfoMessage(req.admin["name"], "Admin updated", admin.name);
            return res.json({ success: true, message: "Admin account updated successfully" });
        } catch (error) {
            return next(error);
        }
    },
    // @Desc    Get logged in admin details
    // @Route   GET|AUTH /v1/admin/get-admin
    getAdmin: async (req, res, next) => {
        try {
            const adminId = req.admin["_id"];
            const admin = await Admin.findOne({ _id: adminId })
                .select("name email contact designation ")
                .lean();
            return res.json({ success: true, data: admin });
        } catch (error) {
            return next(error);
        }
    },
    // @Desc    Get single admin details
    // @Route   GET|AUTH /v1/admin/get-admin-detail/:adminId
    getAdminDetail: async (req, res, next) => {
        try {
            const { adminId } = req.params;
            const admin = await Admin.findOne({ _id: adminId })
                .select("name email contact designation password")
                .lean();
            return res.json({ success: true, data: admin });
        } catch (error) {
            return next(error);
        }
    },
    // @Desc    ADMIN - Get admin list
    // @Route   GET|AUTH /v1/admin/get-admins?limit&page&keyword&role&sort&sortBy
    getAdmins: async (req, res, next) => {
        try {
            const { keyword, sort, sort_by } = req.query;
            const sortBy = sort_by || "created_at";
            const sortObj = { [sortBy]: sort == "desc" || sort == "asc" ? sort : "desc" };
            const limit = parseInt(req.query.limit) || 10;
            const page = Number(req.query.page) || 1;
            const whereObj = {
                ...(keyword && {
                    $and: [
                        {
                            $or: [
                                { name: { $regex: keyword, $options: "i" } },
                                { designation: { $regex: keyword, $options: "i" } },
                                { contact: { $regex: keyword, $options: "i" } },
                                { email: { $regex: keyword, $options: "i" } },
                            ],
                        },
                    ],
                }),
                // _id: { $nin: [adminId] },
                deleted_at: { $exists: false },
            };

            const count = await Admin.countDocuments(whereObj);
            const admins = await Admin.find(whereObj)
                .select(
                    "name email contact designation status created_at updated_at created_by updated_by",
                )
                .collation({ locale: "en" })
                .sort(sortObj)
                .limit(limit)
                .skip(limit * (page - 1));
            const paging = { page, pages: Math.ceil(count / limit), totalItems: count };
            return res.json({
                success: true,
                message: "Admins data fetched",
                data: admins,
                paging,
            });
        } catch (error) {
            return next(error);
        }
    },
    registration: async (req, res, next) => {
        try {
            const adminWithSameEmail = await Admin.findOne({
                email: req.body["email"],
            });
            if (adminWithSameEmail) {
                return res.status(409).json({ success: false, message: "Email already exists" });
            }
            const password = await bcrypt.hash(req.body["password"], 10);
            const adminData = omit(req.body, "password");
            adminData["created_by"] = req.admin["name"];
            const admin = await new Admin({ password, ...adminData }).save();
            const token = await tokenGenerate(admin);
            loggerInfoMessage(req.admin["name"], "New admin registered", admin.name);
            res.status(httpStatus.CREATED);
            return res.json({ success: true, message: "Admin registered", data: token });
        } catch (error) {
            return next(error);
        }
    },
    // @Desc    ADMIN - Login
    // @Route   POST /v1/admin/login
    // @Params  email|password
    login: async (req, res, next) => {
        try {
            const { email, password, stay } = req.body;
            const admin = await Admin.findOne({ email }).exec();
            if (!admin) return res.status(404).json({ success: false, message: "Admin not found" });

            const checkPassword = await bcrypt.compare(password, admin["password"]);
            if (!checkPassword)
                res.status(409).json({ success: false, message: "Incorrect email or password" });

            if (admin["status"] != true)
                res.status(404).json({
                    success: false,
                    message: "Your account is inactive. Please contact with superadmin.",
                });

            const token = await tokenGenerate(admin, stay);

            return res.json({ success: true, message: "Login success", data: token });
        } catch (error) {
            return next(error);
        }
    },
    // @Desc    ADMIN - Change admin password
    // @Route   PATCH /v1/admin/change-password
    // @Params  old_password|password|confirm_password
    changePassword: async (req, res, next) => {
        try {
            const adminId = req.admin["_id"];
            const { old_password, password, confirm_password } = req.body;

            const admin = await Admin.findOne({ _id: adminId });
            if (!admin) return res.status(403).json({ success: false, message: "Admin not found" });

            const checkPassword = await bcrypt.compare(old_password, admin["password"]);
            if (!checkPassword)
                return res.status(403).json({ success: false, message: "Incorrect old password" });

            if (password !== confirm_password) {
                return res.status(403).json({
                    success: false,
                    message: `New password and confirm password don't matched!`,
                });
            }

            if (old_password === password) {
                return res.status(403).json({
                    success: false,
                    message: "Old password and new password cannot be the same!",
                });
            }

            admin["password"] = await bcrypt.hash(req.body["password"], 10);
            admin.save();
            loggerInfoMessage(req.admin["name"], "Admin password deleted", admin.name);

            return res.json({ success: true, message: "Password Changed!" });
        } catch (error) {
            return next(error);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { email } = req.body;
            const otp = await generateOTP();
            const admin = await Admin.findOne({ email }).exec();
            if (admin) {
                await Admin.updateOne({ email }, { otp: otp["otp"], otp_expiry: otp["expiresIn"] });
                const transporter = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                const options = {
                    from: process.env.EMAIL_USERNAME,
                    to: email,
                    subject: `Reset your password`,
                    text: `Your verification code to reset your password is ${otp.otp}. Please do not share this code with anyone.`,
                };

                transporter.sendMail(options, function (err, info) {
                    if (err) {
                        console.log(err, info);
                        return;
                    }
                });
                return res.json({ success: true, message: "OTP sent" });
            }
            return res.status(404).json({ message: `Admin doesn't exist.` });
        } catch (error) {
            return next(error);
        }
    },
    verifyOtp: async (req, res, next) => {
        try {
            const { email, otp } = req.body;
            const admin = await Admin.findOne({ email }).exec();
            if (!admin) return res.status(404).json({ message: `Admin doesn't exist.` });

            if (otp === admin["otp"]) {
                if (moment().isAfter(admin["otp_expiry"])) {
                    return res.status(403).json({ message: "OTP is expired" });
                }
                admin["otp_expiry"] = Date.now();
                await admin.save();
                return res.json({ success: true, message: "OTP verified" });
            }
            return res.status(403).json({ success: false, message: "Invalid OTP" });
        } catch (error) {
            return next(error);
        }
    },
    forgotPasswordChange: async (req, res, next) => {
        try {
            const { email, password, confirm_password } = req.body;

            const admin = await Admin.findOne({ email });
            if (!admin) return res.status(403).json({ success: false, message: "Admin not found" });

            if (password !== confirm_password) {
                return res.status(403).json({
                    success: false,
                    message: `New password and confirm password don't matched!`,
                });
            }

            admin["password"] = await bcrypt.hash(req.body["password"], 10);
            admin.save();
            return res.json({ success: true, message: "Password Changed!" });
        } catch (error) {
            return next(error);
        }
    },
};

// Genetage OTP
const generateOTP = async () => {
    var otp = Math.floor(100000 + Math.random() * 900000);
    const expiresIn = moment().add(5, "minutes");
    const admin = await Admin.findOne({ otp });
    if (!admin && otp) {
        return { otp, expiresIn };
    }
    return await generateOTP();
};
