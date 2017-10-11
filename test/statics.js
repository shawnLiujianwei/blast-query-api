/**
 * Created by shawn-liu on 17/10/10.
 */
const readline = require('readline');
const fs = require('fs');

const file = '/Users/shawn-liu/work/patsnap/fasta/out.fa';

const statics = filePath => {
    const linereader = readline.createInterface({
        input: fs.createReadStream(file)
    });

    const getGroup = str => {
        const length = str.length;
        const unit = Math.round(length / (50 * 1024));
        return `less ${unit + 1}*50 KB`;
    }

    let total = 0;
    const json = {};
    let tempString = '';
    linereader.on('line', (line) => {
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
        file
    ]
    for (let i = 0; i < fileArray.length; i++) {
        await statics(fileArray[i]);
    }
})();

