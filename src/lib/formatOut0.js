/**
 * Created by shawn-liu on 17/10/24.
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Promise = require('bluebird');

const Sequence = function (fastaHeader) {
    this.fastaHeader = fastaHeader.replace('>', '').replace(/\1/g, '~').trim();
    this.subjects = [];
    this.attributes = [];
    this._fns = {
        getAttrValue(str) {
            const json = {key: '', value: ''};
            const array = str.split(/=|:/);
            json.key = array[0].trim();
            const valueS = array[1];
            const splitKeys = ['bits', ':', '('];
            for (let i = 0; i < splitKeys.length; i++) {
                if (valueS.indexOf(splitKeys[i]) !== -1) {
                    json.value = valueS.split(splitKeys[i])[0].trim();
                    break;
                }
            }
            if (!json.value) {
                json.value = valueS.trim();
            }
            return json;
        }
    }
}
Sequence.prototype.setLength = function (len) {
    this.length = len;
}
Sequence.prototype.addAttribute = function (attr) {
    if (attr.trim())
        this.attributes.push(attr.trim());
}
Sequence.prototype.addQuerySubject = function (lineArray) {
    this.subjects.push(lineArray);
}

Sequence.prototype.calculate = function () {
    const json = {
        hits: []
    };
    const self = this;
    json.fastaHeader = this.fastaHeader;
    self.attributes.forEach(line => {
        line.split(',').forEach(pair => {
            const temp = self._fns.getAttrValue(pair);
            // if (temp.key === 'Score') {
            //     temp.value = parseInt(temp.value);
            // } else if (temp.key === 'Expect') {
            //     temp.value = parseFloat(temp.value).toFixed(1);
            // }
            json[temp.key] = temp.value;
        });
    });
    self.subjects.forEach(subQ => {
        const json1 = {};
        const qA = subQ[0].split(' ').filter(t => t);
        json1.queryStart = parseInt(qA[1].trim());
        json1.queryString = qA[2].trim();
        json1.queryEnd = parseInt(qA[3].trim());
        const hit = subQ[1];
        json1.matched = hit.trim();
        const sA = subQ[2].split(' ').filter(t => t);
        json1.subjectStart = parseInt(sA[1].trim());
        json1.subjectString = sA[2];
        json1.subjectEnd = parseInt(sA[3]);
        json.hits.push(json1);
    });
    return json;
}

const read = async (filePath) => {
    return new Promise((resolve, reject) => {

        const resultList = [];
        let whetherStart = false;

        const linereader = readline.createInterface({
            input: fs.createReadStream(filePath)
        });

        let notFirst = false;
        let subjectStart = false;
        let sequenceObj = null;
        let subjectQueryArray = [];
        linereader.on('line', line => {
            line = line.trim();
            if (!line) {
                return;
            }
            // when find the first > , begin to parse the data
            whetherStart = whetherStart || line.charAt(0) === '>';
            if (whetherStart) {
                if (line.charAt(0) === '>') {
                    if (notFirst) {
                        //get the full data of one result and push to array
                        resultList.push(sequenceObj.calculate());
                    }
                    sequenceObj = new Sequence(line);
                    notFirst = true;
                } else if (line.startsWith('Length')) {
                    sequenceObj.setLength(line.replace('Length=', ''));
                } else if (line.startsWith('Score') || line.startsWith('Identities')) {
                    sequenceObj.addAttribute(line);
                } else {
                    subjectStart = subjectStart || line.startsWith('Query');
                    if (subjectStart) {
                        if (line.startsWith('Query')) {
                            if (subjectQueryArray.length) {
                                sequenceObj.addQuerySubject(subjectQueryArray);
                                subjectQueryArray = [];
                            }
                        }
                        subjectQueryArray.push(line);
                    }
                }
            }
        });

        linereader.on('close', (err, data) => {
            resolve(resultList);
        });
    });

}

module.exports = read;
// const run = async () => {
//     // const txt = fs.readFileSync('../../sample/outfmt0.txt').toString();
//     const filePath = path.join(__dirname, '../../sample/outfmt0.txt');
//     const list = await read(filePath);
//     console.log(JSON.stringify(list, null, 2));
// }
//
// run()
