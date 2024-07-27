const { jwtExpirationInterval, jwtExpirationDays, jwtSecret } = require('../../config/vars');
const RefreshToken = require('../models/refreshToken.model');
const jwt = require('jwt-simple');
const moment = require('moment');
const crypto = require('crypto');

module.exports = async (admin, stay) => {
    const { accessToken, refreshToken } = await generateToken(admin, stay);
    const expires = moment().add(stay ? jwtExpirationDays : 12, stay ? 'days' : 'hours').toDate();
    const { name, role } = admin
    if (accessToken) {
        const rToken = new RefreshToken({
            token: refreshToken,
            userId: admin._id,
            userPhone: admin.contact,
            expires,
        });
        if (rToken) {
            await rToken.save();
            return {
                accessToken,
                refreshToken,
                name,
                role,
                expires,
                tokenType: 'Bearer',
            };
        }
    }
};

const generateToken = async (admin, stay) => {
    const payload = {
        exp: moment().add(stay ? jwtExpirationDays : 12, stay ? 'days' : 'hours').unix(),
        iat: moment().unix(),
        sub: admin._id,
    };
    const accessToken = jwt.encode(payload, jwtSecret);
    const refreshToken = `${admin._id}.${crypto.randomBytes(40).toString('hex')}`;
    return { accessToken, refreshToken };
}