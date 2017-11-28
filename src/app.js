/**
 * Created by shawn-liu on 17/9/22.
 * @module APP
 * @author Liu Jianwei
 */

const express = require('express');
const bodyParser = require('body-parser');
const API = require('./api/api.controller');
const logger = require('./lib/getLogger')('app.js');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.get('/dbs', API.getDBs);
app.post('/blast/nucleotide', API.queryNucleotide);
app.post('/blast/protein', API.queryProtein);
app.post('/blast/sequence', API.sequenceQuery);

app.use(express.static(path.join(__dirname, '../docs')));

/**
 * @summary handle the unmatched path
 * @description send the unmatched path to the doc page
 * @function Handle Unmatched Path
 */
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../docs/index.html'));
});
app.listen(3000, () => {
    logger.info('Example app listening on port 3000!');
});
