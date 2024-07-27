const httpStatus = require("http-status");
const passport = require("passport");
const Admin = require("../models/admin.model");
const APIError = require("../errors/api-error");

var LOGGED_ADMIN;


const handleJWT = (req, res, next) => async (err, admin, info) => {
    const error = err || info;
    const logIn = Promise.promisify(req.logIn);
    const apiError = new APIError({
        message: error ? error.message : "Unauthorized",
        status: httpStatus.UNAUTHORIZED,
        stack: error ? error.stack : undefined,
    });

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
