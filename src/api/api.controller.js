/**
 * Created by shawn-liu on 17/9/22.
 */
const blast = require('../lib/blastjs');
const listDB = require('../lib/listDB');
const logger = require('../lib/getLogger')('api.controller.js');
const api = {};
const dbRoot = process.env.BLASTDB;

api.getDBs = async (req, res) => {
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
        throw new Error('the specific db doesn\'t exist');
    }
}

const _execQuery = async (dbs, command, query, limit,noCache) => {
    const dbCount = dbs.length;
    const results = [];
    let error = null;
    for (let i = 0; i < dbCount; i++) {
        try {
            const temp = await blast[command](dbs[i], query, limit, noCache);
            Array.prototype.push.apply(results, temp);
        } catch (err) {
            error = err;
            logger.error(err);
        }
    }
    if(results.length === 0 && error) {
        throw error;
    }
    return results;
};
api.queryProtein = async (req, res) => {
    try {
        const sequence = req.body.sequence;
        const dbs = await listDB();
        const targetDbs = dbs.protein;
        _validatePost(req, targetDbs);
        logger.info('query protein from dbs:', targetDbs);
        const results = await _execQuery(targetDbs, 'blastP', sequence, req.query.limit, req.query.noCache);
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

api.queryNucleotide = async (req, res) => {
    try {
        const sequence = req.body.sequence;
        const dbs = await listDB();
        const targetDbs = dbs.nucleotide;
        _validatePost(req, targetDbs);
        logger.info('query nucleotide from dbs:', targetDbs);
        const results = await _execQuery(targetDbs, 'blastN', sequence, req.query.limit);
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

// api.blast = async (req, res) => {
//
//     try {
//         if (req.body) {
//             console.log(req.body);
//             const query = req.body.query;
//             const db = req.body.db;
//
//             if (req.body.useString) {
//                 blast.outputString(true);
//             }
//             if (query && query.length > 0) {
//                 if (db && db.name && db.type) {
//
//                     const dbPath = path.join(dbRoot, db.name);
//                     let output = null;
//                     if (db.type === 'pin') {
//                         output = await blast.blastP(dbPath, query);
//                     } else {
//                         output = await blast.blastN(dbPath, query);
//                     }
//                     return res.json({
//                         data: output
//                     });
//                 } else {
//                     return res.json({error: 'did not receive any dbs'});
//                 }
//             } else {
//                 return res.json({error: 'did not receive query'});
//             }
//         } else {
//             return res.json({error: 'did not receive body'});
//         }
//     } catch (err) {
//         res.json({error: err.message});
//     }
// };

module.exports = api;
