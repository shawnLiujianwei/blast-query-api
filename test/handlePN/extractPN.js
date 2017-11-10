/**
 * Created by shawn-liu on 17/10/25.
 */
const readline = require('readline');
const fs = require('fs');
const getRedis = require('../../src/lib/getRedis');
const _ = require('lodash');

const RedisQueue = function (client) {
    this.jobs = [];
    this.client = client;
    this.key = 'myPNList';
}
RedisQueue.prototype.add = async function (job) {
    const self = this;
    if (self.jobs.length > 100) {
        const toExecArray = self.jobs.splice(0, 100).map(t => [t, t]);
        await self.client.hmsetAsync(self.key, _.flatten(toExecArray));
    }
    Array.prototype.push.apply(self.jobs, job);
}

RedisQueue.prototype.clean = async function () {
    const self = this;
    return await self.client.delAsync(self.key);
}

RedisQueue.prototype.flush = async function () {
    const self = this;
    const toExecArray = self.jobs.splice(0, 100).map(t => [t, t]);
    await self.client.hmsetAsync(self.key, _.flatten(toExecArray));
}

RedisQueue.prototype.getAll = async function () {
    const keys = this.client.hkeysAsync('myPNList');
    return keys;
}


const redisToFile = async (redisQueue) => {
    if (!redisQueue) {
        const redis = await getRedis();
        redisQueue = new RedisQueue(redis);
    }
    const allKeys = await redisQueue.getAll();
    console.log(allKeys);
    fs.writeFileSync('./pn.txt', JSON.stringify(allKeys));
    process.exit(1);
}


const _parse = (array) => {
    const result = [];
    array.forEach(line => {
        const array = line.split(/_sequence_|_Sequence_|_from_patent_|_from_Patent_/).slice(1).filter(t => {
            return !/^\d*$/.test(t);
        }).map(t => t.replace('_', ''));
        Array.prototype.push.apply(result, array);
    });
    return result;
}

const startRead = async (filePath) => {
    process.env.redisHost = "localhost";
    const redis = await getRedis();
    const redisQueue = new RedisQueue(redis);
    await redisQueue.clean();
    const linereader = readline.createInterface({
        input: fs.createReadStream(filePath)
    });

    const regex = /~[a-zA-Z0-9]{5,10}[.]{0,1}[0-9]{0,1}_/g;
    let count = 0;
    linereader.on('line', (line) => {
        if (!line.startsWith('>')) {
            return;
        }
        count++;
        console.log(`Read line(${count}): ${line}`);
        const replacedLine = line.trim().replace(/\1/g, '~').replace(/ /g, '_');
        let lineArray = [replacedLine];
        if (replacedLine.indexOf('~') !== -1) {
            lineArray = replacedLine.split("~");
        }
        const array = _parse(lineArray);
        redisQueue.add(array);
    });
    linereader.on('close', async () => {
        console.log('finished to read all files');
        await redisQueue.flush();
        await redisToFile(redisQueue);
    });
}


(async () => {
    const file = '/Users/shawn-liu/work/patsnap/patnt/patnt';
    startRead(file);
    // await redisToFile();
})();
