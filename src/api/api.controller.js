/**
 * Created by shawn-liu on 17/9/22.
 * @module ApiController
 * @requires BlastCommand
 * @author Liu Jianwei
 */
const blast = require('../lib/blastjs');
const listDB = require('../lib/listDB');
const logger = require('../lib/getLogger')('api.controller.js');
const api = {};
const dbRoot = process.env.BLASTDB;
const bionode = require('bionode-seq');
const filterRequests = require('../lib/filterResults');

/**
 * @summary list all blast database
 * @description detect the database type by checking its file suffix
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.getDBs = async (req, res) => {
    try {
        const dbs = await listDB();
        res.json(dbs);
    } catch (err) {
        logger.error(err);
        res.statusCode = 500;
        res.send(err.message);
    }
};

const _validatePost = (req, dbs) => {
    const sequence = req.body.sequence;
    if (!sequence) {
        throw new Error('query can not be empty');
    }
    if (!dbs || dbs.length === 0) {
        throw new Error('there is no database files');
    }
}

/**
 *
 * @param dbs
 * @param command
 * @param query
 * @param {object}requestQuery
 * @param {string=} requestQuery.noCache
 * @param {string=} requestQuery.limit
 * @param {string=} requestQuery.outfmt
 * @param {string=} requestQuery.similarity
 * @returns {Promise.<Array>}
 * @private
 */
const _execQuery = async (dbs, command, query, requestQuery) => {
    const dbCount = dbs.length;
    let results = [];
    let error = null;
    for (let i = 0; i < dbCount; i++) {
        try {
            const temp = await blast[command](dbs[i], query, requestQuery.limit, requestQuery.noCache, requestQuery.outfmt);
            if (Array.isArray(temp)) {
                Array.prototype.push.apply(results, temp);
            } else {
                results.push(temp);
            }

        } catch (err) {
            error = err;
            logger.error(err);
        }
    }
    if (results.length === 0 && error) {
        throw error;
    }
    if (requestQuery.similarity) {
        results = filterRequests.bySimilarity(results, parseFloat(requestQuery.similarity));
    }
    return results;
};

/**
 * @summary query protein
 * @description first will get all protein database and exec query on each db , and them combine the results
 * @param req
 * @param res
 * @see {@link module:BlastCommand.blastP}
 * @returns {Promise.<void>}
 */
exports.queryProtein = async (req, res) => {
    try {
        const sequence = req.body.sequence;
        const sequenceType = bionode.checkType(sequence);
        if (sequenceType !== 'protein') {
            throw new Error('the sequence is not valid protein');
        }
        const dbs = await listDB();
        const targetDbs = dbs.protein;
        _validatePost(req, targetDbs);
        logger.info('query protein from dbs:', targetDbs);
        const results = await _execQuery(targetDbs, 'blastP', sequence, req.query);
        res.json({
            success: true,
            data: results
        });
    } catch (err) {
        res.statusCode = 500;
        res.json({
            success: false,
            message: err.message || 'failed to query from blast'
        });
    }
}

/**
 * @summary query nucleotide
 * @description first will get all nucleotide database and exec query on each db , and them combine the results
 * @param req
 * @param res
 * @see {@link module:BlastCommand.blastN}
 * @returns {Promise.<void>}
 */
exports.queryNucleotide = async (req, res) => {
    try {
        const sequence = req.body.sequence;
        const sequenceType = bionode.checkType(sequence);
        if (sequenceType !== 'dna' && sequenceType !== 'rna') {
            throw new Error('the sequence is not valid nucleotide');
        }
        const dbs = await listDB();
        const targetDbs = dbs.nucleotide;
        _validatePost(req, targetDbs);
        logger.info('query nucleotide from dbs:', targetDbs);
        const results = await _execQuery(targetDbs, 'blastN', sequence, req.query);
        res.json({
            success: true,
            data: results
        });
    } catch (err) {
        res.statusCode = 500;
        res.json({
            success: false,
            message: err.message || 'failed to query from blast'
        });
    }
}

/**
 * @ignore
 * @param req
 * @param res
 * @returns {Promise.<void>}
 */
exports.sequenceQuery = async (req, res) => {
    const sequence = req.body.sequence;
    const sequenceType = bionode.checkType(sequence);


}

// module.exports = api;
