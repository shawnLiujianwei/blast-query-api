/**
 * Created by shawn-liu on 17/10/18.
 */
const rp = require('request-promise');
const sequences = 'CTGCAGCTTCCACGAACCTCGAGCGCAAGGAGTTAGAATCGGAGGAGAAAGTGTGTACATAACTCTGAAGCAGATCGGATGTCATCCGGCGTGCCGGTGAGAGGTTTTTGTCAGTTGCGTTGCGTTGGATTCTGGCTGTGAGTATTATTGTCGCGCAAAGAATAAGTAATTTTAGTTGTGCCTCATTCGAGTTCAGAATGAGCTCTTACGATTACTCTTATCTACTCAGAGTATAATAGC';
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Promise = require('bluebird');
const url = 'http://localhost:3000/blast/nucleotide';


const run = num => {
    console.log(`Run ---${num}---- at: ${new Date()}`);
    const seq = sequences.substring(num * Math.round(Math.random() * 10));
    return rp({
        method: 'POST',
        uri: 'http://localhost:3000/blast/nucleotide?noCache=true',
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
    Promise.map(array, num => {
        return run(num);
    }, {
        concurrency: 10
    }).then(() => {
        console.log(`end at: ${new Date()}`);
    });

})();
