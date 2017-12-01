/**
 * @module BlastCommand
 * @author Liu Jianwei
 */

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
// const path = require('path');
// const xml2js = Promise.promisifyAll(require('xml2js'));
const UUID = require('uuid/v4');
const CP = Promise.promisifyAll(require('child_process'));
const logger = require('./getLogger')('blastjs.js');
const getRedisCache = require('./getRedisCache');
const os = require('os');
const parseFmt0 = require('./formatOut0');

let redisCache = null;

/**
 *
 * @param queryCommand, blastp,blastn,tblastn,blastx
 * @param db
 * @param query
 * @param limit
 * @param noCache
 * @param outfmtPassed
 * @returns {Promise.<*>}
 * @private
 */
const _blaster = async (queryCommand, db, query, limit, noCache, outfmtPassed) => {
    let blastCommand;
    try {
        const outfmt = outfmtPassed || 0;
        const cacheKey = `${db}_${queryCommand}_${query}_${outfmt}`;
        const pathW = `/tmp/${Date.now()}.fasta`;
        fs.writeFileSync(pathW, query);
        const outFile = `/tmp/${UUID()}.out`;
        blastCommand = `${queryCommand} -query  ${pathW} -out ${outFile}  -db ${db} -outfmt ${outfmt} -num_threads ${os.cpus().length - 1}`;
        logger.info('RUNNING', blastCommand);
        if (!redisCache) {
            redisCache = await getRedisCache();
        }
        let resultData = null;
        if (!noCache) {
            resultData = await redisCache.getItem(cacheKey);
        }
        if (!resultData) {
            await CP.execAsync(blastCommand);
            resultData = await fs.readFileAsync(outFile, 'utf8');
            if (outfmt === 0) {
                resultData = await parseFmt0(outFile);
            }
            await redisCache.setItem(cacheKey, resultData, 18000);// cache 30 minutes
            // logger.info(resultData);
            logger.info('Succeed to query...');
        } else {
            logger.warn('Using cache for command result');
        }
        return resultData;
    } catch (err) {
        logger.error(err);
        throw new Error(`error when exec: ${blastCommand}:${db}:${query}`);
    }
};

/**
 * Query nucleotide on specific database
 * @param {string}db
 * @param {string}query the sequence piece
 * @param {string=}limit
 * @param {boolean=}noCache
 * @param {string}outfmt=0
 * @returns {Promise.<*>}
 */
exports.blastN = function (db, query, limit, noCache, outfmt) {
    return _blaster('blastn', db, query, limit, noCache, outfmt);
};


/**
 * Query protein on specific database
 // * @function blastP
 * @param {string}db
 * @param {string}query the sequence piece
 * @param {string=}limit
 * @param {boolean=}noCache
 * @param {string}outfmt=0
 * @returns {Promise.<*>}
 */
exports.blastP = function (db, query, limit, noCache, outfmt) {
    return _blaster('blastp', db, query, limit, noCache, outfmt);
};

/**
 * search nucleotide on protein database
 * @param db
 * @param {string}query the sequence piece
 * @param {string=}limit
 * @param {boolean=}noCache
 * @param {string}outfmt=0
 * @returns {Promise.<*>}
 */
exports.blastX = function (db, query, limit, noCache, outfmt) {
    return _blaster('blastx', db, query, limit, noCache, outfmt);
};

/**
 * search protein on nucleotide database
 * @param db
 * @param {string}query the sequence piece
 * @param {string=}limit
 * @param {boolean=}noCache
 * @param {string}outfmt=0
 * @returns {Promise.<*>}
 */
exports.tblastN = function (db, query, limit, noCache, outfmt) {
    return _blaster('tblastn', db, query, limit, noCache, outfmt);
};

// /**
//  * @summary tblaspx
//  * @description The tblastx application searches a translated nucleotide query against translated nucleotide subject sequences or a translated nucleotide database.
//  * @param db
//  * @param {string}query the sequence piece
//  * @param {string=}limit
//  * @param {boolean=}noCache
//  * @param {string}outfmt=0
//  * @returns {Promise.<*>}
//  */
// exports.tblastX = function (db, query, limit, noCache, outfmt) {
//     return _blaster('tblastx', db, query, limit, noCache, outfmt);
// };


// exports.makeDB = async (type, fileIn, outputPath, name, cb) => {
//     if (!type) {
//         return cb(new Error('no type supplied'));
//     }
//     if (!fileIn) {
//         return cb(new Error('no file supplied'));
//     }
//     if (!outputPath) {
//         return cb(new Error('no output path supplied'));
//     }
//
//     const fileNamePartOne = fileIn.replace(/^.*[\\/]/, '');// remove directories from path
//     const filename = fileNamePartOne.substr(0, fileNamePartOne.lastIndexOf('.')); // remove file extensions
//
//     let outPath = outputPath;
//     if (outPath.slice(-1) !== '/') {
//         outPath = `${outPath}/`; // add / out path is one is not supplied
//     }
//
//     const fileOut = outPath + filename;
//
//     const makeCommand = 'makeblastdb -in ' + fileIn + ' -dbtype ' + type + ' -out ' + fileOut + ' -title ' + name;
//     return await CP.execAsync(makeCommand);
//     // run(makeCommand, function (err, stdOut, stdErr) {
//     //     return cb(err, stdOut, stdErr, fileOut);
//     // });
//
// };


// module.exports = blast;
