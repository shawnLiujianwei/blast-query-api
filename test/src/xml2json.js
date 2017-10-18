/**
 * Created by shawn-liu on 17/10/18.
 */
const fs = require('fs');
var blastxml = require('biojs-io-blast');
const xml = fs.readFileSync('../../sample/outfmt5.xml');
const result = blastxml.parse(xml, function(data){
    console.log("blast object", data);
});

console.log(result)
