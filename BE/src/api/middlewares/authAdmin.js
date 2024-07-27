const httpStatus = require("http-status");
const passport = require("passport");
const Admin = require("../models/admin.model");
const APIError = require("../errors/api-error");
const TokenBlacklist = require("../models/tokenBlacklist.model");

var LOGGED_ADMIN;

const handleJWT = (req, res, next) => async (err, admin, info) => {
    const error = err || info;
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format

    const logIn = Promise.promisify(req.logIn);
    const apiError = new APIError({
        message: error ? error.message : "Unauthorized",
        status: httpStatus.UNAUTHORIZED,
        stack: error ? error.stack : undefined,
    });
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    if (blacklistedToken && blacklistedToken.expiresAt > Date.now()) {
        return res.status(401).json({ success: false, message: "Token is invalid or expired" });
    }
    try {
        if (error || !admin) throw error;
        await logIn(admin, { session: false });
    } catch (e) {
        return next(apiError);
    }

    const isAvailable = await Admin.findOne({ _id: admin.id });
    console.log(isAvailable);
    if (!isAvailable) {
        apiError.status = httpStatus.FORBIDDEN;
        apiError.message = "Forbidden";
        return next(apiError);
    }

    req.admin = admin;
    return next();
};

exports.LOGGED_ADMIN = LOGGED_ADMIN;

exports.authorize =
    (roles = Admin.roles) =>
    (req, res, next) =>
        passport.authenticate("jwt", { session: false }, handleJWT(req, res, next))(req, res, next);
