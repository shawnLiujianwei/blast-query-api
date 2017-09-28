/**
 * Created by shawn-liu on 17/9/22.
 */
process.env.LOG4JS_CONFIG = {
    appenders: {
        stdout: {
            type: 'stdout'
        }
    },
    categories: {
        default: {
            appenders: ['stdout'],
            level: 'debug'
        }
    }
};

const express = require('express');
const bodyParser = require('body-parser');
const API = require('./api/api.controller');

const app = express();
app.use(bodyParser());
app.get('/dbs', API.getDBs);
app.post('/blast/db/:db/type/:type', API.blast);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
