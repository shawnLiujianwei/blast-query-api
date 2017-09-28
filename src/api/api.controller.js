/**
 * Created by shawn-liu on 17/9/22.
 */
const blast = require('../lib/blastjs');
const fs = require('fs');
const path = require('path');

const api = {};
const dbRoot = process.env.BLASTDB;

api.getDBs = function (req, res) {
    fs.readdir(dbRoot, (err, files) => {
        const dbs = [];
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        files.map((file) => {
            const pin = file.indexOf('.pin');
            const nin = file.indexOf('.nin');
            if (pin > -1) {
                dbs.push({
                    name: file.split('.pin')[0], type: 'pin'
                });
            }
            if (nin > -1) {
                dbs.push({
                    name: file.split('.nin')[0], type: 'nin'
                });
            }
        });
        return res.json({
            dbs
        });
    });
};

api.blast = async (req, res) => {

    try {
        if (req.body) {
            console.log(req.body);
            const query = req.body.query;
            const db = req.body.db;

            if (req.body.useString) {
                blast.outputString(true);
            }
            if (query && query.length > 0) {
                if (db && db.name && db.type) {

                    const dbPath = path.join(dbRoot, db.name);
                    let output = null;
                    if (db.type === 'pin') {
                        output = await blast.blastP(dbPath, query);
                    } else {
                        output = await blast.blastN(dbPath, query);
                    }
                    return res.json({
                        data: output
                    });
                } else {
                    return res.json({error: 'did not receive any dbs'});
                }
            } else {
                return res.json({error: 'did not receive query'});
            }
        } else {
            return res.json({error: 'did not receive body'});
        }
    } catch (err) {
        res.json({error: err.message});
    }
};

module.exports = api;
