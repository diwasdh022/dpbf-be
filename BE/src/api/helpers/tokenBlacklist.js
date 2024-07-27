const TokenBlacklist = require("../models/tokenBlacklist.model");

const blacklistToken = async (token) => {
    // Define a reasonable expiration time for blacklisting
    const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store token in blacklist with an expiration time
    await TokenBlacklist.create({ token, expiresAt: expiration });
};

module.exports = { blacklistToken };
