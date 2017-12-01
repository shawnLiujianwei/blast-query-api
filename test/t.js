// /**
//  * Created by shawn-liu on 17/11/9.
//  */
// const str = '1JP 2016033135-A/14';
// const regx = /[A-Z]{2} {0,1}[0-9]{10}-[A-Z]{1}\/[0-9]{1,5}/;
//
// console.log(str.match(regx))

// const json = require('./pn.json');
// console.log(typeof json);
const reg = /_sequence1_|_Sequence_|_from_patent_|_from_Patent_/;

const string = 'sfsdfsdf _sequence_';

console.log(string.match(reg))
