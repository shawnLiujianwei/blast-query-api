/**
 * Created by shawn-liu on 17/9/29.
 */
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const dbRoot = process.env.BLASTDB;
const logger = require('./getLogger')('listBlastDB.js');

const cache = {
    add(data) {
        this.data = data;
        this.timestamp = new Date().getTime();
    },
    get(timeout) {
        if (!timeout) {
            timeout = 10 * 60 * 1000;// 10 minutes
        }
        const self = this;
        if (!self.timestamp || !self.data) {
            return null;
        }
        const current = new Date().getTime();
        if ((current - this.timestamp) > timeout) {
            self.data = null;
        }
        return self.data;
    }
}
module.exports = async () => {
    if (!dbRoot) {
        throw new Error('can not find blast db folder');
    }
    try {
        if (cache.get()) {
            return cache.get();
        }
        const dbs = {
            nucleartide: [],
            protein: []
        };
        const files = await fs.readdirAsync(dbRoot);
        files.forEach(file => {
            const pin = file.indexOf('.pin');
            const nin = file.indexOf('.nin');
            if (pin > -1) {
                dbs.protein.push(file.split('.pin')[0]);
            }
            if (nin > -1) {
                dbs.nucleartide.push(file.split('.nin')[0]);
            }
        });
        cache.add(dbs);
        return dbs;
    } catch (err) {
        logger.error(err);
        throw new Error('failed to list blast db');
    }
}
