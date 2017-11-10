/**
 * Created by shawn-liu on 17/11/9.
 */
const str = '1JP 2016033135-A/14';
const regx = /[A-Z]{2} {0,1}[0-9]{10}-[A-Z]{1}\/[0-9]{1,5}/;

console.log(str.match(regx))
