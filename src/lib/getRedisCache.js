/**
 * Created by Shawn Liu on 17/4/19.
 */
const bluebird = require('bluebird');
const redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const sha1 = require('crypto-sha1');
const getRedis = require('./getRedis');

const RedisCache = function (client, options) {// arrow function can not be used as constructor
    this.client = client || redis.createClient(options);
    this.defaultOptions = {
        expire: 600 // 10 minutes
    }
    this.options = Object.assign({}, this.defaultOptions, options);
}

const isJSON = (string) => {
    try {
        if (typeof string === 'string') {
            JSON.parse(string);
        } else {
            JSON.stringify(string);
        }
        return true;
    } catch (e) {
        return false;
    }
}
RedisCache.prototype.setItem = async function (key, value, expires) {
    const self = this;
    if (key && value) {
        const result = await self.client.setAsync(`data_cache_${sha1(key)}`, isJSON(value) ? JSON.stringify(value) : value,
            'EX', expires || self.options.expire);
        return result;
    }
    console.error('both key and value are required when save cache');
    return Promise.resolve();
}

RedisCache.prototype.getItem = async function (key) {
    const self = this;
    const hashKey = `data_cache_${sha1(key)}`;
    const result = await self.client.getAsync(hashKey);
    return result && isJSON(result) ? JSON.parse(result) : result;
}

RedisCache.prototype.removeItem = async function (key) {
    const self = this;
    return self.client.delAsync(`data_cache_${sha1(key)}`);
}

// module.exports = RedisCache;

module.exports = (options) => {
    return new RedisCache(getRedis(), options);
}
