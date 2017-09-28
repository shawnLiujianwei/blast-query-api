const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const xml2js = Promise.promisifyAll(require('xml2js'));
const UUID = require('uuid/v4');
const CP = Promise.promisifyAll(require('child_process'));
const logger = require('log4js').getLogger('blastjs.js');
logger.level = 'debug';
const blast = {
    stringOutput: false
};

const parseFmt6 = (content, columns) => {
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
    const result = array.map(data => {
        const values = data.split('\t');
        return _fill(columns, values);
    }).filter(t => t);
    return result;
}

const blaster = async (type, db, query) => {
    try {
        const pathW = '/tmp/' + Date.now() + '.fasta';
        fs.writeFileSync(pathW, query);
        const outFile = '/tmp/' + UUID() + '.out';
        let blastCommand = type + ' -query ' + pathW + ' -out ' + outFile + ' -db ' + db;
        const columns = ['qseqid', 'sseqid', 'evalue', 'bitscore'];
        if (!blast.stringOutput) {
            blastCommand += ` -outfmt "6  ${columns.join(' ')}"`;
        }
        logger.info('RUNNING', blastCommand);
        const execStdout = await CP.execAsync(blastCommand);
        const resultData = await fs.readFileAsync(outFile, 'utf8');
        console.log(resultData);
        if (!blast.stringOutput) {
            // const result = await xml2js.parseStringAsync(resultData);
            // return result;
            return parseFmt6(resultData, columns);
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

blast.blastN = function (db, query) {
    return blaster('blastn', db, query);
};

blast.blastP = function (db, query) {
    return blaster('blastp', db, query);
};

blast.blastX = function (db, query) {
    return blaster('blastx', db, query);
};

blast.tblastN = function (db, query) {
    return blaster('tblastn', db, query);
};

blast.tblastX = function (db, query) {
    return blaster('tblastx', db, query);
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
