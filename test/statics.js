/**
 * Created by shawn-liu on 17/10/10.
 */
const readline = require('readline');
const fs = require('fs');

const file = '/Users/shawn-liu/work/patsnap/fasta/out.fa';

const statics = filePath => {
    const linereader = readline.createInterface({
        input: fs.createReadStream(filePath)
    });

    const getGroup = str => {
        const length = str.length;
        const unit = Math.round(length / (500 * 1024));
        return `less ${unit + 1}*500 KB`;
    }

    let total = 0;
    const json = {};
    let tempString = '';
    let lineCount = 0;
    linereader.on('line', (line) => {
        lineCount++;
        if (line.indexOf('>') === 0) {

            if (tempString) {
                const groupName = getGroup(line);
                if (!json[groupName]) {
                    json[groupName] = 0;
                }
                total++;
                json[groupName]++;
                tempString = '';
            }
        } else {
            tempString += line;
        }

        if(total % 100000 === 0) {
            console.log(`========================Line: ${lineCount}=============================`)
            console.log(total);
            console.log(json);
        }

    });

    linereader.on('close', () => {
        console.log(total);
        console.log(json);
    })
}

(async () => {
    const fileArray = [
        '/data/fasta/human_genomic'
    ]
    for (let i = 0; i < fileArray.length; i++) {
        await statics(fileArray[i]);
    }
})();

