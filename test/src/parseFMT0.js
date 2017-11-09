/**
 * Created by shawn-liu on 17/10/24.
 */
const fs = require('fs');
const path = require('path');
const parse = require('../../src/lib/formatOut0');

const run = async () => {
    // const txt = fs.readFileSync('../../sample/outfmt0.txt').toString();
    const filePath = path.join(__dirname, '../../sample/outfmt0.txt');
    const list = await parse(filePath);
    console.log(JSON.stringify(list, null, 2));
}

run()
