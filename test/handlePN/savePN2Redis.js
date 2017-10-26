const readline = require('readline');
const getRedis = require('../../src/lib/getRedis');
const fs = require('fs');

const RedisQueue = function (client) {
    this.jobs = [];
    this.client = client;
    this.key = 'pn2PatentId';
}
RedisQueue.prototype.add = async function (job) {
    const self = this;
    if (self.jobs.length > 100) {
        console.log('save batch jobs(100) to redis');
        const toExecArray = self.jobs.splice(0, 100);
        await self.client.hmsetAsync(self.key, toExecArray);
    }
    Array.prototype.push.apply(self.jobs, job);
}

RedisQueue.prototype.clean = async function () {
    const self = this;
    return await self.client.delAsync(self.key);
}

RedisQueue.prototype.flush = async function () {
    const self = this;
    const toExecArray = self.jobs.splice(0, 100);
    await self.client.hmsetAsync(self.key, toExecArray);
}

RedisQueue.prototype.getAll = async function () {
    const keys = this.client.hgetallAsync(this.key);
    return keys;
}


const start = async () => {
    try {
        const redis = await getRedis();
        const redisQueue = new RedisQueue(redis);
        await redisQueue.clean();
        const filePath = './sample.txt';

        const linereader = readline.createInterface({
            input: fs.createReadStream(filePath)
        });

        linereader.on('line', (lineData) => {
            const line = lineData.trim();
            if (!line) {
                return;
            }
            const array = line.split(/:|,/);
            if (array.length !== 2) {
                console.warn(`Error line: ${line}`);
                return;
            }
            redisQueue.add(array);
        });
        linereader.on('close', async () => {
            await redisQueue.flush();
            const keys = await redisQueue.getAll();
            console.log(keys);
        });
        console.log('done');
    } catch (e) {
        console.error(e);
    }
}
start();
