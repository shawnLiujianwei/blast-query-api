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
    logger.info(`Using BLASTDB=${process.env.BLASTDB}`);
    try {
        if (cache.get()) {
            return cache.get();
        }
        const dbs = {
            nucleotide: {},
            protein: {}
        };
        const getDBName = str => str.replace(/(.[0-9]{2,4})/, '');
        const files = await fs.readdirAsync(dbRoot);
        files.forEach(file => {
            const pin = file.indexOf('.pin');
            const nin = file.indexOf('.nin');
            if (pin > -1) {
                dbs.protein[getDBName(file.split('.pin')[0])] = 1;
                // dbs.protein.push(file.split('.pin')[0]);
            }
            if (nin > -1) {
                dbs.nucleotide[getDBName(file.split('.nin')[0])] = 1;
                // dbs.nucleotide.push(file.split('.nin')[0]);
            }
        });
        const result = {
            nucleotide: Object.keys(dbs.nucleotide),
            protein: Object.keys(dbs.protein)
        };
        cache.add(result);
        return result;
    } catch (err) {
        logger.error(err);
        throw new Error('failed to list blast db');
    }
}
