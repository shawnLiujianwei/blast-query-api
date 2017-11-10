/**
 * Created by shawn-liu on 17/11/10.
 */

// String.prototype.divide = function () {
//

// }
const evalDivide = function (string) {
    const regrex = /[0-9]*\/[0-9]*/;
    if (regrex.test(string)) {
        const array = string.split('/');
        return parseInt(array[0]) / parseInt(array[1]);
    }
}
exports.bySimilarity = (results, value) => {
    return results.filter(t => {
        const identity = t.Identities;
        return evalDivide(identity) >= value;
    });
}
