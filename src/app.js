/**
 * Created by shawn-liu on 17/9/22.
 */

const express = require('express');
const bodyParser = require('body-parser');
const API = require('./api/api.controller');
const logger = require('./lib/getLogger')('app.js');

const app = express();
app.use(bodyParser.json());
app.get('/dbs', API.getDBs);
app.post('/blast/nucleartide', API.queryNucleartide);
app.post('/blast/protein', API.queryProtein);

app.listen(3000, () => {
    logger.info('Example app listening on port 3000!');
});
