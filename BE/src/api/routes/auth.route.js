const express = require('express');
const controller = require('../controllers/admin.controller');
const validate = require('express-validation');
const { authorize,  LOGGED_ADMIN } = require('../middlewares/authAdmin.js');
const {
    addAdmin,
    deleteAdmin,
    updateAdmin,
    login,
    changePassword,
} = require('../../validations/admin.validation');

const router = express.Router();


router.route('/add-admin')
    .post(authorize(LOGGED_ADMIN), validate(addAdmin),
        controller.addAdmin);

router.route('/delete-admin/:adminId')
    .delete(authorize(LOGGED_ADMIN), validate(deleteAdmin), controller.deleteAdmin);

router.route('/update-admin/:adminId')
    .patch(authorize(LOGGED_ADMIN), validate(updateAdmin), controller.updateAdmin);

router.route('/get-admins/')
    .get(authorize(LOGGED_ADMIN), controller.getAdmins);

router.route('/login')
    .post(validate(login), controller.login);

router.route('/change-password')
    .patch(authorize(LOGGED_ADMIN), validate(changePassword), controller.changePassword);

router.route('/forgot-password')
    .post(controller.forgotPassword);

router.route('/verify-otp')
    .put(controller.verifyOtp);

router.route('/forgot-password-change')
    .put(controller.forgotPasswordChange);

module.exports = router;
