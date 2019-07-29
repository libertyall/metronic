let colors = require('colors');

confPath = './../build.json';

let d = new Date();
let t = ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) + ':' + d.getSeconds();

console.log('[' + colors.grey(t) + ']' + ' ' + 'Using config ' + colors.green(confPath));

module.exports = require(confPath);
module.exports.config.theme = 'default';
