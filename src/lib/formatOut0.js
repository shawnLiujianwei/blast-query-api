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

        const linereader = readline.createInterface({
            input: fs.createReadStream(filePath)
        });

        let sequenceCount = 0;
        let subjectStart = false;
        let sequenceObj = null;
        let subjectQueryArray = [];
        let fastaHeader = '';
        let beginParseHeader = false;
        let foundFirstElement = false;
        linereader.on('line', originalLine => {
            const line = originalLine.trim();
            if (!line) {
                return;
            }
            if (line.indexOf('AAE38413') !== -1) {
                console.log(line);
            }
            foundFirstElement = foundFirstElement || line.charAt(0) === '>';
            if (foundFirstElement) {
                // when find the first > , begin to parse the data
                beginParseHeader = beginParseHeader || line.charAt(0) === '>';
                if (line.charAt(0) === '>' && sequenceCount > 0) {
                    resultList.push(sequenceObj.calculate());
                }
                if (beginParseHeader && !line.startsWith('Length')) {

                    if (fastaHeader) {
                        fastaHeader += '~' + line;
                    } else {
                        fastaHeader += line;
                    }
                }
                if (line.startsWith('Length')) {
                    if (fastaHeader.indexOf('AAE56966') !== -1) {
                        console.log(1)
                    }
                    beginParseHeader = false;
                    // 当匹配到Length 开头的时候，说明fasta header 解析完,然后开始解析length
                    sequenceObj = new Sequence(fastaHeader);
                    fastaHeader = '';
                    sequenceCount++;
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
            if (sequenceObj) {
                resultList.push(sequenceObj.calculate());
            }
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
