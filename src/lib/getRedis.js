/**
 * Created by Shawn Liu on 17/6/15.
 */
const redis = require('redis');
const Promise = require('bluebird');

let redisClient = null;
module.exports = function () {
    if (!redisClient) {
        const redisConfig = {
            host: process.env.redisHost || '192.168.3.89',
            port: process.env.redisPort || 6379
        };
        redisClient = Promise.promisifyAll(redis.createClient(redisConfig));
    }
    return redisClient;
};
