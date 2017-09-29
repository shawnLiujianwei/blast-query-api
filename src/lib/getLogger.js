/**
 * Created by shawn-liu on 17/9/29.
 */
const log4js = require('log4js');

module.exports = (category) => {
    const logger = log4js.getLogger(category);
    logger.level = process.env.LOG_LEVEL || 'debug';
    return logger;
};
