const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const xml2js = Promise.promisifyAll(require('xml2js'));
const UUID = require('uuid/v4');
const CP = Promise.promisifyAll(require('child_process'));
const logger = require('./getLogger')('blastjs.js');
const getRedisCache = require('./getRedisCache');
const os = require('os');

let redisCache = null;
const blast = {
    stringOutput: false
};

const _parseFmt6 = (content, columns) => {
    const array = content.split('\n');
    const _fill = (columns, values) => {
        if (columns.length === values.length !== 0) {
            const json = {};
            for (let i = 0; i < columns.length; i++) {
                json[columns[i]] = values[i];
            }
            return json;
        }
        return null;
    }
    const result = array.filter(t => t).map(data => {
        const values = data.split('\t');
        return _fill(columns, values);
    });
    return result;
}

const _blaster = async (type, db, query, limit) => {
    try {
        const cacheKey = `${db}_${type}_${query}`;
        const pathW = '/tmp/' + Date.now() + '.fasta';
        fs.writeFileSync(pathW, query);
        const outFile = '/tmp/' + UUID() + '.out';
        let blastCommand = type + ' -query ' + pathW + ' -out ' + outFile + ' -db ' + db;
        //const columns = ['qseqid', 'sseqid', 'evalue', 'bitscore'];
        const columns = ['qseqid', 'sseqid', 'pident', 'length', 'mismatch', 'gapopen', 'qstart', 'qend', 'sstart', 'send', 'evalue', 'bitscore']
        if (!blast.stringOutput) {
            blastCommand += ` -outfmt "6  ${columns.join(' ')}"`;
        }
        blastCommand += ` -max_target_seqs ${limit || 10}`;
        blastCommand += ` -num_threads ${os.cpus().length - 1}`;
        logger.info('RUNNING', blastCommand);
        if (null === redisCache) {
            redisCache = await getRedisCache();
        }
        let resultData = await redisCache.getItem(cacheKey);
        if (!resultData) {
            logger.info(blastCommand);
            await CP.execAsync(blastCommand);
            resultData = await fs.readFileAsync(outFile, 'utf8');
            await redisCache.setItem(cacheKey, resultData, 1800);// cache 3 minutes
            logger.info(resultData);
        } else {
            logger.warn(`Using cache for command result`);
        }
        if (!blast.stringOutput) {
            return _parseFmt6(resultData, columns);
        }
        return resultData;
    } catch (err) {
        logger.error(err);
        throw new Error(`error when exec: ${type}:${db}:${query}`);
    }
}


blast.outputString = (bool) => {
    blast.stringOutput = !!(!bool || bool === true);
};

blast.blastN = function (db, query, limit) {
    return _blaster('blastn', db, query, limit);
};

blast.blastP = function (db, query, limit) {
    return _blaster('blastp', db, query, limit);
};

blast.blastX = function (db, query) {
    return _blaster('blastx', db, query);
};

blast.tblastN = function (db, query) {
    return _blaster('tblastn', db, query);
};

blast.tblastX = function (db, query) {
    return _blaster('tblastx', db, query);
};


blast.makeDB = async (type, fileIn, outPath, name, cb) => {

    if (!type) {
        return cb(new Error('no type supplied'));
    }
    if (!fileIn) {
        return cb(new Error('no file supplied'));
    }
    if (!outPath) {
        return cb(new Error('no output path supplied'));
    }

    var fileNamePartOne = fileIn.replace(/^.*[\\\/]/, '');// remove directories from path
    var filename = fileNamePartOne.substr(0, fileNamePartOne.lastIndexOf('.')); //remove file extensions

    if (outPath.slice(-1) !== '/') {
        outPath = outPath + '/'; // add / out path is one is not supplied
    }

    var fileOut = outPath + filename;

    var makeCommand = 'makeblastdb -in ' + fileIn + ' -dbtype ' + type + ' -out ' + fileOut + ' -title ' + name;
    return await CP.execAsync(makeCommand);
    // run(makeCommand, function (err, stdOut, stdErr) {
    //     return cb(err, stdOut, stdErr, fileOut);
    // });

};


module.exports = blast;
