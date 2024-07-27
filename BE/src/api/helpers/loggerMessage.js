const logger = require('../../config/logger');

exports.loggerInfoMessage = (adminName, message, fieldName) => {
    logger.info(`${adminName} - ${message}: '${fieldName}'`);
}

exports.loggerErrorMessage = (adminName, message, stack) => {
    logger.error({ name: adminName, desc: message, stack });
}