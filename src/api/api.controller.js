/**
 * Created by shawn-liu on 17/9/22.
 * @module ApiController
 * @requires BlastCommand
 * @author Liu Jianwei
 */
const blast = require('../lib/blastjs');
const listDB = require('../lib/listDB');
const logger = require('../lib/getLogger')('api.controller.js');
const bionode = require('bionode-seq');
const filterRequests = require('../lib/filterResults');
const Constant = require('../lib/Constant');

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

const _processRequest = async (sequence, queryType) => {
    if (!sequence) {
        throw new Error('query can not be empty');
    }

    const sequenceType = bionode.checkType(sequence);
    if (sequenceType !== Constant.SequenceType.Protein && sequenceType !== Constant.SequenceType.DNA) {
        throw new Error('the query sequence must be protein or dna');
    }
    const dbs = await listDB();
    if (!dbs || dbs.length === 0) {
        throw new Error('there is no database files');
    }
    const dbType = sequenceType === 'protein' ? 'protein' : 'nucleotide';
    const targetDbs = dbs[dbType];
    if (!targetDbs || !targetDbs.length) {
        throw new Error(`There is no ${dbType} database`);
    }
    const blastCommand = (() => {
        let command;
        switch (queryType) {
            case Constant.BlastCommand.Prot: {
                command = sequenceType === Constant.SequenceType.Protein ? Constant.BlastCommand.Prot : Constant.BlastCommand.NuclOnProt;
                break;
            }
            case Constant.BlastCommand.Nucl: {
                command = sequenceType === Constant.SequenceType.Protein ? Constant.BlastCommand.ProtOnNucl : Constant.BlastCommand.Nucl;
                break;
            }
            default: {
                throw new Error(`Unsupported queryType: ${queryType}`);
            }
        }
        return command;
    })();
    return {
        sequenceType,
        targetDbs,
        blastCommand,
        sequence
    };
};

/**
 * @summary query on protein database
 * @description first will get all protein database and exec query on each db , and them combine the results
 * @param req
 * @param {string}req.body.sequence should be protein or dna sequence
 * @param res
 * @see {@link module:BlastCommand.blastP|Query Protein} Or {@link module:BlastCommand.blastX|Query Nucleotide}
 * @returns {Promise.<void>}
 */
exports.queryProtein = async (req, res) => {
    try {
        const {targetDbs, sequence, queryCommand, sequenceType} = _processRequest(req.body.sequence, Constant.BlastCommand.Prot);
        logger.info(`query ${sequenceType}  from protein dbs: ${targetDbs}`);
        const results = await _execQuery(targetDbs, queryCommand, sequence, req.query);
        res.json({
            success: true,
            queryCommand,
            data: results
        });
    } catch (err) {
        res.statusCode = 500;
        res.json({
            success: false,
            message: err.message || 'failed to query from blast'
        });
    }
};

/**
 * @summary query nucleotide
 * @description first will get all nucleotide database and exec query on each db , and them combine the results
 * @param req
 * @param {string}req.body.sequence should be protein or nucleotide sequence
 * @param res
 * @see {@link module:BlastCommand.blastN|Query Nucleotide} Or {@link module:BlastCommand.tblastN|Query Protein}
 * @returns {Promise.<void>}
 */
exports.queryNucleotide = async (req, res) => {
    try {
        const {targetDbs, sequence, queryCommand, sequenceType} = _processRequest(req.body.sequence, Constant.BlastCommand.Prot);
        logger.info(`query ${sequenceType}  from nucleotide dbs: ${targetDbs}`);
        const results = await _execQuery(targetDbs, queryCommand, sequence, req.query);
        res.json({
            success: true,
            queryCommand,
            data: results
        });
    } catch (err) {
        res.statusCode = 500;
        res.json({
            success: false,
            message: err.message || 'failed to query from blast'
        });
    }
};

// /**
//  * @ignore
//  * @param req
//  * @param res
//  * @returns {Promise.<void>}
//  */
// exports.sequenceQuery = async (req, res) => {
//     const sequence = req.body.sequence;
//     const sequenceType = bionode.checkType(sequence);
//
//
// }

// module.exports = api;
