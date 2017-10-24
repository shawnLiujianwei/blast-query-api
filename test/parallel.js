/**
 * Created by shawn-liu on 17/10/18.
 */
const rp = require('request-promise');

const sequences = 'CTGCAGCTTCCACGAACCTCGAGCGCAAGGAGTTAGAATCGGAGGAGAAAGTGTGTACATAACTCTGAAGCAGATCGGATGTCATCCGGCGTGCCGGTGAGAGGTTTTTGTCAGTTGCGTTGCGTTGGATTCTGGCTGTGAGTATTATTGTCGCGCAAAGAATAAGTAATTTTAGTTGTGCCTCATTCGAGTTCAGAATGAGCTCTTACGATTACTCTTATCTACTCAGAGTATAATAGC';
const Promise = require('bluebird');

const getArray = (count) => {
    const array = [];
    for (let i = 0; i < count; i++) {
        array.push(i);
    }
    return array;
}

const run = num => {
    console.log(`Run ---${num}---- at: ${new Date()}`);
    const seqF = process.env.seq || sequences;
    const seq = seqF.substring(num * Math.round(Math.random() * 10));
    const dbType = process.env.dbType || 'nucleotide';
    return rp({
        method: 'POST',
        uri: `http://localhost:3001/blast/${dbType}?noCache=true`,
        body: {
            sequence: seq
        },
        headers: {
            'Content-Type': 'application/json'
        },
        json: true
    }).then(res => {
        console.log(`end ---${num}---- at: ${new Date()}`);
    });
}
(() => {
    console.log(`start at: ${new Date()}`);
    const con = process.env.con ? parseInt(process.env.con) : 10;
    Promise.map(getArray(con), (num) => {
        return run(num);
    }, {
        concurrency: con
    }).then(() => {
        console.log(`end at: ${new Date()}`);
    });

})();
